class ManPart {
	
	constructor(input) {
		this._index = QQ.default(input.index, new QQ.Point(0, 0));
		this._app = input.owner.getApp();
		this._world = input.owner.getWorld();
		this._owner = input.owner;
		this._cvs = this._app.getImgCanvas(input.img);
		this._partGap = 1;
		this._partSize = 16;
	}
	
	putImage(pixels, size) {
		const floor = Math.floor;
		const pixelScale = size.x() / this._partSize;
		const picSize = this._cvs.size;
		const picPixels = this._cvs.getPixels();
		const offset = new QQ.Size(
			this._index.x()*this._partSize + this._index.x()*this._partGap,
			this._index.y()*this._partSize + this._index.y()*this._partGap
		);
		for ( let y = 0; y < size.y(); ++y ) {
			for ( let x = 0; x < size.x(); ++x ) {
				const index = (y*size.w()+x)*4;
				const pixel = QQ.getPixel(
					picPixels,
					this._cvs.size,
					new QQ.Point(
						offset.x() + floor(x/pixelScale),
						offset.y() + floor(y/pixelScale)
					)
				);
				if ( pixel.a === 0xFF ) {
					pixels[index+0] = pixel.r;
					pixels[index+1] = pixel.g;
					pixels[index+2] = pixel.b;
					pixels[index+3] = pixel.a;
				}
			}
		}
	}
	
	tick() {
	}
	
};
