const request = require("request");
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFsYW1kZGluZSIsImEiOiJjbDBxZnRvN3EwMG1sM2N1bGNwNGE4Y3l5In0.4bxGTmLVt4sF2wrx97xxoA&limit=1`;

    request(
        {
            url: url,
            json: true
        },
        (error, response, body) => {
            if (error) {
                callback("unable to connect to location services!")
            }
            else if (body.features.length === 0) {
                callback("unable to find location. try another search.");
            }
            else {
                const data = {
                    longitude: body.features[0].geometry.coordinates[0],
                    latitude: body.features[0].geometry.coordinates[1],
                    place_name:body.features[0].place_name
                };
                callback(undefined, data)
            }
        }
    );
}

module.exports = geocode