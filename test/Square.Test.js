describe( "Squares", function(){
	var sp = null,
	img = new Image(),
	src = '';

	var width = 500,
	height = 100,
	orientation = 'horizontal';

	beforeEach( function(done){
		sp = new Squares( width, height, '#00ff00', '#ff00ff', 0.5, orientation );
		src = sp.draw();
				
		img.onload = function(){
			done();
		}

		img.src = src;
	})

	afterEach( function(){
		sp = null;
		img = null;
		img = new Image();
		src = '';
	});

	describe( 'Generated Source', function(){
		it( 'must be a valid string', function(){
			expect(src).not.toBeNull();
			expect(typeof src).toBe('string');

			expect(img.src).not.toBeNull();
			expect(typeof img.src).toBe('string');
		})

		it( 'needs to be a valid base64 png', function(){
			var rgx = new RegExp("data:image/png;base64");
			expect( rgx.test(src) ).toEqual( true );
		})
	});

	describe( 'Image dimensions', function(){
		it('must have a width', function(){
			expect(typeof img.width).toBe('number');
			expect(img.width).toEqual(width);
		})

		it('must have a height', function(){
			expect(typeof img.height).toBe('number');
			expect(img.height).toEqual(height);
		})
	});

	describe( 'Image Orientation', function(){

		if( orientation === 'horizontal' ){
			it('must have an orientation of horizontal', function(){
				var prop = img.width/img.height;
				expect(prop).toBeGreaterThan(1);		
			})
		}

		if( orientation === 'vertical' ){
			it('must have an orientation of vertical', function(){
				var prop = img.width/img.height;
				expect(prop).toBeLessThan(1);		
			})
		}

	});

});

