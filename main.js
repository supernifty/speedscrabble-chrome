var timer;
var ok;
var ok_timer;
var server = "http://www.supernifty.com.au/";
function check() {
  chrome.browserAction.setBadgeText( { 'text': '..' } );
  chrome.browserAction.setBadgeBackgroundColor( { 'color': [192,192,192,255] } );
  chrome.browserAction.setTitle( { 'title': 'Checking...' } );
  YAHOO.util.Connect.asyncRequest('POST', server + "speed_scrabble_server.php", { success: success, failure: failed }, "json=" + YAHOO.lang.JSON.stringify({ "command": "public_state" }));
}

function success(o) {
  ok = true;
  var result = YAHOO.lang.JSON.parse(o.responseText)
  var total = result['waiting'].length + result['playing'].length;
  if ( total > 0 ) {
    chrome.browserAction.setBadgeText( { 'text': '' + total } );
    chrome.browserAction.setBadgeBackgroundColor( { 'color': [192,0,0,255] } );
    chrome.browserAction.setTitle( { 'title': total + ' player' + ( total==1 ? '' : 's' ) } );
  }
  else {
    chrome.browserAction.setBadgeText( { 'text': '' } );
    chrome.browserAction.setBadgeBackgroundColor( { 'color': [192,192,192,255] } );
    chrome.browserAction.setTitle( { 'title': 'Speed Scrabble' } );
  }
  timer = setTimeout( check, 30000 ); 
}

function failed() {
  ok = true;
  chrome.browserAction.setBadgeText( { 'text': '?' } );
  chrome.browserAction.setTitle( { 'title': 'Failed to get status' } );
  timer = setTimeout( check, 60000 ); 
}

function ok_check() {
  // in case failed to callback
  if ( !ok ) {
    timer = setTimeout( check, 1000 ); 
  }
  ok = false;
}

function init() {
  timer = setTimeout( check, 1000 ); 
  ok = false;
  ok_timer = setInterval( ok_check, 300000 );
}

YAHOO.util.Event.onDOMReady(init);
