const express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var firebase = require("firebase");
const app = express();
var phonenumber;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

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
  var newpostref;
  var postId;
function writeUserData(userId, Month, DayOfWeek, DateNo, textbody) {
  newpostref = firebase.database().ref('users/' + userId).push({
    month: Month,
    dayofweek: DayOfWeek,
    date: DateNo,
    text: textbody
  });
  postId = newpostref.key;
  console.log(postId);
}

app.post('/number', function(request, response){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	var DOW = today.getDay(); //day of week
	var dayofweek='';
	switch(DOW){
		case 0:
			dayofweek = 'Sun';
			break;
		case 1:
			dayofweek = 'Mon';
			break;
		case 2:
			dayofweek = 'Tue';
			break;
		case 3:
			dayofweek = 'Wed';
			break;
		case 4:
			dayofweek = 'Thu';
			break;
		case 5:
			dayofweek = 'Fri';
			break;
		case 6:
			dayofweek = 'Sat';
			break;
	}

	if(dd<10) {
  	  dd='0'+dd
	}

	var month = '';
	switch(mm){
		case 0:
		month = 'January'
		break;
		case 1:
		month = 'February'
		break;
		case 2:
		month = 'March'
		break;
		case 3:
		month = 'April'
		break;
		case 4:
		month = 'May'
		break;
		case 5:
		month = 'June'
		break;
		case 6:
		month = 'July'
		break;
		case 7:
		month = 'August'
		break;
		case 8:
		month = 'September'
		break;
		case 9:
		month = 'October'
		break;
		case 10:
		month = 'November'
		break;
		case 11:
		month = 'December'
		break;
	}
	if (mm < 10){
		mm = '0'+mm;
	}
	console.log(request.body.From);

	writeUserData(request.body.From, month, dayofweek, dd, request.body.Body);


// 	function writeUserData(phone, message) {
//   	firebase.database().ref('phone/' + phone).set({
//     message: message
//   });
// }
});

app.get('/loaddata', function(request,response){

	var ref = database.ref('users').child(phonenumber);
	ref.on('value', gotData, errData);

function gotData(data){
	var users = data.val();
	var keys = Object.keys(users);

	console.log(users);
	/*for (var i = 0; i < keys.length;i++){
		var k = keys[i];
		var month = users[i].month;
		var dayofweek = users[i].dayofweek;
		console.log(month, dayofweek);
	}*/
	response.json(users);

}

function errData(err){

	console.log('Error!');
	console.log(err);

}


});

app.get('/', function(request, response){
	var accountSid = 'ACf4e6e2b01c31b2a04344e6995ea62d87'; // Your Account SID from www.twilio.com/console
	var authToken = 'e88828f170b783f25134140d9b3b729b';   // Your Auth Token from www.twilio.com/console

	var twilio = require('twilio');
	var client = new twilio.RestClient(accountSid, authToken);

	client.messages.create({
   		body: 'Tell me about your day',
    	to: '+12016889444',  // Text this number
    	from: '+13473219867' // From a valid Twilio number
	}, function(err, message) {
    	console.log(message.sid);
	});

	response.send('Sent text')
});

app.get('/getnumber', function(request, response){
	console.log(request.query.var);
});

app.get('/login', function(request, response){

	var ref = database.ref('users');
	ref.on('value', checklogin)

	function checklogin(data){
		var users = data.val();
		console.log(users);
	}


	function notregistered(){
		var accountSid = 'ACf4e6e2b01c31b2a04344e6995ea62d87'; // Your Account SID from www.twilio.com/console
		var authToken = 'e88828f170b783f25134140d9b3b729b';   // Your Auth Token from www.twilio.com/console

		var client = new twilio.RestClient(accountSid, authToken);
		client.messages.create({
			body: 'Thanks for registering!',
			to: phonenumber,
			from: '+13473219867'
		}, function(err, message) {
			console.log(message.sid);
		});


	}



});









app.listen(port, function(err){
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
