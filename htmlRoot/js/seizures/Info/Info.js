game.seizures.Info = class Info
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		this._world.addSubject( QQ.Subject.make({
			img: 'dialog',
			app: this._app,
			size: new QQ.Point(25, 27),
			anchor: new QQ.Point(0.5, 0.35)
		}));
		this._world.addSubject(new QQ.StyledText(
			'Info', 'text header'
		));
		
		this._world.addSubject(new QQ.StyledText(
			'Developer \nTrifle Quad Studio\n\n'+
			'Assets & Sound & Font\nhttps://kenney.nl\n\n'+
			'Font \nhttps://www.dafont.com/\nrusso-one.font\n\n'+
			'Music \nhttps://opengameart.org/\ncontent/battle-theme-a',
			'text dialog'
		));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'back',
			position: new QQ.Point(0, 14),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
			}
		}));
	}
	
};

QQ.Seizures.register.set('Info', game.seizures.Info);
