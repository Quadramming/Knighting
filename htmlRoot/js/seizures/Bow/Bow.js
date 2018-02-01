game.seizures.Bow = class szBow extends szDialog {
	
	constructor(input) {
		super(input);
		
		this._world.addSubject(new QQ.StyledText(
			'Upgrade bow', 'text header'
		));
		
		this._coinsText = null;
		this._coinsRedText = null;
		this._coinsGreenText = null;
		
		this.addCoinsTexts();
		this.setCoolDown(-1.5);
		this.setArrows(1.5);
		this.setPenetration(4.5);
		this.setSpeed(7.5);
		this.setShield(10.5);
		
		this.addBackButton();
		//this.addEarnCoinsButton();
	}
	
	addCoinsTexts() {
		this._coinsText = new QQ.StyledText(
			'Coins -', 'text header', {
				position: new QQ.Point(0, -4),
				size: new QQ.Size(20, 2)
			}
		);
		this._coinsRedText = new QQ.StyledText(
			'Red', 'text header', 'red', {
				align: 'left',
				position: new QQ.Point(8, -4),
				size: new QQ.Size(6, 2)
			}
		);
		this._coinsGreenText = new QQ.StyledText(
			'Green', 'text header', 'green', {
				align: 'left',
				position: new QQ.Point(8, -4),
				size: new QQ.Size(6, 2)
			}
		);
		this._world.addSubject(this._coinsText);
		this._world.addSubject(this._coinsRedText);
		this._world.addSubject(this._coinsGreenText);
	}
	
	addEarnCoinsButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'coin',
			position: new QQ.Point(9, 14),
			size: new QQ.Point(2, 2),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				game.addCoins(10);
			}
		}));
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
	
	setCoolDown(y) {
		this._world.addSubject(
			game.stats.coolDown.getIco(new QQ.Point(-8.5, y)),
			game.stats.coolDown.getBar(new QQ.Point(-1.5, y)),
			game.stats.coolDown.getSpendCoinOne(new QQ.Point(5.5, y)),
			game.stats.coolDown.getSpendCoinAll(new QQ.Point(9, y))
		);
	}
	
	setSpeed(y) {
		this._world.addSubject(
			game.stats.speed.getIco(new QQ.Point(-8.5, y)),
			game.stats.speed.getBar(new QQ.Point(-1.5, y)),
			game.stats.speed.getSpendCoinOne(new QQ.Point(5.5, y)),
			game.stats.speed.getSpendCoinAll(new QQ.Point(9, y))
		);
	}
	
	setArrows(y) {
		this._world.addSubject(
			game.stats.arrows.getIco(new QQ.Point(-8.5, y)),
			game.stats.arrows.getTextInfo(new QQ.Point(-1.5, y)),
			game.stats.arrows.getSpendCoinOne(new QQ.Point(5.5, y)),
			game.stats.arrows.getSpendCoinAll(new QQ.Point(9, y))
		);
	}
	
	setPenetration(y) {
		this._world.addSubject(
			game.stats.penetration.getIco(new QQ.Point(-8.5, y)),
			game.stats.penetration.getTextInfo(new QQ.Point(-1.5, y)),
			game.stats.penetration.getSpendCoinOne(new QQ.Point(5.5, y)),
			game.stats.penetration.getSpendCoinAll(new QQ.Point(9, y))
		);
	}
	
	setShield(y) {
		this._world.addSubject(
			game.stats.shield.getIco(new QQ.Point(-8.5, y)),
			game.stats.shield.getBar(new QQ.Point(-1.5, y)),
			game.stats.shield.getSpendCoinOne(new QQ.Point(5.5, y)),
			game.stats.shield.getSpendCoinAll(new QQ.Point(9, y))
		);
	}
	
	tick(delta) {
		super.tick(delta);
		const coins = game.getCoins();
		if ( coins > 0 ) {
			this._coinsRedText.setText('');
			this._coinsGreenText.setText(coins);
		} else {
			this._coinsRedText.setText(coins);
			this._coinsGreenText.setText('');
		}
	}
	
	onBackButton() {
		this._app.closePopUp();
	}
	
};

QQ.Seizures.register.set('Bow', game.seizures.Bow);
