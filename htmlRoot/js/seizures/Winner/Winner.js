game.seizures.Winner = class Winner extends szDialog {
	
	constructor(input) {
		super(input);
		
		this._world.addSubject( new QQ.StyledText(
			'Winner', 'text header'
		));
		
		this._world.addSubject( new QQ.StyledText(
			'You are the best!\n'+
			'You won this game!\n'+
			'You destroyed enemies!\n'+
			'You saved your princess!\n'+
			'You rule this world!\n'+
			'World can sleep in peace!\n'+
			'Here is potatoe for you!',
			'text dialog'
		));
		
		this.addPotatoe();
		this.addThankYouButton();
	}
	
	addPotatoe() {
		this._world.addSubject( QQ.Subject.make({
			app: this._app,
			img: 'potato',
			size: new QQ.Point(18, NaN),
			position: new QQ.Point(0, 8),
			anchor: new QQ.Point(0.5, 0.5)
		}));
	}
	
	addThankYouButton() {
		this._world.addSubject( new QQ.Button({
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
	
	onBackButton() {
		this._app.closePopUp();
	}
	
};

QQ.Seizures.register.set('Winner', game.seizures.Winner);
