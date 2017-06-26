game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
	}
	
	init() {
		let app = this._app;
		this._camera.init(30, 40, 0, 0);
		app._fpsCounter.showDetails();
		
		let bg = new QQ.Subject.TileSprite(app, 'imgs/tile.png');
		bg.setPosition(0, 0);
		bg.setTileSize(5, 5);
		let resizeBg = () => {
				let cameraView = this._camera.getView();
				bg.setSize(cameraView.width, cameraView.height);
			};
		resizeBg();
		window.addEventListener('resize', resizeBg);
		this._world.addSubject(bg);
		
		let frame = new QQ.Subject.Sprite(app, 'imgs/bg.png', 30, 40);
		//this._world.addSubject(frame);
		
		let knight = new game.Char(app, 'imgs/knight.png');
		knight.onDie = () => {
			//alert('You lose');
		};
		knight.setPosition(-8, 12);
		
		let enemy = new game.Char(app, 'imgs/enemy.png');
		enemy.onDie = () => {
			//alert('You win');
		};
		enemy.setPosition(8, 12);
		
		this._potionSlotsArea = new game.PotionSlotsArea(app);
		
		this._potionSlotsArea.add(
			'imgs/potion.png',
			10,
			() => new game.Effect.HP(app, 30)
		);
		
		this._potionSlotsArea.add(
			'imgs/potion.png',
			10,
			() => new game.Effect.HP(app, 10)
		);
		
		this._potionSlotsArea.add(
			'imgs/potion.png',
			10,
			() => new game.Effect.HP(app, 30)
		);
		
		this._world.addSubject(
			new game.Fight(app, knight, enemy)
		);
	}
	
	getScore() {
		return this._score;
	}
	
	tick(delta) {
		this.tickWorld(delta);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
