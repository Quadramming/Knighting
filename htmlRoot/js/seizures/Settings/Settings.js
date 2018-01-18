game.seizures.Settings = class Settings
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
			'Settings', 'text header'
		));
		
		game.musicManager.addCheckBox(this._world);
		this.addSoundCheckBox();
		this.addResetButton();
		this.addBackButton();
	}
	
	addSoundCheckBox() {
		const position = new QQ.Point(-7, 0);
		this._world.addSubject(new QQ.CheckBox({
			app: this._app,
			size: new QQ.Size(2, 2),
			anchor: new QQ.Point(1, 0.5),
			position: position,
			isChecked: game.settingSound(),
			onChange: (isChecked) => {
				game.settingSound(isChecked);
			}
		}));
		this._world.addSubject(new QQ.StyledText(
			'Sound', 'default', 'checkbox', {
				position: new QQ.Point(position.x() + 1, position.y())
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
	
};

QQ.Seizures.register.set('Settings', game.seizures.Settings);
