game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._app._fpsCounter.showDetails();
		
		let bg = new QQ.Subject.TileSprite(this._app, 'imgs/tile.png');
		bg.setPosition(0, 0);
		bg.setTileSize(5, 5);
		let resizeBg = () => {
				let cameraView = this._camera.getView();
				bg.setSize(cameraView.width, cameraView.height);
			};
		resizeBg();
		window.addEventListener('resize', resizeBg);
		this._world.addSubject(bg);
		
		let frame = new QQ.Subject.Sprite(this._app, 'imgs/bg.png', 30, 40);
		this._world.addSubject(frame);
		
		let knight = new game.Char(this, 'imgs/knight.png');
		knight.setPosition(-8, 12);
		
		let enemy = new game.Char(this, 'imgs/enemy.png');
		enemy.setPosition(8, 12);
		
		new game.PotionSlot(this, 'imgs/potion.png');
	}
	
	getScore() {
		return this._score;
	}
	
	tick(delta) {
		this.tickWorld(delta);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);

game.Char = class Char extends
	QQ.Subject.DragAndDropMix(QQ.Subject.Sprite)
{
	
	constructor(sz, img) {
		super(sz, img);
		this._world  = sz.getWorld();
		this.setSize(8, 8);
		this._world.addSubject(this);
	}
	
};

game.PotionSlot = class PotionSlot extends
	QQ.Subject.DragAndDropMix(QQ.Subject.Sprite)
{
	
	constructor(sz, img) {
		super(sz, img);
		this._world  = sz.getWorld();
		this.setSize(4, 4);
		this._world.addSubject(this);
	}
	
};
