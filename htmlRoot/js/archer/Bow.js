class ManPart extends QQ.Subject.Sprite {
	
	constructor(options) {
		options.size     = options.owner.getSize();
		options.anchor   = options.owner.getAnchor();
		options.app      = options.owner.getApp();
		super(options);
		this._imgGap     = 8;
		this._imgSize    = 128;
		this._owner      = options.owner;
		this._index      = QQ.default(options.index, new QQ.Point(0, 0));
		this.clip(this._index);
	}
	
	setOwner(owner) {
		this._owner = owner;
	}
	
	clip(index) {
		this.setClip( new QQ.Rect(
			this._imgSize*index.x() + this._imgGap*index.x(),
			this._imgSize*index.y() + this._imgGap*index.y(),
			this._imgSize, this._imgSize
		));
	}
};

class Bow extends QQ.mixins(QQ.Subject.ActionableMix, ManPart) {
	
	constructor(options) {
		options.z   = 5;
		options.img = 'manBow';
		super(options);
		this.setAction(new QQ.Actions.Shake({
			subj: this,
			dispersion: new QQ.Point(0, 0.4),
			period: 4
		}));
	}
	
};

class Melee extends QQ.mixins(QQ.Subject.ActionableMix, ManPart) {
	
	constructor(options) {
		options.z   = 5;
		options.img = 'manMelee';
		super(options);
		this.setAction(new QQ.Actions.Shake({
			subj: this,
			dispersion: new QQ.Point(0, 0.4),
			period: 4
		}));
	}
	
};

class Shield extends QQ.mixins(QQ.Subject.ActionableMix, ManPart) {
	
	constructor(options) {
		options.z   = 5;
		options.img = 'manShield';
		super(options);
		this.setAction(new QQ.Actions.Shake({
			subj: this,
			dispersion: new QQ.Point(0.2, 0.2),
			period: 3
		}));
	}
	
};

class ManBody extends ManPart {
	
	constructor(options) {
		options.z   = 0;
		options.img = 'manBody';
		super(options);
	}
	
};

class ManBoots extends ManPart {
	
	constructor(options) {
		options.z   = 2;
		options.img = 'manBoots';
		super(options);
	}
	
};

class ManPants extends ManPart {
	
	constructor(options) {
		options.z   = 1;
		options.img = 'manPants';
		super(options);
	}
	
};

class ManChest extends ManPart {
	
	constructor(options) {
		options.z   = 2;
		options.img = 'manChest';
		super(options);
	}
	
};

class ManHair extends ManPart {
	
	constructor(options) {
		options.z   = 3;
		options.img = 'manHair';
		super(options);
	}
	
};

class ManHat extends ManPart {
	
	constructor(options) {
		options.z   = 4;
		options.img = 'manHat';
		super(options);
	}
	
};
