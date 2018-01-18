game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	init() {
		//this._app.setSz('Logo');
		this._app.setSz('Gameplay');
		game.musicManager.start();
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
