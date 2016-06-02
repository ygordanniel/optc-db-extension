// Function that make the search call.
function charSearch(char_name){
	// Search url creation with the name typed on the input text.
    var charSearchUrl = "http://optc-db.github.io/characters/#/search/" + char_name;
    // Open a new tab with the URL to search.
    chrome.tabs.create({ url: charSearchUrl });
}