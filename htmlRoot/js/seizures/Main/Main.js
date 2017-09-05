class Man extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(app, options = {}) {
		options.width  = QQ.default(options.width,  3);
		options.height = QQ.default(options.height, 3);
		options.z      = QQ.default(options.z,      1);
		super(app, options);
		this._gap     = 8;
		this._size    = 128;
		this._time    = app.getTime();
		this._isAlive = true;
		
		this._body  = new QQ.Sprite(this._app.getImg('imgs/man/body.png'));
		this.setBody();
		this._boots = new QQ.Sprite(this._app.getImg('imgs/man/boots.png'));
		this.setBoots(1);
		this._pants = new QQ.Sprite(this._app.getImg('imgs/man/pants.png'));
		this.setPants();
		this._chest = new QQ.Sprite(this._app.getImg('imgs/man/chest.png'));
		this.setChest();
		this._hair = new QQ.Sprite(this._app.getImg('imgs/man/hair.png'));
		this.setHair();
		this._hat = new QQ.Sprite(this._app.getImg('imgs/man/hat.png'));
		this.setHat();
		this._shield = new QQ.Sprite(this._app.getImg('imgs/man/shield.png'));
		this.setShield();
		this._weapon = new QQ.Sprite(this._app.getImg('imgs/man/weapon.png'));
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
		let sin = Math.sin;
		let cos = Math.cos;
		let time = this._time.now() / 1000;
		let x = -this._size/2 + sin(time)*2;
		let y = -this._size/2 -10 + (1-cos(time))*5;
		this._shield.draw(ctx, x, y);
	}
	
	drawWeapon(ctx) {
		let sin = Math.sin;
		let cos = Math.cos;
		let time = this._time.now() / 700;
		let x = -this._size/2 + sin(time)*2;
		let y = -this._size/2 -10 + (1-cos(time))*5;
		this._weapon.draw(ctx, x, y);
	}
	
	draw(ctx) {
		super.draw(ctx);
		this._body.draw(ctx);
		this._pants.draw(ctx);
		this._boots.draw(ctx);
		this._chest.draw(ctx);
		this._hair.draw(ctx);
		//this._hat.draw(ctx);
		this.drawShield(ctx);
		this.drawWeapon(ctx);
	}
	
	hitted() {
		if ( ! this._shield.getDisabled() ) {
			this._shield.setDisabled(true);
		} else {
			this.disapear();
		}
	}
	
	setMove(from, to, time) {
		let move = new QQ.Actions.Move(this._app, this, from, to, time);
		this.setAction(move);
	}
	
	setPatrol(from, to, time) {
		let action = new QQ.Actions.Patrol(this._app, this, from, to, time);
		this.setAction(action);
	}
	
	disapear() {
		this._isAlive = false;
		let action = new QQ.Actions.Disapear(this._app, this, 500);
		let isSet  = this.setAction(action);
		if ( isSet ) {
			this._action.setAbortable(false);
			this._action.setOnEnd(() => {
				this._world.deleteSubject(this);
			});
		}
	}
	
	setAlpha(a) {
		for ( let img in this ) {
			if ( this[img] instanceof QQ.Sprite ) {
				this[img].setAlpha(a);
			}
		}
	}
	
	onClickDown() {
		this.changePatrolDirection();
	}
	
	changePatrolDirection() {
		if ( this._action instanceof QQ.Actions.Patrol ) {
			this._action.changeDirection();
		}
	}
	
	isAlive() {
		return this._isAlive;
	}
	
};

class Button extends QQ.Subject.Sprite {
	
	constructor(app, options = {}) {
		options.action = QQ.default(options.action, () => {});
		super(app, options);
		this._action = options.action;
		this.setZ(4);
	}
	
	onClickDown() {
		this._action();
	}
	
};

class RandomChar extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(app, options = {}) {
		options.width  = QQ.default(options.width,  3);
		options.height = QQ.default(options.height, 3);
		super(app, options);
		this._charMap = new QQ.Sprite(
				app.getImg('imgs/charMap.png')
			);
		this.gap  = 8;
		this.size = 128;
		this.addRandomBody();
		this.addRandomPants();
		this.addRandomBoots();
		this.addRandomStuff(6, 0, 12, 10);  // chest
		this.addRandomStuff(19, 0, 8, 8);   // hair
		this.addRandomStuff(28, 0, 4, 9);   // hat
		this.addRandomStuff(33, 0, 8, 9);   // shield
		this.addRandomStuff(42, 0, 12, 10); // weapon
	}
	
	setPatrol(from, to, time) {
		let action = new QQ.Actions.Patrol(this._app, this,
			from, to, time
		);
		this.setAction(action);
	}
	
	addRandomStuff(x, y, w, h) {
		const i = QQ.Math.rand(0, w-1) + x;
		const j = QQ.Math.rand(0, h-1) + y;
		this._charMap.addClipLayer(
			this.size*i + this.gap*i,
			this.size*j + this.gap*j,
			this.size,    this.size
		);
	}
	
	addRandomBody() {
		this.addRandomStuff(0, 0, 1, 4);
	}
	
	addRandomPants() {
		this.addRandomStuff(3, 0, 1, 8);
	}
	
	addRandomBoots() {
		this.addRandomStuff(4, 0, 1, 12);
	}
	
	getImgSize() {
		return this._charMap.getSize();
	}
	
	getScale() {
		let size   = this._charMap.getSize();
		let scaleX = this._width  / size.width;
		let scaleY = this._height / size.height;
		return { x : scaleX, y : scaleY };
	}
	
	onClick() {
		this.changePatrolDirection();
	}
	
	changePatrolDirection() {
		if ( this._action instanceof QQ.Actions.Patrol ) {
			this._action.changeDirection();
		}
	}
	
	draw(ctx) {
		this._charMap.draw(ctx);
	}
	
	setAlpha(a) {
		this._charMap.setAlpha(a);
	}
	
	disapear() {
		let isSet = this.setAction(
			new QQ.Actions.Disapear(this._app, this, 500)
		);
		if ( isSet ) {
			this._action.setAbortable(false);
			this._action.setOnEnd(() => {
				this._world.deleteSubject(this);
			});
		}
	}
	
};

class Arrow extends QQ.Subject.Actionable {
	
	constructor(app, options = {}) {
		options.imgSrc = QQ.default(options.imgSrc, 'imgs/arrow.png');
		options.z      = QQ.default(options.z,      2);
		super(app, options);
		this._isClickable = false;
		this._time = app.getTime();
	}
	
	tick(delta) {
		super.tick(delta);
	}
	
	draw(ctx) {
		this._sprite.draw(ctx, QQ.Sprite.Pivot.CENTERBOTTOM);
	}
	
	shoot(to) {
		let distance = QQ.Math.calcDistance(this._x, this._y, to.x, to.y);
		let time     = 400 + distance*40;
		this.setAngle(Math.atan2(this._y-to.y, this._x-to.x) - Math.PI/2);
		this._action = new QQ.Actions.BallisticsMove(this._app, this, to, time);
		this._action.setOnEnd( () => this.hit() );
	}
	
	hit() {
		let hitted   = this._world.getAllSubjectsAtPoint(this._x, this._y);
		let isHitted = false;
		for ( let enemy of hitted ) {
			if ( enemy instanceof Man && enemy.isAlive() ) {
				enemy.hitted();
				isHitted = true;
				break;
			}
		}
		if ( ! isHitted ) {
			this.setZ(0);
		}
		this.disapear();
	}
	
	disapear() {
		this._action = new QQ.Actions.Disapear(this._app, this, 300);
		this._action.setOnEnd( () => this._world.deleteSubject(this) );
	}

};

class BattleField extends QQ.Subject.Base {
	
	constructor(app, hero) {
		let options = {
			width:  30,
			height: 36,
			y:      -2
		};
		super(app, options);
		this._hero = hero;
		this.setZ(3);
	}
	
	onClickDown(x, y) {
		let from    = this._hero.getPosition();
		let options = {
			x:      from.x,
			y:      from.y,
			width:  1.5,
			height: 1.5
		};
		let arrow   = new Arrow(this._app, options);
		arrow.shoot({x, y});
		this._world.addSubject(arrow);
	}
	
};

game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		//this._app.setSz('Levels');
		this.setCamera();
		this.setGrass();
		//this._world.setBackground('imgs/grass.png');
		
		let hero = new Man(app, {x: 0, y: 18});
		hero.setShield(6, 0);
		hero.setWeapon(1, 11);
		hero.setPatrol(
			{x: -13.5, y: 18},
			{x:  13.5, y: 18},
			3000
		);
		this._world.addSubject(hero);
		
		for ( let i = 0; i < 2; ++i ) {
			let enemy = new Man(app, {x: i, y: 0});
			enemy.setMove(
				{x: -13.5, y: -22},
				{x: -13.5, y:  18},
				30000 + i*250
			);
			/*
			enemy.setPatrol(
				{x: -13.5, y: -13 + i*3},
				{x:  13.5, y: -13 + i*3},
				1000 + i*250
			);
			*/
			this._world.addSubject(enemy);
		}
		this._world.addSubject(QQ.Subject.make(app, {
			imgSrc: 'imgs/castle.png',
			x:       0, y:     30,
			height: 20, width: 20
		}));
		this._world.addSubject(new BattleField(app, hero));
		this._world.addSubject(new Button(app, {
			width  : 3,
			height : 3,
			x      : 13,
			y      : -18,
			imgSrc : 'imgs/changeDirection.png',
			action : () => hero.changePatrolDirection()
		}));
		//this._world.addSubject(new Man(app));
	}
	
	setCamera() {
		let viewW = 30;
		let viewH = 40;
		let initX = 0;
		let initY = 0;
		this._camera.init(viewW, viewH, initX, initY);
		let resizeCamera = () => {
			let cameraView = this._camera.getView();
			let cameraY    = (cameraView.height-viewH)/2;
			this._camera.setPos(initX, cameraY);

		};
		resizeCamera();
		window.addEventListener('resize', resizeCamera);
	}
	
	setGrass() {
		let bg = QQ.Subject.make(this._app, {
			tiled: true,
			imgSrc: 'imgs/grass.png'
		});
		bg.setPosition(0, 0);
		bg.setTileSize(5, 5);
		let resizeBg = () => {
			let cameraView = this._camera.getView();
			let cameraX = 0;
			let cameraY = (cameraView.height-40)/2;
			bg.setSize(cameraView.width, cameraView.height);
			bg.setPosition(cameraX, cameraY);
		};
		resizeBg();
		window.addEventListener('resize', resizeBg);
		this._world.addSubject(bg);
	}
	
	tick(delta) {
		super.tick(delta);
		this.tickWorld(delta);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
