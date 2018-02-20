game.seizures.Menu = class Menu extends szDialog {
	
	constructor(input) {
		super(input);
		
		this._levelText = new QQ.StyledText('', 'levels');
		this._world.addSubject(this._levelText);
		
		this.addStartButton();
		this.addBowButton();
		this.addInfoButton();
		this.addSettingsButton();
		this.addChar();
		this.addBonusCoins();
	}
	
	addBonusCoins() {
		const bonus = game.getBonusCoins();
		if ( bonus > 0 ) {
			const button = new QQ.Button({
				app: this._app,
				img: 'coin',
				position: new QQ.Point(0, 13),
				size: new QQ.Point(4, NaN),
				anchor: new QQ.Point(0.5, 0.5),
				onBtnClick: (point) => {
					game.addCoins(bonus);
					QQ.BubbleText.make({
						world: this._world,
						text: '+' + bonus,
						color: '#00FF00',
						position: point
					});
					game.clearBonusCoins();
					button.deleteMe();
				}
			});
			this._world.addSubject(button);
		}
	}
	
	addStartButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'start',
			position: new QQ.Point(0, -2),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.getActive().startGame();
			}
		}));
	}
	
	addBowButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'bow',
			position: new QQ.Point(0, 3),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Bow');
			}
		}));
	}
	
	addInfoButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'info',
			position: new QQ.Point(-7.5, 13),
			size: new QQ.Point(5, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Info');
			}
		}));
	}
	
	addSettingsButton() {
		this._world.addSubject( new QQ.Button({
			app: this._app,
			img: 'settings',
			position: new QQ.Point(7.5, 13),
			size: new QQ.Point(5, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Settings', {isWithReset: true});
			}
		}));
	}
	
	addChar() {
		const char = new Man({
			size: new QQ.Point(8),
			position: new QQ.Point(0, 11),
			app: this._app,
			onClick: (point) => {
				const texts = [
					'Wow!',
					'Best game ever!',
					'Such action!',
					'Very good!',
					'So much fun!',
					'Hello!',
					'Have fun!',
					'You are the best!'
				];
				this._world.addSubject( QQ.BubbleText.make({
					text: texts[Math.floor(Math.random()*texts.length)],
					color: '#FF0000',
					position: point
				}));
			}
		});
		char.dress(RandomOutfit);
		this._world.addSubject(char);
	}
	
	tick(delta) {
		super.tick(delta);
		const level = game.getAvailableLevel();
		this._levelText.setText('Level: ' + level + ' / 100');
	}
	
	onBackButton() {
		navigator.app.exitApp();
	}
	
};

QQ.Seizures.register.set('Menu', game.seizures.Menu);
