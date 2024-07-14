<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Buyer;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class DatatableController extends Controller
{
   
    public function fetchUser(Request $request)
    {
        Log::info('fetchUser method called'); // Log statement

        // Use DB transaction to ensure data consistency
        return DB::transaction(function () use ($request) {
            $query = User::leftJoin('buyers', 'users.id', '=', 'buyers.id_user')
                ->select('users.*', 'buyers.fname', 'buyers.lname', 'buyers.contact', 'buyers.address', 'buyers.barangay', 'buyers.city', 'buyers.landmark');

            if ($request->has('search.value')) {
                $searchValue = $request->input('search.value'); // DataTables sends the search value in `search.value`
                $query->where(function($q) use ($searchValue) {
                    $q->where('users.email', 'like', "%{$searchValue}%")
                      ->orWhere('buyers.fname', 'like', "%{$searchValue}%")
                      ->orWhere('buyers.lname', 'like', "%{$searchValue}%");
                });
            }

            $totalRecords = $query->count();
            $filteredRecords = $totalRecords;

            // Ensure that length and start parameters are available and set default values if they are not
            $length = $request->input('length', 10);
            $start = $request->input('start', 0);

            $users = $query->skip($start)
                           ->take($length)
                           ->get();

            Log::info('Users fetched', ['users' => $users]); // Log statement

            $formattedUsers = $users->map(function($user) {
                return [
                    'id' => $user->id,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                    'is_activated' => $user->is_activated,
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'contact' => $user->contact,
                    'address' => $user->address,
                    'barangay' => $user->barangay,
                    'city' => $user->city,
                    'landmark' => $user->landmark,
                ];
            });

            return response()->json([
                'draw' => $request->input('draw'),
                'recordsTotal' => $totalRecords,
                'recordsFiltered' => $filteredRecords,
                'data' => $formattedUsers,
            ]);
        });
    }
    public function userIndex(){

        return view('datatable');
    }

}
