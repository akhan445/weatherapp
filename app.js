const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitute, results.longitude, (errorMessage, wResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(`It's currently ${wResults.temperature}. Feels like ${wResults.apparentTemperature}`);
        }
      });
    }
  });
