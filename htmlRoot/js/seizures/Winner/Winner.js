game.seizures.Winner = class Winner
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		this._world.addSubject( QQ.Subject.make({
			app: this._app,
			img: 'dialog',
			size: new QQ.Point(25, 27),
			anchor: new QQ.Point(0.5, 0.35)
		}));
		
		this._world.addSubject(new QQ.StyledText(
			'Winner', 'text header'
		));
		
		this._world.addSubject(new QQ.StyledText(
			'You are the best!\n'+
			'You won this game!\n'+
			'You destroyed enemies!\n'+
			'You saved your princess!\n'+
			'You rule this world!\n'+
			'World can sleep in peace!\n'+
			'Here is potatoe for you!',
			'text dialog'
		));
		
		this._world.addSubject( QQ.Subject.make({
			img: 'potato',
			app: this._app,
			size: new QQ.Point(18, NaN),
			position: new QQ.Point(0, 8),
			anchor: new QQ.Point(0.5, 0.5)
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'thankYou',
			position: new QQ.Point(0, 14),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
			}
		}));
	}
	
};

QQ.Seizures.register.set('Winner', game.seizures.Winner);
