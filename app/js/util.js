//**********************************STRING MANIPULATION**********************************/

/****************************************************************************
 * Made by: Ygor Danniel													*
 * https://github.com/ygordanniel											*
 * About me: I'm a brazilian Computer Science student and I love to code.	*
 * I'm stating my way on web coding, since feburary, and I'm looking for 	*
 * every chance I can get to make something usefull. If I can help at least	*
 * one pearson other than me I'll be very glad.								*
 ****************************************************************************/

//Method to replace a char passing it index on the string.
//Credits to http://stackoverflow.com/users/173347/cem-kalyoncu
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character +  this.substr(index+(character.length - (character.length-1)));
}

//Momento.js method to get user timezone String, e.g, America/Sao_Paulo
function getUserTimezoneString(ignoreCache) {
	return moment.tz.guess(ignoreCache);
}

/*****************************************************************************************
 * Get timezone offset of user. Represents the number of minutes ahead or behind the UTC.*
 * Returns positive if timezone is behind and negative if timezone is ahead.	  		 *
 * Examples: 																	  		 *
 * 		UTC + 10 returns -600													  		 *
 * 		UTC - 3 returns 180														  		 *
 *****************************************************************************************/
function getUserTimezoneOffset() {
	var offset = new Date().getTimezoneOffset();
	var timezone = (offset / 60);
	return timezone;
}

/********************************************************************
 * Function to converte time from 24 hour format to 12 hour format	*
 * param string of time you wanna convert. timeString must be like 	*
 *		"15:00" model.												*
 * return string formated to 12 hour. "03:00 PM"					*
 ********************************************************************/
function getTimeAsAmPm(timeString) {
	//Split string to get hour and minute.
	var split = timeString.split(':');
	//Set hour and minute
	var hour = parseInt(split[0]);
	var minute = parseInt(split[1]);
	//Set AM status
	var ampm = ' AM';
	//Set PM status if hour is greater than 12.
	if(hour >= 12){
		//Subtracts 12 to transform hour to 12 hour format.
		hour -= 12;
		//Set PM status
		ampm = ' PM';
	}
	//Set hour and minute string with a 0 before the number if it is smaller than 10.
	//This condictions are used show time on the default model. "03:00 PM".
	if(hour < 10){
		hour = '0' + hour;
	}
	if(minute < 10){
		minute = '0' + minute;
	}
	//Condition to set if it is midnight.
	if(hour == 0){
		hour = 12;
	}
	//Returns time formated
	return hour + ':' + minute + ampm;
}

/**********************************CHROME COOKIES**********************************/

/********************************************
 * Function to get a chrome cookie.			*
 * param url cookie is referenced to 		*
 * param name of the cookie 				*
 * param callback function to be executed 	*
 *********************************************/
function getChromeCookies(url, name, callback) {
    chrome.cookies.get({"url": url, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

/********************************************
 * Function to set a chrome cookie.			*
 * param url cookie will be reference to 	*
 * param name of the cookie 				*
 * param value of the cookie 			 	*
 *********************************************/
function setChromeCookies(url, name, value, daysToExpire) {
	var date = new Date();
	date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
	var expirationDate = date.getTime();
    chrome.cookies.set({
	    'name': name,
	    'url': url,
	    'value': value,
	    'expirationDate': expirationDate
	}, function (cookie) {
	    console.log(JSON.stringify(cookie));
	    console.log(chrome.extension.lastError);
	    console.log(chrome.runtime.lastError);
	});
}

/**********************************CHROME NOTIFICATIONS**********************************/

//Id to identify each notification
var id = 0;

//Options of the notification.
//0 for 10 minutes notify
//1 for 5 minutes notify
//2 for 1 minutes notify
var options = [
	//0
	{
		type : "basic",
		title: "Turtle Time",
		iconUrl: "icon-64x64.png",
		message: "Your turtle isle will start in 10 minutes."
		// expandedMessage: "Your turtle time will start in 10 minutes."
	},
	//1
	{
		type : "basic",
		title: "Turtle Time",
		iconUrl: "icon-64x64.png",
		message: "Your turtle isle will start in 5 minutes."
		// expandedMessage: "Your turtle time will start in 5 minutes."
	},
	//2
	{
		type : "basic",
		title: "Turtle Time",
		iconUrl: "icon-64x64.png",
		message: "Your turtle isle will start in 1 minutes. RUNNNNN!"
		// expandedMessage: "Your turtle time will start in 1 minute. RUN!"
	}];

//Show a notification to user with options defined.
function doNotify(optionsIndex) {
	chrome.notifications.create("id"+id++, options[optionsIndex], creationCallback);
}

//Callback to log notification creation.
//Close notification after 3 seconds.
function creationCallback(id) {
	console.log("Succesfully created " + id + " notification");
	setTimeout(function() {
		chrome.notifications.clear(id, function(wasCleared) {
			console.log("Notification " + id + " cleared: " + wasCleared);
		});
	}, 5000);
}

//Log when notification is closed
//Stops notification sound
function notificationClosed(id, bByUser) {
	console.log("The notification '" + id + "' was closed" + (bByUser ? " by the user" : ""));
	audioNotification(0);
}

//Log when notification is clicked
// function notificationClicked(id) {
// 	console.log("The notification '" + id + "' was clicked");
// }

//Log when notification button on notification is clicked
//Stops notification sound
// function notificationBtnClick(id, iBtn) {
// 	console.log("The notification '" + id + "' had button " + iBtn + " clicked");
// }

/**********************************DATE MANIPULATION**********************************/


/****************************************************
 * Function to compare minutes with the time now 	*
 * param minute to compare to minutes now 			*
 * param option of the notification 				*
 * if minutes are equal call checkHour function 	*
 ****************************************************/
function checkMinutes(minutes, optionsIndex) {
	if(new Date().getMinutes() == minutes){
		var hours = getNextTurtleDate().getHours();
		checkHours(hours, optionsIndex);
	// }
}

/********************************************************
 * Function to compare hours with the time now 			*
 * param hours to compare to hours now 					*
 * param options of the notification 					*
 * if hours are create a notification to informe user	*
 *		that turtle time is close.						*
 ********************************************************/
function checkHours(hours, optionsIndex) {
	if(new Date().getHours() == (hours - 1)){
		doNotify(optionsIndex);
		audioNotification(1);
	}
}

//DEBUGGER FUNCTION
// function triggerAudioNotification(minute) {
// 	checkMinutes(minute, 0);
// }

/**********************************AUDIO MANIPULATION**********************************/

//Global variable for audio notification
var notificationAudio = new Audio('notification/notificationAudio.mp3');

/****************************************************
 * Function to play or stop the audio notification.	*
 * param to play or stop audio.						*
 *		1 - play									*
 * 		Anything else - stop 						*
 ****************************************************/
function audioNotification(play){
	if(play == 1){
	    // notificationAudio.play();
	    notificationAudio.controls = false;
		notificationAudio.play();
		document.body.appendChild(notificationAudio);
		console.log('play');
	}else{
		notificationAudio.pause();
		notificationAudio.currentTime = 0;
		console.log('stop');
	}
}