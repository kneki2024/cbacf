(function($) {
    $(document).ready(function() {
        $('.par-bak-button').click(() => {
            console.log('Test');
            // Hide the login container
            $('.param-editor').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
                // Show the base-calculator-container with a transition
                $('.adv-calculator-container').fadeIn(300);
            });
        });
    });
})(jQuery);
