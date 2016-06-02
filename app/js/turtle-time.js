/****************************************************************************
 * Made by: Ygor Danniel													*
 * https://github.com/ygordanniel											*
 * About me: I'm a brazilian Computer Science student and I love to code.	*
 * I'm stating my way on web coding, since feburary, and I'm looking for 	*
 * every chance I can get to make something usefull. If I can help at least	*
 * one pearson other than me I'll be very glad.								*
 ****************************************************************************/
 
/****************************************************************************************
 * Function to convert string into int array of [year, month, day].			   			*
 * param dateString MUST BE a string like "2016-06-01".							   		*
 * return 'String to conversion can't be empty' if dateString is empty.					*
 * return 'String to conversion must follow the model yyyy-mm-dd like "2016-06-01"'		*
 * 		  if dateString model is different than yyyy-mm-dd.						 	  	*
 * return [year, month, day] if string is formated correctly, e.g, if dateString was	*
 * 		  "2016-06-01" function would return "[2016, 5, 1]".	   						*
 ****************************************************************************************/
function getIntArrayYearMonthDay(dateString){
	//Validate if dateString is empty.
	if(!dateString.trim()){
		return 'String to conversion can\'t be empty';
	}
	//Validate if dateString model is a model of "yyyy-mm-dd".
	if((dateString.split('-').length) != 3){
		return 'String to conversion must follow the model yyyy-mm-dd like "2016-06-01"';
	}
	//Split string to get year, month and day.
	var split = dateString.split('-');
	var year = parseInt(split[0]);
	//Month  get -1 because first month is 0, not 1.
	var month = parseInt(split[1]) - 1;
	var day = parseInt(split[2]);
	//Creates Year Month Day array and return it.
	var ymd = [year, month, day];
	return ymd;
}

/****************************************************************************************************
 * Function to convert string into int array of [hour, minute].										*
 * param timeString MUST BE a string like "15:00:00+00:00".											*
 * return 'String to conversion can't be empty' if timeString is empty.								*
 * return 'String to conversion must follow the model hh:mm:ss+hh:mm like "15:00:00+00:00"'			*
 *		  if timeString model is different than hh:mm:ss+hh:mm.										*
 * return [hour, minute] if string is formated correctly, e.g, if timeString was "15:00:00+00:00"	*
 *		  function would return [15, 0].															*
 ****************************************************************************************************/
function getIntArrayHourMinutes(timeString) {
	//Validate if timeString is empty.
	if(!timeString.trim()){
		return 'String to conversion can\'t be empty';
	}
	//Validate if timeString is a model of "hh:mm:ss+hh:mm"
	if((timeString.split('+').length) != 2){
		return 'String to conversion must follow the model hh:mm:ss+hh:mm like "15:00:00+00:00"';
	}
	//Split string to remove the timezone.
	var split = timeString.split('+');
	var timeNoTimezone = split[0];
	//Get substring to remove the seconds and split to get hour and minute.
	var timeNoSeconds = timeNoTimezone.substring(0, 5).split(':');
	var hour = parseInt(timeNoSeconds[0]);
	var minutes = parseInt(timeNoSeconds[1]);
	//Creates Hour Minute array and return it.
	var hm = [hour, minutes];
	return hm;
}

/************************************************************************************
 * Function to convert arrays of date of the year and hour of a day into string 	*
 *		array ["Month DayNumber Year", "Hour:Minute"]								*
 * param array with year, month and day and array with hour and minute,				*
 *		arrays MUST CONTAIN ONLY int data.
 * return 'Array of Year Month Day must follow the model [year, month, day]' if 	*
 * 		if array length is different than 3.										*
 * return 'Array of Hour Minute must follow the model [hour, minute]' if array 		*
 *		length is different than 2.													*
 *	return ["Month DayNumber Year", "Hour:Minute"] if arrays are formated correctly	*
 ************************************************************************************/
function getStringArrayDateAndTime(ymd, hm, timeFormat) {
	//Validate if ymd length is different than 3
	if(ymd.length != 3){
		return 'Array of Year Month Day must follow the model [year, month, day]';
	}
	//Validate if hm length is different than 2
	if(hm.length != 2){
		return 'Array of Hour Minute must follow the model [hour, minute]';
	}
	var year, month, day, hour, minute;
	//Set year, month and date variables with the ymd array.
	year = ymd[0];
	month = ymd[1];
	day = ymd[2];

	//Set hour and minute with the hm array.
	//PS: set hour and convert it to the user timezone.
	hour = hm[0] - (getUserTimezoneOffset());
	minute = hm[1];
	//Create date object with year, month, day, hour and minute setted previously.
	var dateObject = new Date(year, month, day, hour, minute);
	//Get string Month DayOfMonth Year, e.g, like "Jun 01 2016".
	var dateOfYear = dateObject.toString().substring(4, 10);
	//Get string Hour:Minute, e.g, like "15:00"
	var hourOfDay = dateObject.toString().substring(16, 21);
	//Validate if the time format is 12 or 24 hours.
	if(timeFormat == '12'){
		hourOfDay = getTimeAsAmPm(hourOfDay);
	}

	//return array with dateOfyear and hourOfDay setted previously.
	return [dateOfYear, hourOfDay];
}

/************************************************************************
* Function to construct a table with the treated array of turtle time.	*
* param array with dateYear and timeDay string, array MUST BE like		*
*		["Month Day Year", "Hour:Minute"], e.g ["Jun 01 206", "15:00"]	*
* return 'Data not found.' if turtleTimeArray is empty or null.			*
* return table constructed with all the data inside turtleTimeArray.	*
*************************************************************************/
function makeTurtleTimeTable(turtleTimeArray) {
	//Validate if array is empty.
	if(turtleTimeArray.length < 1){
		return 'Data not found.';
	}
	//Create table and table head.
	var table = '<table>';
	table += '<thead><tr><th>Day</th><th>Time</th></tr></thead>';
	//Create table body.
	table += '<tbody>';
	//Create table rows interating the array
	for (var i = 0; i < turtleTimeArray.length; i++) {
		table += '<tr>' + '<td>' + turtleTimeArray[i][0] + '</td>' + '<td>' + turtleTimeArray[i][1] + '</td>' + '</tr>';
	}
	//Complete table and return it.
	table += '</tbody></table>';
	return table;
}

/****************************************************
 * Function to treat the server JSON response and 	*
 *		construct table with data of the response.	*
 * param JSON response from server.					*
 * return table to show on the html. 				*
 ****************************************************/
function getTurtleTimeTable(timeJSON, timeFormat) {
	//Declaration of array where all the treated data will go to.
	var turtleTimeArray = new Array();
	//Interate the JSON response from server.
	for (var i = 0; i < timeJSON.length; i++) {
		//Split date and time.
		var split = timeJSON[i].split('T');
		//Set date.
		var dateString = split[0];
		//Set time.
		var timeString = split[1];
		//Call functions to get arrays of values originally on string.
		var ymd = getIntArrayYearMonthDay(dateString);
		var hm = getIntArrayHourMinutes(timeString);
		//Convert arrays ymd and hm into a single array.
		var dateTime = getStringArrayDateAndTime(ymd, hm, timeFormat);
		//Push converted array into the turtleTimeArray.
		turtleTimeArray.push(dateTime);
	}
	return makeTurtleTimeTable(turtleTimeArray);
}

/********************************************************************
 * Function to call the JQuery Ajax request to get the turtle time.	*
 * Get JSON as response and call function to show Turtle Time table *
 ********************************************************************/
function makeTurtleTimeAPIRequest() {
	var version = $('input[name=version]:checked', '#versionForm').val();
	var digit = $('[data-action=userDigit]').val();
	var timeFormat = $('input[name=timeformat]:checked', '#timeFormatForm').val();
	console.log(version);
	console.log(digit);
	console.log(timeFormat);
	$.ajax({
		type: 'GET',
		url: 'https://optctimer.com/api/turtle',
		dataType: 'json',
		data: {
			'version': version,
			'digit': digit,
			'numOfDays': '3'
		},
		success: function (data) {
			$('#turtleTimeTable').empty().html(getTurtleTimeTable(data, timeFormat));
		},
		error: function (xhr, error) {
			console.log('Error: ' + error);
		}
	});
}