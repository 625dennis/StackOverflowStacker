var port = chrome.runtime.connect();

port.postMessage({ type: 'loadedContentscript' })

$.get(chrome.extension.getURL('/stacker.html'), function(data) {
	var stackerDiv = $($.parseHTML(data));
	var stackerContent = $(stackerDiv.children('.content-wrapper'));
	
	stackerDiv.appendTo('header');
	$('header').after('<div style="margin-top: ' + stackerDiv.height() + 'px"></div>');
	
	port.onMessage.addListener(function(msg) {
		switch(msg.type) {
			case 'gotHistory':
				msg.data.forEach(function(history) {
					createHistoryButton(history).appendTo(stackerContent);
				});
				break;
		}
	});
	
	port.postMessage({ type: 'getHistory' });
});

function createHistoryButton(historyItem) {
	return $($.parseHTML(`<div class="stackItem"><a href="${historyItem.url}" title="${historyItem.title}"></a><span class="text">${historyItem.title}</span></div>`));
}