var plot_chart = (years, net_cash_data, pres_cash_data) => {
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
                    data: years,
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