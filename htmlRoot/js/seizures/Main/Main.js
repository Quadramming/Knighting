game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		//this._app.setSz('Levels');
		this.setCamera();
		this.addGrass();
		//this._world.setBackground('grass');
		
		const castle = new QQ.Container({z: 2});
		
		castle.addSubject(QQ.Subject.make({
			app:      this._app,
			img:      'tower',
			position: new QQ.Point(6, -18.5),
			size:     new QQ.Size(6, 14),
			anchor:   new QQ.Point(0.5, 0.5),
			z:        0
		}));
		
		castle.addSubject(QQ.Subject.make({
			app:      this._app,
			img:      'wall',
			position: new QQ.Point(0, -14.5),
			size:     new QQ.Size(30, 6),
			anchor:   new QQ.Point(0.5, 0.5),
			z:        2
		}));
		
		this._player = new Player({
			app:      this._app,
			position: new QQ.Point(0, -18),
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
			player: this._player
		}));
		
		this._setHud('GameHud', {parent: this});
	}
	
	getHero() {
		return this._player;
	}
	
	setEnemies() {
		const enemies = new QQ.Container({z: 2});
		for ( let i = 0; i < 10; ++i ) {
			const enemy = new Enemy({app: this._app});
			enemies.addSubject(enemy);
		}
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

QQ.Seizures.register.set('Main', game.seizures.Main);
