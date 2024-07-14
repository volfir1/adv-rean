$(document).ready(function() {
    console.log('DataTable Initialization');

    if (!$.fn.DataTable.isDataTable('#usersTable')) {
        $('#usersTable').DataTable({
            processing: true,
            serverSide: false,
            ajax: {
                url: '/api/user/fetch', // Ensure this URL matches the API route
                type: "GET",
                dataSrc: function(json) {
                    console.log('JSON Response:', json); // Log the JSON response to the console
                    if (!json || !json.data) {
                        console.error("Invalid JSON response:", json);
                        return [];
                    }
                    return json.data;
                },
                error: function(xhr, error, thrown) {
                    console.error("Error in fetching data: ", xhr.responseText);
                }
            },
            columns: [
                { data: 'fname', title: 'First Name' },
                { data: 'lname', title: 'Last Name' },
                { data: 'contact', title: 'Contact' },
                { data: 'address', title: 'Address' },
                { data: 'barangay', title: 'Barangay' },
                { data: 'city', title: 'City' },
                { data: 'landmark', title: 'Landmark' },
                { 
                    data: 'is_admin',
                    title: 'Role',
                    render: function(data) {
                        return data ? 'Admin' : 'User';
                    }
                },
                { 
                    data: 'is_activated',
                    title: 'Active Status',
                    render: function(data) {
                        return data ? 'Active' : 'Deactivated';
                    }
                },
                {
                    data: null,
                    title: 'Actions',
                    render: function(data, type, row) {
                        return '<i class="fas fa-edit edit-icon" onclick="editUser('+ row.id +')"></i>';
                    },
                    orderable: false
                }
            ],
            createdRow: function(row, data, dataIndex) {
                $(row).attr('data-id', data.id);
            },
            searching: true,
            language: {
                emptyTable: "No data available in table",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                infoEmpty: "Showing 0 to 0 of 0 entries",
                lengthMenu: "Show _MENU_ entries",
                loadingRecords: "Loading...",
                processing: "Processing...",
                search: "Search:",
                zeroRecords: "No matching records found"
            },
            order: [[0, "desc"]]
        });
    }
});
