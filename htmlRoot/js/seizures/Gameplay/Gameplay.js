game.seizures.Gameplay = class Gameplay
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		input.isPauseable = true;
		input.maxTicks = 1;
		input.timeStep = 1/30; // FPS
		super(input);
		this.setCamera();
		this.m_castle = null;
		this._player = null;
		this._changePatrolDirection = null;
		this._battleField = null;
		this._enemyManager = null;
		this._currentLevel = 1;
		this._bonesCanvas = null;
		this._grasCanvas = null;
		this.initWorld();
		this.initStats();
	}
	
	initStats() {
		game.stats.arrows = new statArrows({app: this._app});
		game.stats.coolDown = new statCoolDown({app: this._app});
		game.stats.penetration = new statPenetration({app: this._app});
		game.stats.speed = new statSpeed({app: this._app});
		game.stats.shield = new statShield({app: this._app});
	}
	
	initWorld() {
		this._world.clearStage();
		this.setGrass();
		this.m_castle = this.createCastle();
		this._world.addSubject(this.m_castle);
	}
	
	startGame(level = game.getAvailableLevel()) {
		this._currentLevel = level;
		this.initWorld();
		this.setPlayer();
		this.setBattleField();
		this.setChangePatrolDirection();
		this.setEnemyManager(level);
		this.setBonesCanvas();
		this._setHud('GameHud', {parent: this});
	}

	restartGame() {
		this.startGame(this._currentLevel);
	}
	
	setPlayer() {
		this._player = new Player({
			world:    this._world,
			app:      this._app,
			position: new QQ.Point(0, 0),
			anchor:   new QQ.Point(0.5, 0.5),
			level:    this._currentLevel,
			z:        1
		});
		this.m_castle.addSubject(this._player);
	}
	
	setBonesCanvas() {
		this._bonesCanvas = new BonesCanvas({
			app: this._app,
			camera: this._camera,
			z: 2
		});
		game.mergeBones = (bones) => {
			this._bonesCanvas.merge(bones);
		};
		this._world.addSubject(this._bonesCanvas);
	}
	
	setGrass() {
		this._grasCanvas = new GrassCanvas({
			app: this._app,
			camera: this._camera,
			z: 2
		});
		this._world.addSubject(this._grasCanvas);
	}
	
	setEnemyManager(level) {
		this._enemyManager = new EnemyManager({
			level: level,
			player: this._player
		});
		this._world.addSubject(this._enemyManager);
	}
	
	setChangePatrolDirection() {
		this._changePatrolDirection = new ChangePatrolDirection({
			player: this._player
		});
		this._world.addSubject(this._changePatrolDirection);
	}
	
	setBattleField() {
		this._battleField = new BattleField({
			player: this._player,
			worldPointer: this._input
		});
		this._world.addSubject(this._battleField);
	}
	
	init() {
		super.init();
		this._app.setSz('Menu', {
			startGame: (...args) => {this.startGame(...args);}
		}, true);
	}
	
	getHero() {
		return this._player;
	}
	
	setCamera() {
		const size = new QQ.Point(30, 53);
		const eye  = new QQ.Point(0, -7);
		this._camera.init(size, eye);
		const resizeCamera = () => {
			const cameraSize = this._camera.getViewSize();
			this._camera.setPosition(new QQ.Point(
				eye.x(),
				eye.y() -(cameraSize.h()-size.h())/2
			));
		};
		resizeCamera();
		window.addEventListener('resize', resizeCamera);
	}
	
	createCastle() {
		const castle = new QQ.Container({
			z: 2,
			position: new QQ.Point(0, -30)
		});
		castle.addSubject(QQ.Subject.make({
			app:      this._app,
			img:      'tower',
			position: new QQ.Point(6, -0.5),
			size:     new QQ.Size(6, 14),
			anchor:   new QQ.Point(0.5, 0.5),
			z:        0
		}));
		castle.addSubject(QQ.Subject.make({
			app:      this._app,
			img:      'wall',
			position: new QQ.Point(0, 5),
			size:     new QQ.Size(37.5, 7.5),
			anchor:   new QQ.Point(0.5, 0.5),
			z:        2
		}));
		return castle;
	}
	
	tick(delta) {
		this.sortEnemys();
		super.tick(delta);
	}
	
	sortEnemys() {
		let enemys = this._world.getSubjects((subj) => {
			return subj instanceof Enemy;
		});
		for ( const enemy of enemys ) {
			enemy.setZ(enemy.getPosition().y());
		}
	}
	
};

QQ.Seizures.register.set('Gameplay', game.seizures.Gameplay);
