// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setScreenshotUrl(url, _ssX, _ssY, _ssW, _ssH) {
	document.getElementById('target').src = url;

	var ssX = _ssX;
	var ssY = _ssY;
	var ssWidth = _ssW;
	var ssHeight = _ssH;

	var canvas = document.getElementById('myCanvas');
	canvas.width = ssWidth;
	canvas.height = ssHeight;
	var context = canvas.getContext('2d');
	var imageObj = new Image();

	imageObj.onload = function() {
		// draw cropped image
		var sourceX = ssX;
		var sourceY = ssY;
		var sourceWidth = ssWidth;
		var sourceHeight = ssHeight;
		var destWidth = sourceWidth;
		var destHeight = sourceHeight;
		var destX = canvas.width / 2 - destWidth / 2;
		var destY = canvas.height / 2 - destHeight / 2;

		context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
		document.getElementById('target').src = canvas.toDataURL("image/png", 1);
	};
	imageObj.src = url;
}
