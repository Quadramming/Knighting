game.seizures.Main = class Main extends QQ.Seizures.Base {
	
	init() {
		game.initGameViewport();
		this._app.setSz('Logo');
		//this._app.setSz('Gameplay');
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
