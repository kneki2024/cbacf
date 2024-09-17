(function($) {

    window.set_msg_box = (msgText, msgYes, msgNo, callback_yes = false, pass_value_yes = false) => {
        // Create the HTML structure as a string with a placeholder for the message text
        var msgHTML = `
            <div class="msg-background" style="display:none;">
                <div class="msg-click"></div>
                <div class="msg-container">
                  <div class="msg-text" id="msg-text">${msgText}</div>
                  <button class="msg-button msg-yes">${msgYes}</button>
                  <button class="msg-button msg-no">${msgNo}</button>
                </div>
            </div>
            `;
        

        const $msgHTML = $(msgHTML);
        $('body').append($msgHTML);
        $msgHTML.fadeIn(300);

        var click_yes = () => {
            if (callback_yes){
                console.log(pass_value_yes);
                callback_yes(pass_value_yes);
            }
            $('.msg-background').fadeOut(300, () => {
                $('.msg-background').remove();
            });
        }

        var click_no = () => {
            $('.msg-background').fadeOut(300, () => {
                $('.msg-background').remove()
            });
        }

        $('.msg-yes').click(() => {
            click_yes()
        });

        $('.msg-no').click(() => {
            click_no()
        });

        $('.msg-click').click(() => {
            click_no()
        });
    }    

    window.set_msg_box_input = (msgText, msgYes, msgNo, callback_yes = false, pass_value_yes = false) => {
        // Create the HTML structure as a string with a placeholder for the message text
        
        var msgHTML = `
        <div class="msg-background" style="display:none;">
            <div class="msg-click"></div>
            <div class="msg-container">
                <div class="msg-text" id="msg-text">${msgText}</div>
                <input class="msg-input"></input>
                <!-- Radio buttons for choosing type -->
                <div class="msg-radios">
                    <input type="radio" id="number" name="type" value="0">
                    <label for="number">Number</label>
                    <input type="radio" id="usd" name="type" value="1">
                    <label for="usd">USD</label>
                    <input type="radio" id="percentage" name="type" value="2">
                    <label for="percentage">Percentage</label>
                </div>
                <button class="msg-button msg-yes">${msgYes}</button>
                <button class="msg-button msg-no">${msgNo}</button>
            </div>
        </div>

        `;
    
        

        const $msgHTML = $(msgHTML);
        $('body').append($msgHTML);
        $msgHTML.fadeIn(300);

        let var_id = pass_value_yes.var_id;
        let var_value = pass_value_yes.var_value;
        


        var click_yes = () => {
            if (!$("input[type='radio'][name='type']:checked").val()){
                alert('Please select a number format.')
            }else if($(".msg-input").val() == ''){
                alert('Note cannot be blank!')
            }
            if (callback_yes){
                let display_style = $("input[type='radio'][name='type']:checked").val();
                let comment = $('.msg-input').val();
                callback_yes(var_id, var_value, display_style, comment);
            }
            $('.msg-background').fadeOut(300, () => {
                $('.msg-background').remove();
            });
        }

        var click_no = () => {
            $('.msg-background').fadeOut(300, () => {
                $('.msg-background').remove()
            });
        }

        $('.msg-yes').click(() => {
            click_yes()
        });

        $('.msg-no').click(() => {
            click_no()
        });

        $('.msg-click').click(() => {
            click_no()
        });
    }    
})(jQuery);
