const express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var firebase = require("firebase");
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 

const port = 3000
var config = {
    apiKey: "AIzaSyAE9TRuSZWqAKml8MxQKuWc6IUZ2NAgfdc",
    authDomain: "hackru17.firebaseapp.com",
    databaseURL: "https://hackru17.firebaseio.com",
    projectId: "hackru17",
    storageBucket: "hackru17.appspot.com",
    messagingSenderId: "499216030015"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

function writeUserData(userId, time, text) {
  firebase.database().ref('users/' + userId).push({
    date: time,
    data: text
  });
}
app.post('/number', function(request, response){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
  	  dd='0'+dd
	} 

	if(mm<10) {
 	   mm='0'+mm
	} 
	today = mm+'/'+dd+'/'+yyyy;
	console.log(request.body.From);

	writeUserData(request.body.From, today, request.body.Body);


// 	function writeUserData(phone, message) {
//   	firebase.database().ref('phone/' + phone).set({
//     message: message
//   });
// }
});

app.get('/', function(request, response){  
	var accountSid = 'ACf4e6e2b01c31b2a04344e6995ea62d87'; // Your Account SID from www.twilio.com/console
	var authToken = 'e88828f170b783f25134140d9b3b729b';   // Your Auth Token from www.twilio.com/console

	var twilio = require('twilio');
	var client = new twilio.RestClient(accountSid, authToken);

	client.messages.create({
   		body: 'Tell me about your day',
    	to: '+17328533909',  // Text this number
    	from: '+13473219867' // From a valid Twilio number
	}, function(err, message) {
    	console.log(message.sid);
	});

	response.send('Sent text')
});


app.listen(port, function(err){  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})