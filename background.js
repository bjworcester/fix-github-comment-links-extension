var global = {
  disabled: false
};
function disableExtension(disabled)
{
  global.disabled = disabled;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg == "getDisabled") {
    sendResponse({disabled: global.disabled});
    return true;
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  disableExtension(!global.disabled);
});