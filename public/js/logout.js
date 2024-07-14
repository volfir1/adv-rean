$(function () {
    function logout() {
        $.ajax({
            url: '{{ route('auth.logout') }}',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                localStorage.removeItem('authToken'); // Remove any stored authentication token
                window.location.href = response.redirect; // Redirect to the appropriate page
            },
            error: function (error) {
                console.error('Logout error:', error);
                // Handle error if needed
            }
        });
    }
});
