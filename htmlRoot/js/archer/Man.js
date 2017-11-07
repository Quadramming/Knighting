class Equipable extends QQ.Subject.Base {
	
	constructor(options) {
		super(options);
		this._equipPicture = null;
		this._equipScale = 4;
		
		this._body = null;
		this._boots = null;
		this._chest = null;
		this._pants = null;
		this._hair = null;
		this._hat = null;
		this._weapon = null;
		this._shield = null;
		
		this.setBody(new QQ.Point(0, 0));
		this.setBoots(new QQ.Point(0, 0));
		this.setChest(new QQ.Point(2, 0));
		this.setPants(new QQ.Point(0, 1));
		this.setHair(new QQ.Point(0, 2));
		this.setHat(new QQ.Point(1, 3));
		this.setMelee(new QQ.Point(5, 2));
		this.setShield(new QQ.Point(3, 1));
	}
	
	makeEquipPicture() {
		const picSize = new QQ.Size(16*this._equipScale, 16*this._equipScale);
		const picCanvas = QQ.makeCanvas(picSize);
		const picData = picCanvas.ctx.createImageData(picSize.w(), picSize.h());
		const picPixels = picData.data;
		
		this.forEquip((equip) => {
			equip.putImage(picPixels, picSize);
		});
		
		picCanvas.ctx.putImageData(picData, 0, 0);
		this._equipPicture = new QQ.Sprite(picCanvas.cvs);
		this._equipPicture.setSize(this._size);
		this._equipPicture.setAnchor(this._anchor);
	}
	
	forEquip(fn) {
		// Fixed order
		if ( this._body ) { fn(this._body); }
		if ( this._boots ) { fn(this._boots); }
		if ( this._chest ) { fn(this._chest); }
		if ( this._pants ) { fn(this._pants); }
		if ( this._hair ) { fn(this._hair); }
		if ( this._hat ) { fn(this._hat); }
		if ( this._weapon ) { fn(this._weapon); }
		if ( this._shield ) { fn(this._shield); }
	}
	
	draw(ctx) {
		ctx.transform(this.getMatrix());
		if ( this._equipPicture === null ) {
			this.makeEquipPicture();
		}
		this._equipPicture.setAlpha(this._alpha);
		this._equipPicture.draw(ctx.get());
		super.draw(ctx);
	}
	
	tick(delta) {
		super.tick(delta);
		this.forEquip((equip) => {
			equip.tick(delta);
		});
	}
	
	setBody(index) {
		this._equipPicture = null;
		this._body = new ManBody({
			owner: this,
			index: index
		});
	}
	
	setBoots(index) {
		this._equipPicture = null;
		this._boots = new ManBoots({
			owner: this,
			index: index
		});
	}
	
	setPants(index) {
		this._equipPicture = null;
		this._pants = new ManPants({
			owner: this,
			index: index
		});
	}
	
	setChest(index) {
		this._equipPicture = null;
		this._chest = new ManChest({
			owner: this,
			index: index
		});
	}
	
	setHair(index) {
		this._equipPicture = null;
		this._hair = new ManHair({
			owner: this,
			index: index
		});
	}
	
	setHat(index) {
		this._equipPicture = null;
		this._hat = new ManHat({
			owner: this,
			index: index
		});
	}
	
	setShield(index) {
		this._equipPicture = null;
		if ( index ) {
			this._shield = new Shield({
				owner: this,
				index: index
			});
		} else {
			this._shield = null;
		}
	}
	
	setBow(index) {
		this.setWeapon('bow', index);
	}
	
	setMelee(index) {
		this.setWeapon('melee', index);
	}
	
	setWeapon(type, index) {
		this._equipPicture = null;
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
	
};

class Man extends
	QQ.mixins(QQ.Subject.ActionableMix, Equipable)
{
	
	constructor(options) {
		options.size = QQ.default(options.size, new QQ.Point(3));
		options.anchor = new QQ.Point(0.5);
		super(options);
		this._alpha = 1;
		this._isAlive = true;
		this._speed = QQ.default(options.speed, 1);
	}
	
	die() {
		this._isAlive = false;
	}
	
	hitted() {
		if ( this._shield ) {
			this.setShield(null);
		} else {
			this.die();
		}
	}
	
	getSpeed() {
		return this._speed;
	}
	
	disappear() {
		this._isAlive = false;
		this.setAction(
			new QQ.Actions.Disappear({
				duration: 0.1,
				isAbortable: false
			})
		);
	}
	
	setAlpha(a) {
		this._alpha = a;
	}
	
	isAlive() {
		return this._isAlive;
	}
	
	isCanShoot() {
		if ( ! this._isAlive ) {
			return false;
		}
		if ( ! this._weapon ) {
			return false;
		}
		if ( this._action instanceof QQ.Actions.Stun ) {
			return false;
		}
		if ( this._action instanceof QQ.Actions.Disappear ) {
			return false;
		}
		return true;
	}
	
	shoot(target) {
		if ( this.isCanShoot() ) {
			this._weapon.shoot(target);
		}
	}
	
	stun() {
		this.setAction(
			new QQ.Actions.Stun({
				app: this._app,
				subj: this,
				duration: 3
			})
		);
	}
	
};
