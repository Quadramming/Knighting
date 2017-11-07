game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	init() {
		this._app.setSz('Gameplay');
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);

class EnemyManager extends QQ.Container {
	
	constructor(options) {
		options.z = 3;
		super(options);
		this._player = options.player;
		this._duration = 0;
		this._nextEnemy = 0;
		this._difficulty = 1;
	}
	
	getSpawnPoint() {
		return new QQ.Point(
			QQ.Math.rand(-15, 15),
			QQ.Math.rand(22, 22)
		);
	}
	
	getSpeed() {
		return 1 + this._difficulty/10;
	}
	
	getNextEnemy() {
		return this._duration + 1/((100+this._difficulty)/100);
	}
	
	tick(delta) {
		super.tick(delta);
		this._duration += delta;
		this._difficulty = Math.floor(1 + this._duration/2);
		if ( this._nextEnemy < this._duration ) {
			this._nextEnemy = this.getNextEnemy();
			this.addSubject(new Enemy({
				position: this.getSpawnPoint(),
				speed: this.getSpeed(),
				app: this._app,
				player: this._player
			}));
		}
	}
	
};

game.seizures.Gameplay = class Gameplay
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		input.isPauseable = true;
		super(input);
		//this._app.setSz('Levels');
		this.setCamera();
		this.addGrass();
		//this._world.setBackground('grass');
		
		const castle = new QQ.Container({
			z: 2,
			position: new QQ.Point(0, -18)
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
			position: new QQ.Point(0, 3.5),
			size:     new QQ.Size(30, 6),
			anchor:   new QQ.Point(0.5, 0.5),
			z:        2
		}));
		
		this._player = new Player({
			world:    this._world,
			app:      this._app,
			position: new QQ.Point(0, 0),
			anchor:   new QQ.Point(0.5, 0.5),
			z:        1
		});
		castle.addSubject(this._player);
		this._world.addSubject(castle);
		
		this.setEnemies();
		
		this._world.addSubject(new ChangePatrolDirection({
			player: this._player
		}));
		this._world.addSubject(new BattleField({
			player: this._player,
			worldPointer: this._input
		}));
		
		this._setHud('GameHud', {parent: this});
	}
	
	getHero() {
		return this._player;
	}
	
	setEnemies() {
		const enemies = new EnemyManager({player: this._player});
		this._world.addSubject(enemies);
	}
	
	setCamera() {
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		const resizeCamera = () => {
			const cameraSize = this._camera.getViewSize();
			this._camera.setPosition(new QQ.Point(
				eye.x(),
				-(cameraSize.h()-size.h())/2
			));
		};
		resizeCamera();
		window.addEventListener('resize', resizeCamera);
	}
	
	addGrass() {
		const bg = QQ.Subject.make({
			app:      this._app,
			tiled:    true,
			img:      'grass',
			tileSize: new QQ.Size(3, 3)
		});
		let resizeBg = () => {
			const view = this._camera.getViewRect();
			bg.setSize(new QQ.Point(view.w(), view.h()));
			bg.setPosition(new QQ.Point(view.x(), view.y()));
		};
		resizeBg();
		window.addEventListener('resize', resizeBg);
		this._world.addSubject(bg);
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
