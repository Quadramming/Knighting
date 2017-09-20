class Bow {
	
	constructor() {
		// Reload time
		// Arrow speed
		// Arrows amount
		// Img bow
		// Img bow slot
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
	
	setPatrol(from, to, duration) {
		let action = new QQ.Actions.Patrol(this._app, {
			subj: this,
			from, to, duration
		});
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
			new QQ.Actions.Disapear(this._app, {
				subj:     this,
				duration: 500
			})
		);
		if ( isSet ) {
			this._action.setAbortable(false);
			this._action.setOnEnd(() => {
				this._world.deleteSubject(this);
			});
		}
	}
	
};

class ChangePatrolDirection extends QQ.Subject.Base {
	
	constructor(app, hero) {
		let options = {
			width:  30 * 1.5,
			height: 4,
			y:      18
		};
		super(app, options);
		this._hero = hero;
		this.setZ(3);
	}
	
	onClickDown(x, y) {
		this._hero.changePatrolDirection();
	}
	
};

class BattleField extends QQ.Subject.Base {
	
	constructor(app, hero) {
		let options = {
			width:  30 * 1.5,
			height: 36,
			y:      -2
		};
		super(app, options);
		this._hero = hero;
		this.setZ(3);
	}
	
	onClickDown(x, y) {
		this._hero.shoot(x, y);
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
				{x: -13.5, y: -12},
				{x: -13.5, y:  18},
				30000 + i*25000
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
		this._world.addSubject(new ChangePatrolDirection(app, hero));
		this._world.addSubject(new BattleField(app, hero));
		this._world.addSubject(new QQ.Button(app, {
			width  :   3,
			height :   3,
			x      :  13,
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
			tiled:  true,
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
