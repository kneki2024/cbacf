(function($) {
    window.login_flag = false;

    $(document).ready(function() {
        $('.login-button').click(() => {
            // Hide the login container
            $('.login-container').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
                $(this).remove(); // Optionally remove the login-container from the DOM

                // Show the base-calculator-container with a transition
                $('.terms-container').fadeIn(300);
            });
        });

        $('.sign-up-title').click(() => {
            let username = $('.username-input').val();
            let password = $('.password-input').val();
            console.log(username);
            console.log(password);
            $.ajax({
                url: '/login', // Your API endpoint
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                success: function(response) {
                    console.log('Success:', response);
                    if (response.status == 0){
                        login_flag = true;
                        $('.login-container').fadeOut(300, function() {
                            // This callback function executes after the fadeOut completes
                            $(this).remove(); // Optionally remove the login-container from the DOM

                            // Show the base-calculator-container with a transition
                            $('.terms-container').fadeIn(300);
                        });
                    }else if(response.status == 1){
                        alert('Server Error!');
                    }else if(response.status == 2){
                        alert('Password Error!')
                    }else if (response.status == 3){
                        alert('Invalid User!');
                    }else{
                        alert('Unknown Error!');
                    }
                    
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('Failed to send data: ' + xhr.responseJSON.msg);
                }
                    });
            // Hide the login container
            
        });
    });
})(jQuery);
