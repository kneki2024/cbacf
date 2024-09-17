(function($) {

    function calculateMean(array) {
        const sum = array.reduce((acc, val) => acc + val, 0); // Sum all elements in the array
        const mean = sum / array.length; // Divide the sum by the number of elements to get the mean
        return mean;
    }

    var plot_chart = (years, net_cash_data, pres_cash_data, NPV, IRR, constru_cost, output_m, n_reduced_fsc, n_reduced_mor, reduced_co2, h_saved) => {
        $('.calculator-container').fadeOut(300, function() {
            // This callback function executes after the fadeOut completes
            // Show the base-calculator-container with a transition
            $('.impact-value-npv').html(`$ ${(NPV * 100).toFixed(2)}`);
            $('.impact-value-irr').html(`${(IRR * 100).toFixed(2)}%`);
            $('.con_cost_text').html(`$ ${constru_cost.toFixed(2)}`)

            let data = output_m.map(subArray =>
                subArray.map(num => num.toFixed(2))
            );

            data.forEach(row => {
                row[0] = parseInt(row[0], 10); // Using parseInt() for converting string to integer
                // Alternatively, you could use: row[0] = +row[0]; which uses the unary plus to convert to an integer
            });

            console.log(data);
            const $table = $('<table class="table"></table>');
            const $header = $('<tr></tr>');
            const headers = ['Year Since Operation', 'Maintenance', 'Safety Benefit', 'Health Benefit', 'Emission Benefits', 'Travel Time Saving', 'Net Cash Flow', 'Present Cash'];

            $.each(headers, function(i, header) {
                $header.append($('<th></th>').text(header));
            });
            $table.append($header);

            $.each(data, function(i, row) {
                const $row = $('<tr></tr>');
                $.each(row, function(key, value) {
                    $row.append($('<td></td>').text(value));
                });
                $table.append($row);
            });

            data_last = data[data.length - 1];

            last_sb = +data_last[2];
            last_hb = +data_last[3];
            last_eb = +data_last[4];
            last_ts = +data_last[5];
            last_all = +data_last[6];

            $table.append(`
                <tr>
                    <td colspan="2"></td>
                    <td>${((last_sb / last_all) * 100).toFixed(2)} %</td>
                    <td>${((last_hb / last_all) * 100).toFixed(2)} %</td>
                    <td>${((last_eb / last_all) * 100).toFixed(2)} %</td>
                    <td>${((last_ts / last_all) * 100).toFixed(2)} %</td>
                    <td colspan="2"></td>
                </tr>
            `);

            // data.forEach(row => {
            //     // const safetyPct = ((row.safety / row.netCash) * 100).toFixed(2);
            //     // const healthPct = ((row.health / row.netCash) * 100).toFixed(2);
            //     // const emissionPct = ((row.emission / row.netCash) * 100).toFixed(2);
            //     // const travelPct = ((row.travel / row.netCash) * 100).toFixed(2);

            //     $table.append(`
            //         <tr>
            //             <td colspan="2"></td>
            //             <td>1</td>
            //             <td>2</td>
            //             <td>3</td>
            //             <td>4</td>
            //             <td colspan="2"></td>
            //         </tr>
            //     `);
            // });

            const $table_2 = $('<table class="table"></table>');
            const $header_2 = $('<tr></tr>');
            const headers_2 = [
                'Number of Reduced Fatal and Serious Crashes per year', 
                'Number of Reduced mortality per year', 
                'Reduced Tons of CO2 per year', 
                'Hour of travel time saved per year'
            ];

            // Append headers to the header row
            $.each(headers_2, function(i, header) {
                $header_2.append($('<th></th>').text(header));
            });

            // Append the header row to the table
            $table_2.append($header_2);

            // Create and append the first data row
            const $firstRow = $('<tr></tr>');
            const dataValues = [calculateMean(n_reduced_fsc).toFixed(2), calculateMean(n_reduced_mor).toFixed(2), calculateMean(reduced_co2).toFixed(2), calculateMean(h_saved).toFixed(2)]; // Data for the first row
            $.each(dataValues, function(i, value) {
                $firstRow.append($('<td></td>').text(value));
            });

            // Append the first row to the table
            $table_2.append($firstRow);

            $('.table-container').html('');
            $('.table-container').append($table);
            $('.table-container').append($table_2);

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
                        data: years,
                        name: 'Year', // Setting the label for the x-axis
                        nameLocation: 'middle', // Position the axis name
                        nameGap: 20,  // Gap between the axis name and the axis line
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Benefits ($ 1,000)', // Setting the label for the y-axis
                        nameLocation: 'end', // Position the axis name
                        nameGap: 10,  // Gap between the axis name and the axis line
                    },
                    series: [
                        {
                            name: 'Net Cash Flow',
                            type: 'line',
                            data: net_cash_data
                        },
                        {
                            name: 'Present Cash',
                            type: 'line',
                            data: pres_cash_data
                        }
                    ]
                };

                // use specified configuration item and data to show chart
                myChart.setOption(option, true);
            });
        });
    }

    $(document).ready(function() {
        $('.adv-edt-button').click(() => {
            console.log('Test');
            // Hide the login container
            $('.adv-calculator-container').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
                // Show the base-calculator-container with a transition
                $('.param-editor').fadeIn(300);
            });
        });
    });


    var refresh_data = () => {
        $.ajax({
            url: '/fetch-data', // Change this URL if your app is not running locally
            method: 'POST',
            contentType: 'application/json',
            success: function(data) {
                // console.log(data);
                $('option[value_id]').remove();
                let vars = data.msg;
                vars = vars.reverse();
                
                // countrySelect = $('#country-select')[0]
                vars.forEach(param_var => {
                    let var_id = param_var.VAR_ID;
                    let var_value = param_var.VAR_VALUE;
                    let display_style = param_var.DISPLAY_STYLE;
                    let comment = param_var.COMMENT;
                    let value_id = param_var.VALUE_ID;

                    let show_text = ''

                    if (display_style == 0){
                        show_text = `${var_value} (${comment})`
                    }else if (display_style == 1){
                        show_text = `$${var_value} (${comment})`
                    }else if (display_style == 2){
                        show_text = `${var_value * 100}%  (${comment})`
                    }
                    cur_icon = $(`.param-icon[var_id="${var_id}"]`)
                    cur_icon.find('input').css('display', 'none');
                    cur_select = $(`.param-icon[var_id="${var_id}"]`).children('select')[0]
                    // console.log(cur_select)
                    if (cur_select){
                        let option = document.createElement("option");
                        $option = $(option);
                        $option.attr('value_id', value_id)
                        option.value = var_value;
                        option.textContent = show_text;
                        cur_select.prepend(option);
                        option.selected = true;
                    }
                });
                if (login_flag){
                    $('.fa-plus').css('display', 'none');
                    $('.fa-minus').css('display', 'block');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    
    $('.adv-button').click(() => {
        var $select = $('select[name="statisticalValueOfLife"]');
        var $options = $select.find('option');

        if ($("#country-select").val() == ''){
            alert("Please select a Country.")
        }else if ($("#city-select").val() == ''){
            alert("Please input a City.")
        }else if ($options.length === 1 && $options.first().val() === 'custom') {
            alert("GDP is not available for this country. Please select another country.");
        }else{
            refresh_data();
            for (let _i = 1001; _i < 1005; _i++){
                $(`.adv-input-container[var_id="${_i}"]`).children('input').val($(`.bas-input-container[var_id="${_i}"]`).children('input').val());
            }
            if (login_flag == false){
                $('.fa-plus').css('display', 'none');
                $('.fa-minus').css('display', 'none');
            }else{
                // $('.fa-plus').css('display', 'block');
                $('.fa-minus').css('display', 'block');
            }
            $('.base-calculator-container').fadeOut(300, function() {
                // This callback function executes after the fadeOut completes
                // Show the base-calculator-container with a transition
                $('.adv-calculator-container').fadeIn(300);
            });
        }
        
    });

    var get_var_value = (var_id) => {
        if (var_id > 1000){
            return +$(`.param-icon[var_id="${var_id}"]`).children().val();
        }else{
            cur_value = $(`.param-icon[var_id="${var_id}"]`).children('select').val();
            if (cur_value == 'custom'){
                return +$(`.param-icon[var_id="${var_id}"]`).children('input').val();
            }else{
                return +cur_value;
            }
        }
    }

    var arrange_data = () => {
        const SIF = get_var_value(25);
        const data = {
            newProj: get_var_value(1001),
            PPeriod: get_var_value(24),
            ConstrCost: get_var_value(1002),
            MaintnCost: get_var_value(1003),
            IntrR: get_var_value(23),
            CMF: get_var_value(12),
            Pop: get_var_value(1004),
            BKspd: get_var_value(19),
            WKspd: get_var_value(20),
            PTspd: get_var_value(21),
            Carspd: get_var_value(22),
            TripPur: [
                get_var_value(1),
                1 - get_var_value(1) - get_var_value(3),
                get_var_value(3)
            ],
            DivCar: get_var_value(16),
            DivWalk: get_var_value(17),
            DivPT: get_var_value(18),
            BCostCrash: (70 * gdp + SIF * 17.5 * gdp) / (1 + SIF),
            indFactor: get_var_value(7),
            VehOcc: get_var_value(5),
            CycPerc: get_var_value(6),
            RedMort: get_var_value(14),
            MortRate: get_var_value(13) / 100000,
            StatValueLife: get_var_value(302),
            CostCrash: (70 * gdp + SIF * 17.5 * gdp) / (1 + SIF),
            VOT: get_var_value(301),
            EmmCost: $('input[name="emissionCost"]:checked').val(),
            vehEmm: get_var_value(15),
            CrashRate: get_var_value(10),
            BCrashRate: get_var_value(11),
            GrowthNew: get_var_value(4),
            SIF: get_var_value(25)
        };

        return data;
    }

    function transpose(array) {
      return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    }

    const indicesToRemove = [12, 11, 10, 9, 1].sort((a, b) => b - a);

    $('.adv-cal-button').click(() => {
        var data = arrange_data();  // Assuming arrange_data is defined and available
        $.ajax({
            url: '/submit-data',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                // console.log('Success:', response);
                output = response.Output;
                npv = response.NPV;
                irr = response.IRR;
                constru_cost = output[0][1];
                output_drop = output.slice(1);
                output_t = transpose(output_drop);
                years = output_t[0];
                net_cash_data = output_t[7];
                pres_cash_data = output_t[8];
                n_reduced_fsc = output_t[9];
                n_reduced_mor = output_t[10];
                reduced_co2 = output_t[11];
                h_saved = output_t[12];
                // console.log(constru_cost);
                // console.log(years);
                // console.log(net_cash_data);
                // console.log(pres_cash_data);
                const indicesToRemove = [12, 11, 10, 9, 1].sort((a, b) => b - a);
                output_remove = output_drop.map(row => {
                    indicesToRemove.forEach(index => row.splice(index, 1)); // Remove element at each index
                    return row;
                });
                $(document).ready(function() {
                    $('.download-button').on('click', function() {
                        $('.download-button').unbind();
                      // Set the window's location to the file's URL, prompting the download
                        window.location.href = `/outputs/${response.name}`;
                    });
                  });
                plot_chart(years, net_cash_data, pres_cash_data, npv, irr, constru_cost, output_remove, n_reduced_fsc, n_reduced_mor, reduced_co2, h_saved);
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });

    var delete_value_by_id = (value_id) => {
        console.log('Selected value_id: ' + value_id);
        $.ajax({
            url: '/del-val', // Change this URL if your app is not running locally
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ value_id: value_id }),
            success: function(data) {
                console.log(data);
                refresh_data();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }; 

    var add_value = (var_id, var_value, display_style, comment) => {
        console.log('Selected var_id: ' + var_id);
        console.log('Selected var_value: ' + var_value);
        console.log('Selected display_style: ' + display_style);
        console.log('Selected comment: ' + comment);
        $.ajax({
            url: '/add-val', // Change this URL if your app is not running locally
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                var_id: var_id,
                var_value: var_value,
                display_style: display_style,
                comment: comment
            }),
            success: function(data) {
                console.log(data);
                refresh_data();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    $('.fa-minus').click(function() {
        // `this` refers to the clicked button
      $this = $(this);
      var cur_selection = $this.parent().find('select option:selected').html()
      var selectedOption = $this.parent().find('select option:selected');
      var valueId = selectedOption.attr('value_id');
      set_msg_box(`Are you sure to delete ${cur_selection}`, 'Delete', 'Cancel', delete_value_by_id, valueId);
      // $(this).parent().find('select option:selected').remove();// Changes the text color of the clicked button to red
    });

    $('.fa-plus').click(function() {
        // `this` refers to the clicked button
      $this = $(this)
      var cur_id = $this.parent().attr('var_id');
      var cur_value = $this.parent().find('input').val();
      set_msg_box_input(`Please insert the region`, 'Add', 'Cancel', add_value, {var_id: cur_id, var_value: cur_value});
      // $(this).parent().find('select option:selected').remove();// Changes the text color of the clicked button to red
    });

    refresh_data();

})(jQuery);
