game.seizures.Settings = class Settings extends szDialog {
	
	constructor(input) {
		super(input);
		
		this._world.addSubject(new QQ.StyledText(
			'Settings', 'text header'
		));
		
		this._isWithReset = QQ.default(input.isWithReset, false);

		game.musicManager.addCheckBox(this._world);
		this.addSoundCheckBox();
		this.addShowFpsCheckBox();
		//this.addTickType();
		this.addViewport();
		if ( this._isWithReset ) {
			this.addResetButton();
		}
		this.addBackButton();
	}
	
	addViewport() {
		const position = new QQ.Point(-7, 6);
		const subj = new QQ.StyledText(
			game.getGameSettingWidth(), 'default', 'checkboxText', {
				position: new QQ.Point(position.x() + 1, position.y()),
				onClick: () => {
					const widths = [160, 320, 360, 600, 800, 1024];
					const nowWidth = game.getNumberFromStorage('Setting viewportWidth', 600);
					let index = widths.indexOf(nowWidth);
					if ( index === -1 || index+1 === widths.length ) {
						index = 0;
					} else {
						++index;
					}
					game.storage('Setting viewportWidth', widths[index]);
					game.initGameViewport();
					subj.setText(game.getGameSettingWidth());
				}
			}
		);
		this._world.addSubject(subj);
	}
	
	addTickType() {
		const position = new QQ.Point(-7, 6);
		const subj = new QQ.StyledText(
			game.getGameSettingFpsText(), 'default', 'checkboxText', {
				position: new QQ.Point(position.x() + 1, position.y()),
				onClick: () => {
					const fps = [0, 15, 30, 50, 60, 120];
					const nowFps = game.getNumberFromStorage('Setting targetFps');
					let index = fps.indexOf(nowFps);
					if ( index === -1 || index+1 === fps.length ) {
						index = 0;
					} else {
						++index;
					}
					game.storage('Setting targetFps', fps[index]);
					game.initGameTickType();
					subj.setText(game.getGameSettingFpsText());
				}
			}
		);
		this._world.addSubject(subj);
	}
	
	addShowFpsCheckBox() {
		const position = new QQ.Point(-7, 3);
		this._world.addSubject(new QQ.StyledText(
			'Show fps', 'default', 'checkboxText', {
				position: new QQ.Point(position.x() + 1, position.y()),
				onClick: () => {this._app.showFpsDetails();}
			}
		));
	}
	
	addSoundCheckBox() {
		const position = new QQ.Point(-7, 0);
		const checkBox = new QQ.CheckBox({
			app: this._app,
			size: new QQ.Size(2, 2),
			anchor: new QQ.Point(1, 0.5),
			position: position,
			isChecked: game.settingSound(),
			onChange: (isChecked) => {
				game.settingSound(isChecked);
			}
		});
		this._world.addSubject(checkBox);
		this._world.addSubject(new QQ.StyledText(
			'Sound', 'default', 'checkboxText', {
				position: new QQ.Point(position.x() + 1, position.y()),
				onClick: () => {checkBox.change();}
			}
		));
	}
	
	addBackButton() {
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
	
	addResetButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'reset',
			position: new QQ.Point(0, 10),
			size: new QQ.Point(4, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			init: function() {
				this._duration = 0;
				this._toHold = 5;
			},
			onBtnClickDown: function(point) {
				this._duration = 0;
				this._world.addSubject(QQ.BubbleText.make({
					text: 'Hold ' + this._toHold + ' seconds',
					color: '#FF0000',
					position: point
				}));
			},
			onBtnClick: function(point) {
				if ( this._duration > this._toHold ) {
					game.reset();
					this._world.addSubject(QQ.BubbleText.make({
						text: 'Reseted',
						color: '#FF0000',
						position: point
					}));
				}
			},
			updateOnTick: function(delta) {
				this._duration += delta;
			}
		}));
	}
	
	onBackButton() {
		this._app.closePopUp();
	}
	
};

QQ.Seizures.register.set('Settings', game.seizures.Settings);
