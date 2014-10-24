var Squares = function( width, height, fillHex1, fillHex2, territory, orientation ) { 

	this._width = width;
	this._height = height;
	this._territory = territory ? territory : 0.5;
	this._fillHex1 = fillHex1 ? fillHex1 : '#fff';
	this._fillHex2 = fillHex2 ? fillHex2 : '#fff';
	this._orientation = orientation ? orientation : 'vertical';

};

Squares.prototype = { 

	draw : function( ) {
		var canvas = this._createHiddenCanvas(),
		context = canvas.getContext('2d');

		canvas.width = this._width;
		canvas.height = this._height;

		switch( this._orientation ){
			case 'vertical':
			this._drawVertical(context);
			break; 

			case 'horizontal':
			this._drawHorizontal(context);
			break;
		}
		this._removeHiddenCanvas(canvas);
		return canvas.toDataURL();
	},

	_drawHorizontal : function(context) {
		var first = this._width * this._territory;
		var second = this._width - first;
		this._createRect.call( context, 0, 0, first, this._height, this._fillHex1 );
		this._createRect.call( context, this._width * this._territory, 0, second, this._height, this._fillHex2);
	},

	_drawVertical : function(context) {
		var first = this._height * this._territory;
		var second = this._height - first;
		this._createRect.call( context, 0, 0, this._width, first, this._fillHex1 );
		this._createRect.call( context, 0, this._height * this._territory, this._width, second, this._fillHex2);
	},

	_createRect : function( x, y, width, height, color ) { 
		this.beginPath();
		this.rect(x, y, width, height);
		this.fillStyle = color;
		this.fill();
	},

	_createHiddenCanvas : function( ) { 
		var canvas = document.createElement( 'canvas' );
		this._addHiddenCanvas( canvas );
		return canvas;
	},

	_addHiddenCanvas : function( canvas ) { 
		document.body.appendChild( canvas );
	},

	_removeHiddenCanvas : function( canvas ) { 
		document.body.removeChild( canvas );
	}
};






