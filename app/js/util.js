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