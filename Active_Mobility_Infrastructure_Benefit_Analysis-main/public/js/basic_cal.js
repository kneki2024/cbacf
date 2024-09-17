(function($) {

    $.ajax({
        url: '/fetch-description', // Change this URL if your app is not running locally
        method: 'POST',
        contentType: 'application/json',
        success: function(data) {
            var_array = data.msg;
            $('.fa-question').hover(
                // Hover in function
                function(event) { // Ensure 'event' is passed as an argument
                    var $this = $(this); // Correctly scoped within the function
                    var var_id = $this.parent().attr('var_id'); // Get a custom attribute 'var_id' from the parent
                    var x = event.pageX; // Get the mouse position on the page
                    var y = event.pageY;
                    var result = var_array.find(function(item) {
                        return item.VAR_ID == var_id;
                    });
                    // console.log(result);
                    // console.log(x);
                    // console.log(y);
                    // console.log(result['DESCRIPT']);
                    $('.descript-box').html(result['DESCRIPT'])
                    $('.descript-box').css({
                        "left": x + 5,
                        "top": y + 5,
                        "display": "block"
                    })
                },
                // Hover out function
                function() {
                    $('.descript-box').css({
                        "display": "none"
                    })
                }
            );

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });

    var perform_cal = () => {
        $('.calculator-container').fadeOut(300, function() {
            // This callback function executes after the fadeOut completes
            // Show the base-calculator-container with a transition
            $('.results-container').fadeIn(300, () => {
                var myChart = echarts.init(document.querySelector('.chart-container'));

                // specify chart configuration item and data
                var option = {
                    title: {
                        text: 'Net Cash Flow vs Present Cash'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        orient: 'vertical', // Set the legend to display vertically
                        right: 10, // Position 10px from the right edge
                        data: ['Net Cash Flow', 'Present Cash']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            // saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                        name: 'Year', // Setting the label for the x-axis
                        nameLocation: 'middle', // Position the axis name
                        nameGap: 20,  // Gap between the axis name and the axis line
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Benefits ($)', // Setting the label for the y-axis
                        nameLocation: 'end', // Position the axis name
                        nameGap: 10,  // Gap between the axis name and the axis line
                    },
                    series: [
                        {
                            name: 'Net Cash Flow',
                            type: 'line',
                            data: [
                                    34.46, 37.61, 41.02, 44.70, 48.68, 52.98, 57.61, 62.62,
                                    68.03, 73.87, 80.18, 87.00, 94.36, 102.31, 110.89, 120.16, 130.18,
                                    140.99, 152.67, 152.67
                                ]
                        },
                        {
                            name: 'Present Cash',
                            type: 'line',
                            data: [
                                    32.51, 33.48, 34.44, 35.41, 36.38, 37.35, 38.32, 39.29,
                                    40.27, 41.25, 42.24, 43.25, 44.25, 45.25, 46.27, 47.30, 48.34,
                                    49.40, 50.46, 50.46
                                ]
                        }
                    ]
                };

                // use specified configuration item and data to show chart
                myChart.setOption(option, true);
            });
        });
    }
    $(document).ready(function() {



        $('.adv-bas-button').click(() => {
            $('.adv-calculator-container').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
                // Show the base-calculator-container with a transition
                $('.base-calculator-container').fadeIn(300);
            });
        });

        // $('.cal-button').click(() => {
        //     // Hide the login container
        //     perform_cal();
        // });    

        


        $.ajax({
            url: '/getregions', // Change this URL if your app is not running locally
            method: 'POST',
            contentType: 'application/json',
            success: function(data) {
                // console.log('Regions:', data);
                countrySelect = $('#country-select')[0]
                data.forEach(country => {
                    const option = document.createElement("option");
                    option.value = country['alpha-2'];
                    option.textContent = country.name;
                    countrySelect.appendChild(option);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });

        $('#country-select').on('change', function() {
            var selectedValue = $(this).val();
            if (selectedValue){
                $.ajax({
                    url: '/fetch-gdp', // Change this URL if your app is not running locally
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ countryCode: selectedValue }),
                    success: function(data) {
                        console.log(data);
                        country_name = data.msg.country;
                        $('.gdp_option').remove();
                        
                        stat_value_life = $(`select[name="statisticalValueOfLife"]`);
                        let svl_option = document.createElement("option");
                        svl_option.value = data.cal_res.stat_value_life;
                        svl_option.textContent = `$${data.cal_res.stat_value_life} (${country_name})`;
                        svl_option.className = 'gdp_option';
                        stat_value_life.prepend(svl_option);
                        svl_option.selected = true;
                        

                        value_time = $(`select[name="valueOfTime"]`);
                        let vt_option = document.createElement("option");
                        vt_option.value = data.cal_res.value_time;
                        vt_option.textContent = `$${data.cal_res.value_time} (${country_name})`;
                        vt_option.className = 'gdp_option';
                        value_time.prepend(vt_option);
                        vt_option.selected = true;
                        value_time.parent().find('input').css('display', 'none');

                        window.gdp = data.msg.gdp;

                        // ave_cost_crash = $(`select[name="averageCostOfCrashes"]`);
                        // let accc_option = document.createElement("option");
                        // accc_option.value = data.cal_res.ave_cost_crash;
                        // accc_option.textContent = `$${data.cal_res.ave_cost_crash} (${country_name})`;
                        // accc_option.className = 'gdp_option';
                        // ave_cost_crash.prepend(accc_option);
                        // accc_option.selected = true;
                        
                    },
                    error: function(xhr, status, error) {
                        console.error('Error fetching data:', error);
                        console.log(error);
                        $('.gdp_option').remove();
                        $('.param-icon').find('input').css('display', 'block');
                    }
                });
            }
        });

    });
})(jQuery);
