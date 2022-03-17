const request = require("request");
const forecast = (placename, longtitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=558764f773b4d5138fa0872f454ac622&query=${longtitude + "," + latitude}&units=m`;
    request(
        {
            url: url,
            json: true
        },
        (error, response, body) => {
            if (error) {
                callback("An error has occurred;");
            }
            else if (body.error) {
                callback("Unable to find the location you are looking at")
            }
            else {
                const forcastData = `it is currently ${body.current.temperature + body.request.unit} out. There is a ${body.current.precip}% chance of rain. for place ${placename}`;
                callback(undefined, forcastData)
            }

        }
    );

}

module.exports = forecast;