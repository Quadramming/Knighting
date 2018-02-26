game.seizures.Winner = class Winner extends szDialog {
	
	constructor(input) {
		input.header = 'Winner';
		super(input);
		
		this.addGracText();
		this.addPotatoe();
		this.addThankYouButton();
	}
	
	addGracText() {
		this._world.addSubject( new QQ.StyledText(
			'You are the best!\n'+
			'You won this game!\n'+
			'You destroyed enemies!\n'+
			'You saved your princess!\n'+
			'You rule this world!\n'+
			'The World can sleep in peace!\n'+
			'Here is potato for you!',
			'text dialog'
		));
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
