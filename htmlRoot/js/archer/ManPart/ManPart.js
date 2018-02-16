class ManPart {
	
	constructor(input) {
		this._index = QQ.default(input.info.index, new QQ.Point(0, 0));
		this._app = input.owner.getApp();
		this._world = input.owner.getWorld();
		this._owner = input.owner;
		this._cvs = this._app.getImgCanvas(input.img);
		this._partGap = 1;
		this._partSize = 16;
		this._info = input.info;
	}
	
	putImage(pixels, size) {
		const pixelScale = size.x() / this._partSize;
		const picSize = this._cvs.size;
		const picPixels = this._cvs.getPixels();
		const offsetX = this._index.x()*this._partSize + this._index.x()*this._partGap;
		const offsetY = this._index.y()*this._partSize + this._index.y()*this._partGap;
		const sizeX = size.x();
		const sizeY = size.y();
		const cvsSizeX = this._cvs.size.x();
		for ( let y = 0; y < sizeY; ++y ) {
			for ( let x = 0; x < sizeX; ++x ) {
				const index = (y*sizeX+x)*4;
				const pi = ( // ~~ - floor
					(offsetY + ~~(y/pixelScale)) * cvsSizeX +
					(offsetX + ~~(x/pixelScale))
				)*4;
				if ( picPixels[pi+3] ) {
					pixels[index+0] = picPixels[pi+0];
					pixels[index+1] = picPixels[pi+1];
					pixels[index+2] = picPixels[pi+2];
					pixels[index+3] = 0xFF;
				}
			}
		}
	}
	
	static setEnumForEnemy(options, info) {
		if ( ! options.enum && ! options.name && options.level ) {
			const lvl = options.level;
			options.enum = game.getLevelRandom(0, info.length-1, lvl, {round: true});
		}
	}
	
	static fillInfo(infoArray, options) {
		if ( options.enum !== undefined ) {
			options.info = infoArray.find((el) => el.enum === options.enum);
			return options.info !== undefined;
		} else if ( options.name ) {
			options.info = infoArray.find((el) => el.name === options.name);
			return options.info !== undefined;
		} else { // random
			options.info = infoArray[QQ.Math.rand(0, infoArray.length-1)];
			return options.info !== undefined;
		}
		return false;
	}
	
	draw(ctx) {
	}
	
	tick(delta) {
	}
	
};
