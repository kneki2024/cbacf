(function($) {
    $(document).ready(function() {
        $('.terms-button').click(() => {
            // Hide the login container
            $('.terms-container').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
                $(this).remove(); // Optionally remove the login-container from the DOM

                // Show the base-calculator-container with a transition
                $('.base-calculator-container').fadeIn(300);
            });
        });
    });
})(jQuery);