game.seizures.Game = class Game
	extends QQ.Seizures.Base
{
	
	constructor(app, settings) {
		super(app);
		this._ini = settings.cfg;
	}
	
	init() {
		let app = this._app;
		this._camera.init(30, 40, 0, 0);
		app._fpsCounter.showDetails();
		
		let bg = new QQ.Subject.TileSprite(app, 'imgs/grass.png');
		bg.setPosition(0, 0);
		bg.setTileSize(5, 5);
		let resizeBg = () => {
			let cameraView = this._camera.getView();
			bg.setSize(cameraView.width, cameraView.height);
		};
		resizeBg();
		window.addEventListener('resize', resizeBg);
		this._world.addSubject(bg);
		
		//let frame = new QQ.Subject.Sprite(app, 'imgs/bg.png', 30, 40);
		//this._world.addSubject(frame);
		
		let knight = new game.Char(app, 'imgs/knight.png', this._ini.knightIni);
		knight.setPosition(-8, 12);
		knight.onDie = () => {
		};
		
		let enemy = new game.Char(app, 'imgs/enemy.png', this._ini.enemyIni);
		enemy.setPosition(8, 12);
		enemy.onDie = () => {
		};
		
		this._potionSlotsArea = new game.PotionSlotsArea(app);
		
		for ( let potion of this._ini.potions ) {
			this._potionSlotsArea.add(
				potion.img, potion.amount, potion.factory
			);
		}
		
		this._world.addSubject(
			new game.Fight(app, knight, enemy)
		);

		let back = new QQ.Subject.Sprite(
				this._app,
				'imgs/back.png',
				5, 5
			);
		back.setPosition(0, -15);
		back.onClick = () => app.setSz('Levels');
		this._world.addSubject(back);
	}
	
	getScore() {
		return this._score;
	}
	
	tick(delta) {
		super.tick(delta);
		this.tickWorld(delta);
	}
	
};

QQ.Seizures.register.set('Game', game.seizures.Game);
