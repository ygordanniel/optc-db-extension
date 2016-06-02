// Made by: Ygor Azevedo 
// https://github.com/ygordanniel
// About me: I'm a brazilian Computer Science student and I love to code.
// I'm stating my way on web coding, since feburary, and I'm looking for
// every chance I can get to make something usefull. If I can help at least
// one pearson other than me I'll be very glad.


// Adding event when the windows of the extension is opened
document.addEventListener('DOMContentLoaded', function () {
	// Focus the input text once the popup is opened.
	$('[data-name=char_name]').focus();
	
	getChromeCookies('https://optctimer.com/*', "_optcPH-digit", function(cookieValue) {
	    $('[data-action=userDigit]').val(cookieValue);
	});
	getChromeCookies('https://optctimer.com/*', "_optcPH-version", function(cookieValue) {
	    $('#versionForm input[value=' + cookieValue + ']').prop('checked', true);
	});
	getChromeCookies('https://optctimer.com/*', "_optcPH-timeFormat", function(cookieValue) {
	    $('#timeFormatForm input[value=' + cookieValue + ']').prop('checked', true);
	});

	//Call function to show turtle time table.
	setTimeout(makeTurtleTimeAPIRequest, 500);

	$('#timezone').html('Timezone: ' + getUserTimezoneString());

	//Call function to show turtle time table when change the 6th digit of ID.
	$('[data-action=userDigit]').change(function() {
		var digit = $(this).val();
		setChromeCookies('https://optctimer.com/*', '_optcPH-digit', digit);
		setTimeout(makeTurtleTimeAPIRequest, 500);
	});

	//Call function to show turtle time table when change the version.
	$('#versionForm').change(function() {
		var version = $('input[name=version]:checked', '#versionForm').val();
		setChromeCookies('https://optctimer.com/*', '_optcPH-version', version);
		setTimeout(makeTurtleTimeAPIRequest, 500);
	});

	//Call function to show turtle time table when change the time format to 12 hour or 24 hours.
	$('#timeFormatForm').change(function() {
		var timeFormat = $('input[name=timeformat]:checked', '#timeFormatForm').val();
		setChromeCookies('https://optctimer.com/*', '_optcPH-timeFormat', timeFormat);
		setTimeout(makeTurtleTimeAPIRequest, 500);
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

	// $body = $('body');

	// $(document).on({
	//     ajaxStart: function() { $body.addClass("loading");    },
	//     ajaxStop: function() { $body.removeClass("loading"); }    
	// });

});