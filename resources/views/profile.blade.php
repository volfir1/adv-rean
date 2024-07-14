@extends('layouts.app')
@section('title', 'Profile')

@section('content')
<div class="container">
    <h1>Profile Page</h1>
    <form id="logoutForm" action="{{ route('auth.logout') }}" method="POST" onsubmit="event.preventDefault(); logout();">
        @csrf <!-- Include CSRF token -->
        <button type="submit" class="btn btn-link">Logout</button>
    </form>
</div>
@endsection
