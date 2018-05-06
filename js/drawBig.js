(function() {

	const scheme = [
		{
			image : 'vosmerka'
		},
		{
			image : 'treug'
		},
		{
			image : 'krestik1'
		},
		{
			image : 'krestik2'
		},
		{
			image : 'krestik3'
		},
		{
			image : 'krestik4'
		},
		{
			image : 'krestik5'
		},
		{
			image : 'krestik6'
		},
		{
			image : 'krestik7'
		}
	];

	let currentImage = 0, imagePath = 'image/draw/';

	let $ = function(id){return document.getElementById(id)};

	let canvas = this.__canvas = new fabric.Canvas('c', {
		isDrawingMode: true
	});

	fabric.Object.prototype.transparentCorners = false;

	let drawingColorEl = $('drawing-color'),
		drawingLineWidthEl = $('slider-line-width'),
		clearEl = $('clear-canvas'),
		rasterize = $('rasterize'),
		colorpicker = $('colorpicker');

	// color picker
	cp = ColorPicker(document.getElementById('slide'), document.getElementById('picker'),
		function(hex, hsv, rgb, mousePicker, mouseSlide) {
			currentColor = hex;
			ColorPicker.positionIndicators(
				document.getElementById('slide-indicator'),
				document.getElementById('picker-indicator'),
				mouseSlide, mousePicker
			);
			canvas.freeDrawingBrush.color = hex;
			drawingColorEl.value = hex;
            jQuery('#colorpicker').css({'border-color':hex})
		});
	cp.setHex('#e61cef');
	// color picker end

	clearEl.onclick = function() { canvas.clear() };

	jQuery( ".scheme" ).on( "click", function() {
		jQuery('.scheme').removeClass('current');
		let current = jQuery( this );
		current.addClass('current');

		if ( current.hasClass("krestik") ) {

			jQuery('.krestikCategory').addClass('current');

		}else if(current.hasClass("krestikCategory")){
			jQuery( ".krestik[value=" + current.val() + "]" ).addClass('current');
			//current.val()

		}

		currentImage = jQuery( this ).val();
		canvas.clear();
		canvas.setOverlayImage(imagePath + scheme[currentImage].image + '.png', canvas.renderAll.bind(canvas));
		canvas.loadFromJSON(scheme[currentImage].json); //
		canvas.renderAll();

	});

	jQuery("#slider-line-width").slider({
		//reversed: true
	});
	jQuery("#slider-line-width").on('slide', function(slideEvt) {
		jQuery("#drawing-line-width").text(slideEvt.value);
	});

	drawingColorEl.onchange = function() {
		canvas.freeDrawingBrush.color = this.value;
	};
	drawingLineWidthEl.onchange = function() {
		canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
		jQuery("#drawing-line-width").text(this.value);
	};
	if (canvas.freeDrawingBrush) {
		canvas.freeDrawingBrush.color = drawingColorEl.value;
		canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
	}

	// Add mouse events
	// ----------------

	canvas.on('mouse:down', function(options) {
	});

	canvas.on('mouse:move', function(options) {
		// Mouse move
	});
	canvas.on('mouse:up', function(options) {
		scheme[currentImage].json = JSON.stringify(canvas);
	});

	canvas.setOverlayImage(imagePath + scheme[0].image + '.png', canvas.renderAll.bind(canvas));
	jQuery('.vosmerka').addClass('current');

	//--------------end canvas to png image-----------------------
})();