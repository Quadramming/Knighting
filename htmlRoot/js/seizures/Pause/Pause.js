game.seizures.Pause = class Pause extends szDialog {
	
	constructor(input) {
		input.header = 'Pause';
		super(input);
		
		this.addContinueButton();
		this.addRestartButton();
		this.addSettingsButton();
		this.addAbortButton();
	}
	
	addContinueButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'continue',
			position: new QQ.Point(0, -2),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
			}
		}));
	}
	
	addRestartButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'restart',
			position: new QQ.Point(0, 3),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.forActive(sz => {
					sz.restartGame();
				});
			}
		}));
	}
	
	addSettingsButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'settings',
			position: new QQ.Point(7.5, 13),
			size: new QQ.Point(5, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Settings');
			}
		}));
	}
	
	addAbortButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'abort',
			position: new QQ.Point(0, 8),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.reset();
			}
		}));
	}
	
	onBackButton() {
		this._app.closePopUp();
	}
	
};

QQ.Seizures.register.set('Pause', game.seizures.Pause);
