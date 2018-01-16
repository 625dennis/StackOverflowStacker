chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		switch(msg.type) {
			case 'loadedContentscript':
				chrome.tabs.query({ currentWindow: true, active: true}, function(tabArray) {
					chrome.pageAction.show(tabArray[0].id);
				});
				break;
			case 'getHistory':
				chrome.history.search({text: 'https://stackoverflow.com/questions/'}, function(results) {
					port.postMessage({ type: 'gotHistory', data: results });
				});
				break;
		}
	});
});