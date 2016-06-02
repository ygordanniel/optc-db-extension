// Made by: Ygor Azevedo 
// https://github.com/ygordanniel
// About me: I'm a brazilian Computer Science student and I love to code.
// I'm stating my way on web coding, since feburary, and I'm looking for
// every chance I can get to make something usefull. If I can help at least
// one pearson other than me I'll be very glad.


// Adding keyupress event when the windows of the extension is opened
document.addEventListener('DOMContentLoaded', function () {
	// Focus the input text once the popup is opened.
	$('[data-name=char_name]').focus();

	//Call function to show table with turtle times.
	makeTurtleTimeAPIRequest();

	$('#timezone').html('Timezone: ' + getUserTimezoneString());

	//Call function to show table with turtle times when change the 6th digit of ID.
	$('[data-action=userDigit]').change(function() {
		makeTurtleTimeAPIRequest();
	});

	//Call function to show table with turtle times when change the version.
	$('#versionForm').change(function() {
		makeTurtleTimeAPIRequest();
	});

	// Get input text with data-name = char_name and bind the keypress event to it.
	// The event  will be triggered when enter is pressed.
	$('[data-name=char_name]').keypress(function(event) {
		//Validate if the key pressed is ENTER
		if ( event.which == 13 ) {
			// Call function passing the text typed on the input text
			charSearch($('[data-name=char_name]').val());
		}
	});

	$body = $('body');

	$(document).on({
	    ajaxStart: function() { $body.addClass("loading");    },
	    ajaxStop: function() { $body.removeClass("loading"); }    
	});
});

// Function that make the search call.
function charSearch(char_name){
	// Search url creation with the name typed on the input text.
    var charSearchUrl = "http://optc-db.github.io/characters/#/search/" + char_name;
    // Open a new tab with the URL to search.
    chrome.tabs.create({ url: charSearchUrl });
}