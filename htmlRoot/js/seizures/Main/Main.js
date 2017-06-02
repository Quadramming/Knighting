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

game.Char = class Char extends QQ.Subject.Actionable {
	
	constructor(app, world) {
		super(app, 'imgs/knight.png');
		this._app   = app;
		this._world = world;
		this.setSize(10, 10);
		this.setPosition(-10, 0);
		this._world.addSubject(this);
		this.moveTo();
	}
	
	moveTo(x, y) {
		let action = new QQ.Actions.Move(
			this._app,
			this,
			{ x: this._x, y: this._y },
			{ x: this._x*-1, y: this._y*-1 },
			1000
		);
		this.setAction(action);
	}
	
};
