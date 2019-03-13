/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initMap();
        getLocation();
        startWatch();
        openCage();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function shake(){
    navigator.vibrate(1000);
}
function accCallback(acceleration){

    var element = document.getElementById('accelerometer');
	element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br>' +
			      'Acceleration Y: ' + acceleration.y + '<br>' +
			      'Acceleration Z: ' + acceleration.z + '<br>' +
			      'Timestamp: ' + acceleration.timestamp + '<br>';


}
function onError(){
    console.log('msg');
}
var options = {
    frequency: 3000
};

var watchID = null;

function startWatch(){

    watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options); 

}
function initMap() {
    console.log ("mapa funcionando");
    var cct = {lat: 53.346, lng: -6.2588};
    var position2 = {lat: 53.3458, lng: -6.2575};
    var map = new
    google.maps.Map(document.getElementById('map'),
    { zoom: 18,
    center: cct
    }
    );
    var marker = new google.maps.Marker({
    position: cct,
    map: map
    });
    var marker2 = new google.maps.Marker({
        position: position2,
        map: map
        });
    }

    function getLocation(){
        console.log("get location working");
        navigator.geolocation.getCurrentPosition(geoCallback, onError)
    }
    function geoCallback(position){
        console.log("geo callback working");
        console.log(geoCallback);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("latitude"+latitude);
        console.log("longitude"+longitude);
    }

    function onError (message){
        console.log("Deu ruim");

    }

    function updatemap(){


    }
    function openCage(){
        console.log("console log");
        // The XMLHttpRequest object, is the one in 
        // charge of handleing the request for us
        var http = new XMLHttpRequest();
    
        // The url to send the request to. Notice that we're passing
        // here some value of Latituted and longitude for the API 
        // to process
        const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.34592+-6.25881&key=22e5695431c543d682e4d4b52ec743ab';
        // Opening the request. Remember, we will send
        // a "GET" request to the URL define above
        http.open("GET", url);
        // Sending the request
        http.send();
    
        // Once the request has been processed and we have
        // and answer, we can do something with it
        http.onreadystatechange = (e) => {
            
            // First, I'm extracting the reponse from the 
            // http object in text format
            var response = http.responseText;
    
            // As we know that answer is a JSON object,
            // we can parse it and handle it as such
            var responseJSON = JSON.parse(response); 
        
            // Printing the result JSON to the console
            console.log(responseJSON);
    
            // Extracting the individual values, just as we
            // do with any JSON object. Just as we did 
            // with the position.
            // REMEMBER: In this case, we have an array inside 
            // the JSON object.
            var city = responseJSON.results[0].components.city;
            var country = responseJSON.results[0].components.country;
            var currency = responseJSON.results[0].annotations.currency.name;
    
            // Formattng data to put it on the front end
            var oc = "City: " + city + "<br>Country: " + country + "<br>Currency: " + currency;
    
            // Placing formatted data on the front ed
            document.getElementById('opencage').innerHTML = oc;
        }
        
    }
    
    
