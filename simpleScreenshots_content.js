/**
	Functions to manipulate the content page to display an overlay in order 
	to draw	the selection box for cropping screenshots
*/
var simpleScreenshots = {
	overlayID: 'simpleScreenshots_overlay',
	dragboxID: 'simpleScreenshots_dragbox',
	dragbox: null,

	getDragbox: function(){
		if(!simpleScreenshots.getOverlay())
			return null;
	
		return {
			"id": simpleScreenshots.dragbox.getAttribute('id'),
			"y": simpleScreenshots.dragbox.offsetTop,
			"x": simpleScreenshots.dragbox.offsetLeft,
			"w": simpleScreenshots.dragbox.offsetWidth,
			"h": simpleScreenshots.dragbox.offsetHeight
		};
	},
	
	getOverlay: function(){
		return document.getElementById(simpleScreenshots.overlayID);
	},

	overlayIsVisible: function(){
		if(!simpleScreenshots.getOverlay())
			return false;
		return (simpleScreenshots.getOverlay().style.visibility == 'visible');
	},

	showOverlay: function() {
		simpleScreenshots.getOverlay().style.visibility = 'visible';
	},

	hideOverlay: function() {
		simpleScreenshots.getOverlay().style.visibility = 'hidden';
	},

	addOverlay: function(){
		var overlay = document.createElement("div");
		overlay.setAttribute("id",simpleScreenshots.overlayID);
		overlay.setAttribute("class",simpleScreenshots.overlayID);
		
		simpleScreenshots.dragbox = document.createElement("div");
		simpleScreenshots.dragbox.setAttribute("id",simpleScreenshots.dragboxID);
		simpleScreenshots.dragbox.setAttribute("class","ui-widget-content");		
		overlay.appendChild(simpleScreenshots.dragbox);
		
		var x = document.createElement("div");
		x.setAttribute("id","simpleScreenshots_overlay_top");
		x.setAttribute("class","simpleScreenshots_overlay_top");		
		overlay.appendChild(x);
		var y = document.createElement("div");
		y.setAttribute("id","simpleScreenshots_overlay_left");
		y.setAttribute("class","simpleScreenshots_overlay_left");		
		overlay.appendChild(y);
		var z = document.createElement("div");
		z.setAttribute("id","simpleScreenshots_overlay_right");
		z.setAttribute("class","simpleScreenshots_overlay_right");		
		overlay.appendChild(z);
		
		document.body.appendChild(overlay);
		
		$( "#"+simpleScreenshots.dragboxID ).draggable({ 
			containment: "parent",
			drag: function() {
				console.log('a');
				// $( "#simpleScreenshots_overlay_top" ).height(simpleScreenshots.dragbox.offsetTop);
				
				// $( "#simpleScreenshots_overlay_left" ).width(simpleScreenshots.dragbox.offsetLeft);
				// $( "#simpleScreenshots_overlay_left" ).css('top', simpleScreenshots.dragbox.offsetTop);
				// $( "#simpleScreenshots_overlay_left" ).height(simpleScreenshots.dragbox.offsetHeight);
				
				// $( "#simpleScreenshots_overlay_right" ).css('left', simpleScreenshots.dragbox.offsetLeft + simpleScreenshots.dragbox.offsetWidth);
				// $( "#simpleScreenshots_overlay_right" ).css('top', simpleScreenshots.dragbox.offsetTop);
				// $( "#simpleScreenshots_overlay_right" ).height(simpleScreenshots.dragbox.offsetHeight);
			}
		});
		$( "#"+simpleScreenshots.dragboxID ).resizable({ 
			containment: "parent",
			resize: function(){
				// $( "#simpleScreenshots_overlay_left" ).height(simpleScreenshots.dragbox.offsetHeight);
				// $( "#simpleScreenshots_overlay_right" ).height(simpleScreenshots.dragbox.offsetHeight);
			}
		});
		
		simpleScreenshots.getOverlay().style.visibility = 'visible';
	},

	removeOverlay: function(){
	   document.body.removeChild(simpleScreenshots.getOverlay());
	},

	resetOverlay: function(){
		$( "#"+simpleScreenshots.dragboxID ).height(100);
		$( "#"+simpleScreenshots.dragboxID ).width(100);
		$( "p:last" ).offset({ top: 10, left: 10 });
	},
	
	toggleOverlay: function(){
		if(simpleScreenshots.getOverlay()){
			//simpleScreenshots.removeOverlay();
			if(simpleScreenshots.overlayIsVisible()){
				simpleScreenshots.hideOverlay();
			}else{
				simpleScreenshots.showOverlay();
			}
		}else{
			simpleScreenshots.addOverlay();
		}
	}

};

