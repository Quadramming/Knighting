class Man extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(app, options = {}) {
		options.width  = QQ.default(options.width,  3);
		options.height = QQ.default(options.height, 3);
		options.z      = QQ.default(options.z,      1);
		super(app, options);
		this._gap      = 8;
		this._size     = 128;
		this._time     = app.getTime();
		this._isAlive  = true;
		
		//this._bow = ...;
		this._speed    = 10;
		
		this._body     = new QQ.Sprite(this._app.getImg('imgs/man/body.png'));
		this._boots    = new QQ.Sprite(this._app.getImg('imgs/man/boots.png'));
		this._pants    = new QQ.Sprite(this._app.getImg('imgs/man/pants.png'));
		this._chest    = new QQ.Sprite(this._app.getImg('imgs/man/chest.png'));
		this._hair     = new QQ.Sprite(this._app.getImg('imgs/man/hair.png'));
		this._hat      = new QQ.Sprite(this._app.getImg('imgs/man/hat.png'));
		this._shield   = new QQ.Sprite(this._app.getImg('imgs/man/shield.png'));
		this._weapon   = new QQ.Sprite(this._app.getImg('imgs/man/weapon.png'));
		
		this.setBody();
		this.setBoots(1);
		this.setPants();
		this.setChest();
		this.setHair();
		this.setHat();
		this.setShield();
		this.setWeapon();
	}
	
	setClip(obj, i = 0, j = 0) {
		if ( i !== null ) {
			obj.setDisabled(false);
			obj.setClip(
				this._size*j + this._gap*j,
				this._size*i + this._gap*i,
				this._size, this._size
			);
		} else {
			obj.setDisabled(true);
		}
	}
	
	setBoots(i, j) {
		this.setClip(this._boots, i, j);
	}
	
	setBody(i, j) {
		this.setClip(this._body, i, j);
	}
	
	setPants(i, j) {
		this.setClip(this._pants, i, j);
	}
	
	setChest(i, j) {
		this.setClip(this._chest, i, j);
	}
	
	setHair(i, j) {
		this.setClip(this._hair, i, j);
	}
	
	setHat(i, j) {
		this.setClip(this._hat, i, j);
	}
	
	setShield(i, j) {
		this.setClip(this._shield, i, j);
	}
	
	setWeapon(i, j) {
		this.setClip(this._weapon, i, j);
	}
	
	getScale() {
		let size   = this._body.getSize();
		let scaleX = this._width  / size.width;
		let scaleY = this._height / size.height;
		return { x : scaleX, y : scaleY };
	}
	
	drawShield(ctx) {
		let sin  = Math.sin;
		let cos  = Math.cos;
		let time = this._time.now() / 1000;
		let x    = -this._size/2 + sin(time)*2;
		let y    = -this._size/2 -10 + (1-cos(time))*5;
		this._shield.draw(ctx, x, y);
	}
	
	drawWeapon(ctx) {
		let sin  = Math.sin;
		let cos  = Math.cos;
		let time = this._time.now() / 700;
		let x    = -this._size/2 + sin(time)*2;
		let y    = -this._size/2 -10 + (1-cos(time))*5;
		this._weapon.draw(ctx, x, y);
	}
	
	draw(ctx) {
		this._body.draw(ctx);
		this._pants.draw(ctx);
		this._boots.draw(ctx);
		this._chest.draw(ctx);
		this._hair.draw(ctx);
		//this._hat.draw(ctx);
		this.drawShield(ctx);
		this.drawWeapon(ctx);
		//this._drawLocalBorder(ctx);
		super.draw(ctx);
	}
	
	hitted() {
		//this.stun();
		//return;
		if ( ! this._shield.getDisabled() ) {
			this._shield.setDisabled(true);
		} else {
			this._world.addSubject(new Bones(this._app, {
				x: this._x, y: this._y
			}));
			this.disapear();
		}
	}
	
	getSpeed() {
		return this._speed;
	}
	
	initEnemy() {
		let to = {x: QQ.Math.rand(-15, 15), y: QQ.Math.rand(-15, 15)};
		this.setAction(
			new QQ.Actions.WalkTo(this._app, {
				subj: this,
				to,
				onEnd: () => {this.initEnemy();}
			})
		);
	}
	
	setPatrol(from, to, duration) {
		this.setAction( new QQ.Actions.Patrol(this._app, {
			subj: this,
			from, to, duration
		}));
	}
	
	disapear() {
		this._isAlive = false;
		this.setAction( new QQ.Actions.Disapear(this._app, {
			subj:     this,
			duration: 200,
			onEnd: () => {this._world.deleteSubject(this);},
			isAbortable: false
		}));
	}
	
	setAlpha(a) {
		for ( let img in this ) {
			if ( this[img] instanceof QQ.Sprite ) {
				this[img].setAlpha(a);
			}
		}
	}
	
	changePatrolDirection() {
		if ( this._action instanceof QQ.Actions.Patrol ) {
			this._action.changeDirection();
		}
	}
	
	isAlive() {
		return this._isAlive;
	}
	
	shoot(x, y) {
		let options = {
			x:      this._x,
			y:      this._y,
			width:  1.5,
			height: 1.5
		};
		let arrow   = new Arrow(this._app, options);
		arrow.shoot({x, y});
		this._world.addSubject(arrow);
		this._app.playSound('arrow');
	}
	
	stun() {
		let r = this.setAction( new QQ.Actions.Stun(this._app, {
			subj:     this,
			duration: 5000
		}));
	}
	
};
