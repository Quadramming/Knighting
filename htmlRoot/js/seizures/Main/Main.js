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
		
		new game.Char(this._app, this._world);
	}
	
	getWorld() {
		return this._world;
	}
	
	getScore() {
		return this._score;
	}
	
	tick(delta) {
		this.tickWorld(delta);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);

game.Char = class Char extends QQ.Subject.Sprite {
	
	constructor(app, world) {
		super(app, 'imgs/knight.png');
		this._app   = app;
		this._world = world;
		this.setSize(10, 10);
		this.setPosition(-10, 0);
		this._world.addSubject(this);
		this._action = null;
		this.setIdle();
		this.moveTo();
	}
	
	tick(delta) {
		super.tick(delta);
		this._action.tick(delta);
	}
	
	draw() {
		super.draw();
		this._action.draw();
	}
	
	setIdle() {
		this._action = new QQ.Actions.Base(this._app, this);
	}
	
	moveTo() {
		this._action = new QQ.Actions.Move(
			this._app,
			this,
			{ x: this._x, y: this._y },
			{ x: 10, y: 10 },
			1000
		);
	}
	
};
