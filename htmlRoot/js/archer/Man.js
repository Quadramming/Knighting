class Man extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(options) {
		options.size   = QQ.default(options.size, new QQ.Point(3));
		options.anchor = new QQ.Point(0.5);
		super(options);
		this._imgGap   = 8;
		this._imgSize  = 128;
		this._isAlive  = true;
		
		//this._bow = ...;
		this._speed    = QQ.default(options.speed, 1);
		
		this._pants    = new QQ.Sprite(this._app.getImg('manPants'));
		this._chest    = new QQ.Sprite(this._app.getImg('manChest'));
		this._hair     = new QQ.Sprite(this._app.getImg('manHair'));
		this._hat      = new QQ.Sprite(this._app.getImg('manHat'));
		
		this._body     = null;
		this._weapon   = null;
		this._shield   = null;
		this._boots    = null;
		this._chest    = null;
		this._hair     = null;
		this._hat      = null;
		
		this.setBody(new QQ.Point(0, 0));
		this.setMelee(new QQ.Point(3, 2));
		this.setShield(new QQ.Point(1, 1));
		this.setBoots(new QQ.Point(0, 1));
		this.setPants(new QQ.Point(0, 0));
		
		this.setChest(new QQ.Point(7, 2));
		this.setHair(new QQ.Point(0, 2));
		//this.setHat(new QQ.Point(1, 3));
	}
	
	tick(delta) {
		super.tick(delta);
	}
	
	setBoots(index) {
		this._boots = new ManBoots({
			owner: this,
			index: index
		});
		this.addSubject(this._boots);
	}
	
	setBody(index) {
		this._body = new ManBody({
			owner: this,
			index: index
		});
		this.addSubject(this._body);
	}
	
	setPants(index) {
		this._pants = new ManPants({
			owner: this,
			index: index
		});
		this.addSubject(this._pants);
	}
	
	setChest(index) {
		this._chest = new ManChest({
			owner: this,
			index: index
		});
		this.addSubject(this._chest);
	}
	
	setHair(index) {
		this._hair = new ManHair({
			owner: this,
			index: index
		});
		this.addSubject(this._hair);
	}
	
	setHat(index) {
		this._hat = new ManHat({
			owner: this,
			index: index
		});
		this.addSubject(this._hat);
	}
	
	setShield(index) {
		if ( this._shield !== null ) {
			this._shield.deleteMe();
		}
		this._shield = new Shield({
			owner: this,
			index: index
		});
		this.addSubject(this._shield);
	}
	
	setBow(index) {
		this.setWeapon('bow', index);
	}
	
	setMelee(index) {
		this.setWeapon('melee', index);
	}
	
	setWeapon(type, index) {
		if ( this._weapon !== null ) {
			this._weapon.deleteMe();
		}
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
		this.addSubject(this._weapon);
	}
	
	draw(ctx) {
		ctx.transform(this.getMatrix());
		super.draw(ctx);
	}
	
	hitted() {
		if ( this._shield ) {
			this._shield.deleteMe();
			this._shield = null;
		} else {
			this._world.addSubject(
				new Bones({
					app: this._app,
					position: this._position
				})
			);
			this.disapear();
		}
	}
	
	getSpeed() {
		return this._speed;
	}
	
	disapear() {
		this._isAlive = false;
		this.setAction(
			new QQ.Actions.Disapear({
				duration: 0.1,
				isAbortable: false
			})
		);
	}
	
	setAlpha(a) {
		this.forAllSubjects( (child) => {
			child.setAlpha(a);
		});
	}
	
	isAlive() {
		return this._isAlive;
	}
	
	isCanShoot() {
		if ( ! this._isAlive ) {
			return false;
		}
		if ( this._action instanceof QQ.Actions.Stun ) {
			return false;
		}
		if ( this._action instanceof QQ.Actions.Disapear ) {
			return false;
		}
		return true;
	}
	
	shoot(target) {
		if ( ! this.isCanShoot() ) {
			return;
		}
		const arrow = new Arrow({
			app: this._app,
			position: this._position
		});
		arrow.flyTo(target);
		this._world.addSubject(arrow);
		this._app.playSound('arrow');
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
