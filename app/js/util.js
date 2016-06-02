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
function setChromeCookies(url, name, value) {
    chrome.cookies.set({
	    "name": name,
	    "url": url,
	    "value": value
	}, function (cookie) {
	    console.log(JSON.stringify(cookie));
	    console.log(chrome.extension.lastError);
	    console.log(chrome.runtime.lastError);
	});
}