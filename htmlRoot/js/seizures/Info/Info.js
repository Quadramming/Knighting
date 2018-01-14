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
		
		this._world.addSubject(new QQ.Text({
			align: 'center',
			valign: 'middle',
			position: new QQ.Point(0, -6),
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(20, 3),
			baseLine: 'middle',
			fontSize: 5,
			font: 'KenFuture',
			text: 'Info',
			isClickable: false,
			color: '#6d543a',
			z: 20
		}));
		
		this._world.addSubject(new QQ.Text({
			align: 'left',
			border: false,
			valign: 'middle',
			position: new QQ.Point(0, -5),
			anchor: new QQ.Point(0.5, 0),
			size: new QQ.Size(20, 17),
			baseLine: 'middle',
			fontSize: 5,
			font: 'KenFuture',
			text: 'Developer \nTrifle Quad Studio\n\n'+
					'Assets & Sound & Font\nhttps://kenney.nl\n\n'+
					'Font \nhttps://www.dafont.com/\nrusso-one.font\n\n'+
					'Music \nhttps://opengameart.org/\ncontent/battle-theme-a',
			isClickable: false,
			color: '#6d543a',
			z: 20
		}));
		
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
