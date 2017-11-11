game.seizures.EndGame = class EndGame
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'pause',
			size: new QQ.Point(5, 5),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {this._app.closePopUp();}
		}));
	}
	
};

QQ.Seizures.register.set('EndGame', game.seizures.EndGame);
	