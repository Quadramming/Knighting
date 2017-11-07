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

class Bow extends ManPart {
	
	constructor(options) {
		options.img = 'manBow';
		super(options);
		this._coolDown = 0.2;
		this._coolDownCurrent = this._coolDown;
		this._coolDownBar = QQ.Subject.make({
			img: 'redBar',
			app: this._app,
			anchor: new QQ.Point(0.5, 0.5),
			position: new QQ.Point(0, -1.5),
			size: new QQ.Size(4, 0.3)
		});
		this._owner.addSubject(this._coolDownBar);
	}
	
	tick(delta) {
		this._coolDownCurrent += delta;
		const coolDownLeft = Math.max(this._coolDown - this._coolDownCurrent, 0);
		const x = coolDownLeft / this._coolDown;
		this._coolDownBar.setSize(new QQ.Size(4*x, 0.3));
		super.tick(delta);
	}
	
	shoot(target) {
		if ( ! this._isCanShoot() ) {
			return;
		}
		const arrow = new Arrow({
			app: this._app,
			position: this._owner.localToWorldPoint(new QQ.Point(0, 0))
		});
		arrow.flyTo(target);
		this._world.addSubject(arrow);
		this._app.playSound('arrow');
		this._coolDownCurrent = 0;
	}
	
	_isCanShoot() {
		if ( this._coolDownCurrent < this._coolDown ) {
			return false;
		}
		return true;
	}
	
};

class Melee extends ManPart {
	
	constructor(options) {
		options.img = 'manMelee';
		super(options);
	}
	
	shoot(target) {
		c('klac');
	}
	
};

class Shield extends ManPart {
	
	constructor(options) {
		options.img = 'manShield';
		super(options);
	}
	
};

class ManBody extends ManPart {
	
	constructor(options) {
		options.img = 'manBody';
		super(options);
	}
	
};

class ManBoots extends ManPart {
	
	constructor(options) {
		options.img = 'manBoots';
		super(options);
	}
	
};

class ManPants extends ManPart {
	
	constructor(options) {
		options.img = 'manPants';
		super(options);
	}
	
};

class ManChest extends ManPart {
	
	constructor(options) {
		options.img = 'manChest';
		super(options);
	}
	
};

class ManHair extends ManPart {
	
	constructor(options) {
		options.img = 'manHair';
		super(options);
	}
	
};

class ManHat extends ManPart {
	
	constructor(options) {
		options.img = 'manHat';
		super(options);
	}
	
};
