// init script after load script google api
function initGoogleAdress() {
    const form = document.querySelector('form');
    form.onsubmit = submitForm;
}

// submit form
function submitForm(event) {
    event.preventDefault();

    let nameCity = document.querySelector('[name="name"]').value;
    let coordLat = document.querySelector('[name="lat"]').value;
    let coordLon = document.querySelector('[name="lon"]').value;
    if(nameCity){
        // get name city
        let service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: nameCity }, getCity);
    }else if( coordLat && coordLon ){
        getWeather('', [coordLat, coordLon]);
    }else{
        document.getElementById('result').textContent = 'Enter a city or coordinates';
    }

}

// get name city from api
function getCity(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        document.getElementById('result').textContent = 'City not found. Enter the city correctly.';
        console.log(status);
        return;
    }
    getWeather(predictions[0].structured_formatting.main_text);
}

// get weather from api
function getWeather(city = '', coord = ''){
    if(city){
        var url = 'https://api.openweathermap.org/data/2.5/weather?appid=e51fbb9c2d760c0d49f6e7c7b29688f9&q='+city;
    }else if(coord){
        var url = 'https://api.openweathermap.org/data/2.5/weather?appid=e51fbb9c2d760c0d49f6e7c7b29688f9&lat=' + coord[0] + '&lon=' + coord[1];
    }

    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        var weather = JSON.parse(xhr.response);

        if(weather.name){
            document.getElementById('result').textContent = weather.name + ' temp: ' + weather.main.temp;
            console.log(weather);
            saveCity(weather.name);
        }else{
            document.getElementById('result').textContent = 'Enter the city correctly';
        }
    };
    xhr.send();
}

// save city to DB
function saveCity(city){
    xhr = new XMLHttpRequest();
    xhr.open('POST', '/tutorial/city');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if(xhr.response != 'ok'){
            alert(xhr.response);
        }
    };
    xhr.send('name=' + encodeURIComponent(city));
}
