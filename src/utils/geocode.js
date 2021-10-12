const request = require('postman-request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
    )}
    .json?access_token=pk.eyJ1IjoiYXN0cm9hbmtpdCIsImEiOiJja3VqcTU3MnMweXcyMnJvejZ2MTg5c3BoIn0.XVGttoqzy0eXUXH-BlssGw`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!!', undefined);
        } else if (response.body.features.length == 0) {
            callback(
                'Unable to find such location. Try another search!!',
                undefined
            );
        } else {
            callback(null, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
