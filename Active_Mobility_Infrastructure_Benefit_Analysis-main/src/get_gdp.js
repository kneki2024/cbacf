const https = require('https');

// Function to get GDP per Capita data
function getGDPPerCapita(countryCode, callback) {
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json`;

    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        resp.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                if (jsonData[1]) {
                    // console.log(jsonData[1])
                    let _i = 0;
                    while (_i < jsonData[1].length) {
                        let gdpData = jsonData[1][_i];
                        if (gdpData.value) {
                            callback({
                                status: 0,
                                msg: {
                                    country: gdpData.country.value,
                                    year: gdpData.date,
                                    gdp: gdpData.value
                                }
                            });
                            break;
                        } else {
                            _i++;
                        }
                    }
                    if (_i === jsonData[1].length) {
                        callback({
                            status: 1,
                            msg: 'No valid GDP per capita data found.'
                        });
                    }
                } else {
                    callback({
                        status: 1,
                        msg: 'No GDP per capita data available.'
                    });
                }
            } catch (e) {
                callback({
                    status: 2,
                    msg: `Error parsing JSON: ${e}`
                });
            }
        });
    }).on("error", (err) => {
        callback({
            status: 3,
            msg: `Error: ${err.message}`
        });
    });
}

module.exports = getGDPPerCapita;


