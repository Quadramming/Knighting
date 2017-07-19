game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
	}
	
	init() {
	}
	
	tick(delta) {
		super.tick(delta);
		this._app.setSz('Levels');
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
