class Equipable extends QQ.Subject.Base {
	
	constructor(options) {
		super(options);
		this._equipPicture = null;
		this._picData = null;
		this._equipScale = 4;
		
		this._body = null;
		this._boots = null;
		this._chest = null;
		this._pants = null;
		this._hair = null;
		this._hat = null;
		this._weapon = null;
		this._shield = null;
		this._alpha = 1;
		this.setBody({name: options.bodyName});
	}
	
	setAlpha(a) {
		this._alpha = a;
	}
	
	dress(outfit) {
		outfit.dress(this);
	}
	
	getPicData() {
		if ( this._picData === null ) {
			this._drawEquipPicture();
		}
		return this._picData;
	}
	
	_needRedraw() {
		this._equipPicture = null;
		this._picData = null;
	}
	
	_isNeedRedraw() {
		return this._equipPicture === null;
	}
	
	_drawEquipPicture() {
		const picSize = new QQ.Size(16*this._equipScale, 16*this._equipScale);
		const picCanvas = QQ.makeCanvas(picSize);
		this._picData = picCanvas.ctx.createImageData(picSize.w(), picSize.h());
		this._forEquip((equip) => {
			equip.putImage(this._picData.data, picSize);
		});
		
		picCanvas.ctx.putImageData(this._picData, 0, 0);
		this._equipPicture = new QQ.Sprite(picCanvas.cvs);
		this._equipPicture.setSize(this._size);
		this._equipPicture.setAnchor(this._anchor);
	}
	
	_forEquip(fn) {
		// Fixed order
		if ( this._body ) { fn(this._body); }
		if ( this._pants ) { fn(this._pants); }
		if ( this._chest ) { fn(this._chest); }
		if ( this._boots ) { fn(this._boots); }
		if ( this._hair ) { fn(this._hair); }
		if ( this._hat ) { fn(this._hat); }
		if ( this._weapon ) { fn(this._weapon); }
		if ( this._shield ) { fn(this._shield); }
	}
	
	draw(ctx) {
		ctx.transform(this.getMatrix());
		if ( this._isNeedRedraw() ) {
			this._drawEquipPicture();
		}
		this._equipPicture.setAlpha(this._alpha);
		this._equipPicture.draw(ctx.get());
		super.draw(ctx);
		this._forEquip((equip) => {
			equip.draw(ctx);
		});
	}
	
	tick(delta) {
		if ( this._isNeedRedraw() ) {
			this._drawEquipPicture();
		}
		super.tick(delta);
		this._forEquip((equip) => {
			equip.tick(delta);
		});
	}
	
	setBow(input = {}) {
		this._setWeapon('bow', input);
	}
	
	setMelee(input = {}) {
		this._setWeapon('melee', input);
	}
	
	_setWeapon(type, input) {
		input.owner = this;
		this._needRedraw();
		if ( type === 'melee' ) {
			this._weapon = Melee.make(input);
		}
		if ( type === 'bow' ) {
			this._weapon = Bow.make(input);
		}
	}
	
	setBody(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._body = Body.make(input);
	}
	
	setBoots(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._boots = Boots.make(input);
	}
	
	setPants(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._pants = Pants.make(input);
	}
	
	setChest(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._chest = Chest.make(input);
	}
	
	setHair(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._hair = Hair.make(input);
	}
	
	setHat(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._hat = Hat.make(input);
	}
	
	setShield(input = {}) {
		input.owner = this;
		this._needRedraw();
		this._shield = Shield.make(input);
	}
	
	removeShield() {
		this._needRedraw();
		this._shield = null;
	}
	
};
