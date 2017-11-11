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
		
		this.setBody(new QQ.Point(0, QQ.Math.rand(0, 3)));
		this.setBoots(new QQ.Point(0, QQ.Math.rand(0, 11)));
		this.setChest(new QQ.Point(QQ.Math.rand(0, 11), QQ.Math.rand(0, 9)));
		this.setPants(new QQ.Point(0, 1));
		this.setHair(new QQ.Point(0, 2));
		this.setHat(new QQ.Point(1, 3));
		this.setMelee(new QQ.Point(QQ.Math.rand(0, 9), QQ.Math.rand(0, 9)));
		//this.setShield(new QQ.Point(3, 1));
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
	
	setBow(index) {
		this._setWeapon('bow', index);
	}
	
	setMelee(index) {
		this._setWeapon('melee', index);
	}
	
	_setWeapon(type, index) {
		this._needRedraw();
		if ( type === 'melee' ) {
			this._weapon = new Melee({
				owner: this,
				index: index
			});
		}
		if ( type === 'bow' ) {
			this._weapon = new Bow({
				owner: this,
				index: index
			});
		}
	}
	
	setBody(index) {
		this._needRedraw();
		this._body = new Body({
			owner: this,
			index: index
		});
	}
	
	setBoots(index) {
		this._needRedraw();
		this._boots = new Boots({
			owner: this,
			index: index
		});
	}
	
	setPants(index) {
		this._needRedraw();
		this._pants = new Pants({
			owner: this,
			index: index
		});
	}
	
	setChest(index) {
		this._needRedraw();
		this._chest = new Chest({
			owner: this,
			index: index
		});
	}
	
	setHair(index) {
		this._needRedraw();
		this._hair = new Hair({
			owner: this,
			index: index
		});
	}
	
	setHat(index) {
		this._needRedraw();
		this._hat = new Hat({
			owner: this,
			index: index
		});
	}
	
	setShield(index) {
		this._needRedraw();
		if ( index ) {
			this._shield = new Shield({
				owner: this,
				index: index
			});
		} else {
			this._shield = null;
		}
	}
	
};
