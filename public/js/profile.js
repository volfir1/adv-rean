$(function () {
    $('#login_form').submit(function (e) {
        e.preventDefault();
        $("#login_btn").val('Please Wait...');

        $.ajax({
            url: $(this).attr('action'), // Use form action attribute as URL
            method: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.status === 422) {
                    showError('email', res.message.email);
                    showError('password', res.message.password);
                    $("#login_btn").val('Login');
                } else if (res.status === 401) {
                    $("#login_alert").html(showMessage('danger', res.message));
                    $("#login_btn").val('Login');
                } else if (res.status === 200 && res.message === 'Login Successful') {
                    window.location.href = res.redirect; // Redirect to profile page
                }
            },
            error: function (err) {
                console.error('Error:', err);
                $("#login_alert").html(showMessage('danger', 'An error occurred while logging in.'));
                $("#login_btn").val('Login');
            }
        });
    });

    

    function showError(field, errors) {
        $('#' + field).addClass('is-invalid');
        $('#' + field).siblings('.invalid-feedback').html(errors);
    }

    function showMessage(type, message) {
        return '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
            message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
            '</div>';
    }
});

