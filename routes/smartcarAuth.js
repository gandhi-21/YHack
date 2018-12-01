
// Car Info
// Car Location
// Car Odometer
// Using the SmartCar api SDK
const smartcar = require('smartcar');
const express = require('express');

const app = express();

const port = 4000;

const client = new smartcar.AuthClient({
    clientId: : '',
    clientSecret: '',
    redirectUri: '',
    scope: ['']
});

app.get('/login', function(req, res) => {
    const link = client.getAuthUrl({state: ''});

    res.redirect(link);
});

app.get('/callback', function(req, res, next) {
    let access;

    if(req.query.error) {
        return next(new Error(req.query.error));
    }

    return client.exchangeCode(req.query.code)
        .then(function(_access) {
            access = _access;

            return smartcar.getVehicleIds(access.accessToken);
        })
        .then(function(res) {
        const vehicle = new smartcar.Vehicle(res.vehicles[0], access.accessToken);

        const info = vehicle.info();
        const location = vehicle.location();
        const odometer = vehicle.odometer();


        // Export the data
            exports.info = info;
            exports.location = location;
            exports.odometer = odometer;

        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));