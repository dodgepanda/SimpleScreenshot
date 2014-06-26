// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
var id = 100;

function takeScreenshot(_ssX, _ssY, _ssW, _ssH) {
	
	_ssX = typeof _ssX !== 'undefined' ? _ssX : 100;
	_ssY = typeof _ssY !== 'undefined' ? _ssY : 100;
	_ssW = typeof _ssW !== 'undefined' ? _ssW : 150;
	_ssH = typeof _ssH !== 'undefined' ? _ssH : 150;
	
	chrome.tabs.captureVisibleTab(
		null,
		{
			format: 'png'
		},
		function(img) {
		var screenshotUrl = img;
		var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)

		chrome.tabs.create({url: viewTabUrl}, function(tab) {
			var targetId = tab.id;

			var addSnapshotImageToTab = function(tabId, changedProps) {
				// We are waiting for the tab we opened to finish loading.
				// Check that the the tab's id matches the tab we opened,
				// and that the tab is done loading.
				if (tabId != targetId || changedProps.status != "complete")
				return;

				// Passing the above test means this is the event we were waiting for.
				// There is nothing we need to do for future onUpdated events, so we
				// use removeListner to stop geting called when onUpdated events fire.
				chrome.tabs.onUpdated.removeListener(addSnapshotImageToTab);

				// Look through all views to find the window which will display
				// the screenshot.  The url of the tab which will display the
				// screenshot includes a query parameter with a unique id, which
				// ensures that exactly one view will have the matching URL.
				var views = chrome.extension.getViews();
				for (var i = 0; i < views.length; i++) {
					var view = views[i];
					if (view.location.href == viewTabUrl) {
						view.setScreenshotUrl(screenshotUrl, _ssX, _ssY, _ssW, _ssH);
						break;
					}
				}
			};
			chrome.tabs.onUpdated.addListener(addSnapshotImageToTab);
		});
	});	
}

function toggleOverlay(){	//Toggle the overlay on the content page
	chrome.tabs.executeScript({
		code: 'simpleScreenshots.toggleOverlay();'
	}); 
}

function screenshotCommand(){
	chrome.tabs.executeScript({
		code: 'simpleScreenshots.getDragbox();'
	}, function(result){
		console.log(result);
		console.log(result[0]);
		if(result[0]){
			takeScreenshot(result[0].x,result[0].y,result[0].w,result[0].h);
		}else{
			toggleOverlay();
		}
	}); 
}

// Listen for a click on the camera icon.  On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function(tab) {
	if (tab.url.match("^https?://code.google.com") || true) {
		//takeScreenshot(0,0);
		screenshotCommand();
	} else {
		alert('This sample can only take screenshots of code.google.com pages');
	}
});


//Event listener for shortcut hotkeys
chrome.commands.onCommand.addListener(function(command) {
	if(command == 'toggle-feature-overlay'){
		toggleOverlay();
	}
	if(command == 'debug'){
		screenshotCommand();
	}
	if(command == 'take-screenshot'){
		// console.log('taking ss');
		// takeScreenshot(200,200,200,200);
		chrome.tabs.executeScript({
			code: 'simpleScreenshots.overlayIsVisible();'
		}, function(result){
			console.log(result);
			console.log(result[0]);
		}); 
	}
});
