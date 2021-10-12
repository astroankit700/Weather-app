const request = require('postman-request');

const forecast = ({ latitude, longitude, location }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=355be30bc7c3844ee5f4a3f5fe1aab29&query=${latitude},${longitude}&units=m`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(`Unable to connect to weather services!!`, undefined);
        } else if (response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            let current = response.body.current;
            let weathericon = current.weather_icons[0];
            let { temperature, feelslike, humidity, precip, wind_speed } =
                current;
            callback(null, {
                location,
                describe: current.weather_descriptions[0],
                temperature,
                feelslike,
                humidity,
                precip,
                weathericon,
                wind_speed,
            });
        }
    });
};

module.exports = forecast;
