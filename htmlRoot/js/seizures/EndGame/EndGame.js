game.seizures.EndGame = class EndGame extends szDialog {
	
	constructor(input) {
		super(input);
		
		this._world.addSubject(new QQ.StyledText(
			'You ' + (input.isWin ? 'win' : 'lose'),
			'text header'
		));
		
		if ( input.isWin ) {
			this.addNextLevelButton(input.level);
		}
		this.addRestartButton();
		this.addMenuButton();
		this.addMyBowButton();
	}
	
	init(input) {
		super.init();
		if ( input.level === 100 && input.isWin ) {
			this._app.popUp('Winner');
		}
	}
	
	addNextLevelButton(level) {
		game.winLevel(level);
		this._world.addSubject( new QQ.Button({
			app: this._app,
			img: 'next level',
			position: new QQ.Point(0, -2),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.reset();
				this._app.closePopUp();
				this._szManager.getActive().startGame();
			}
		}));
	}
	
	addRestartButton() {
		this._world.addSubject( new QQ.Button({
			app: this._app,
			img: 'restart',
			position: new QQ.Point(0, 3),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				const level = this._szManager.getActive().getCurrentLevel();
				this._szManager.reset();
				this._app.closePopUp();
				this._szManager.getActive().startGame(level);
			}
		}));
	}
	
	addMenuButton() {
		this._world.addSubject( new QQ.Button({
			app: this._app,
			img: 'menu',
			position: new QQ.Point(0, 8),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.reset();
			}
		}));
	}
	
	addMyBowButton() {
		this._world.addSubject( new QQ.Button({
			app: this._app,
			img: 'bow',
			position: new QQ.Point(0, 13),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Bow');
			}
		}));
	}
	
	onBackButton() {
		this._app.closePopUp();
		this._szManager.getActive().showMenu();
	}
	
};

QQ.Seizures.register.set('EndGame', game.seizures.EndGame);
	