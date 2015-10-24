FabricHelper = function(canvasId, backgrounds, image) {

	this.backgrounds = backgrounds;
	this.image = image;
	this.canvasId = canvasId;
	this.bgIndex = 0;
	this.position = [];

	this.canvas = new fabric.Canvas(this.canvasId, {	
	  selection: false
	});

	this.canvas.setBackgroundImage(this.backgrounds[this.bgIndex], this.canvas.renderAll.bind(this.canvas));

	fabric.Image.fromURL(this.image, function(img) {
	  img.scale(1).set({
	    left: 150,
	    top: 150,
	    angle: 0
	  });
	  this.canvas.add(img).setActiveObject(img);
	}.bind(this));

	this.listen('object:rotating');
	this.listen('object:scaling');
	this.listen('object:moving');

	document.addEventListener("dblclick", function(e) {
		console.log(this.position);
	}.bind(this));

	document.addEventListener("keydown", function(e) {
		if(e.keyCode === 39) {
			if(this.bgIndex + 1 < this.backgrounds.length) {
				this.bgIndex += 1;
			} else {
				this.bgIndex = 0;
			}
			this.canvas.setBackgroundImage(this.backgrounds[this.bgIndex], this.canvas.renderAll.bind(this.canvas));
		} else if(e.keyCode === 37) {
			if(this.bgIndex - 1 > 0) {
				this.bgIndex -= 1;
			} else {
				this.bgIndex = this.backgrounds.length - 1;
			}
			this.canvas.setBackgroundImage(this.backgrounds[this.bgIndex], this.canvas.renderAll.bind(this.canvas));
		}
	}.bind(this));
}

FabricHelper.prototype.listen = function(e) {
	this.canvas.on(e, function(object) {
	  if (object.target) {
	    this.position[this.bgIndex] = "(" + object.target.scaleX + "," + object.target.scaleY + "," + object.target.left + "," + object.target.top + "," + object.target.angle + ")";
	  }
	}.bind(this));
}

FabricHelper.prototype.display = function(text, id) {
}
