(function($) {
    $('.print-button').click(function() {
        window.print();
    });

    $('.download-button').click(function() {
        const msgText = "Would you like to share your parameters and results?";
        const msgYes = "Yes. I'd like to.";
        const msgNo = "No. Download directly.";
        // set_msg_box(msgText, msgYes, msgNo);
    })

    $('.back-button').click(function() {
        $('.results-container').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
        // Show the base-calculator-container with a transition
        $('.base-calculator-container').fadeIn(300);
    });
    });
})(jQuery);
