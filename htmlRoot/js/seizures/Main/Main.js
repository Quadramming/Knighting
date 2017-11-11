game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	init() {
		this._app.setSz('Logo');
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
