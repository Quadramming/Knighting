class Bow {
	
	constructor() {
		// Reload time
		// Arrow speed
		// Arrows amount
		// Img bow
		// Img bow slot
	}
	
};

class ChangePatrolDirection extends QQ.Subject.Base {
	
	constructor(app, player) {
		let options = {
			width:  30 * 1.5,
			height: 4,
			y:      18
		};
		super(app, options);
		this._player = player;
		this.setZ(3);
	}
	
	onClickDown(x, y) {
		this._player.changePatrolDirection();
	}
	
};

class BattleField extends QQ.Subject.Base {
	
	constructor(app, player) {
		let options = {
			width:  30 * 1.5,
			height: 36,
			y:      -2,
			z:      5
		};
		super(app, options);
		this._player = player;
	}
	
	onClickDown(x, y) {
		this._player.shoot(x, y);
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
		
		this._player = new Player(app, {x: 0, y: 18, z: 1});
		let player   = this._player;
		this._world.addSubject(player);
		
		this.setEnemys();
		
		this._world.addSubject(new ChangePatrolDirection(app, player));
		this._world.addSubject(new BattleField(app, player));

		this._world.addSubject(QQ.Subject.make(app, {
			imgSrc: 'imgs/tower.png',
			x:      6,
			y:      19,
			z:      0,
			width:  6,
			height: 14
		}));
		this._world.addSubject(QQ.Subject.make(app, {
			imgSrc: 'imgs/wall.png',
			x:      0,
			y:      15,
			z:      2,
			width:  30,
			height: 6
		}));
		this._setHud('GameHud', {parent: this});
	}
	
	getHero() {
		return this._player;
	}
	
	setEnemys() {
		let enemys = new QQ.Container();
		for ( let i = 0; i < 100; ++i ) {
			let enemy = new Enemy(this._app);
			enemys.addSubject(enemy);
		}
		this._world.addSubject(enemys);
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
		bg.setTileSize(3, 3);
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
		this.sortEnemys();
		super.tick(delta);
		this.tickWorld(delta);
	}
	
	sortEnemys() {
		let enemys = this._world.getSubjects((subj) => {
			return subj instanceof Enemy;
		});
		for ( let enemy of enemys ) {
			enemy.setZ(-1*(enemy._y - 50)); // FIX
		}
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
