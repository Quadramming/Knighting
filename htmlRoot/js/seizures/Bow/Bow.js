game.seizures.Bow = class szBow
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
			text: 'Upgrade bow',
			isClickable: false,
			color: '#6d543a',
			z: 20
		}));
		
		this._coinsText = new QQ.Text({
			align: 'center',
			valign: 'middle',
			position: new QQ.Point(0, -4),
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(20, 2),
			baseLine: 'middle',
			fontSize: 5,
			font: 'KenFuture',
			text: 'Coins',
			isClickable: false,
			color: '#6d543a',
			z: 20
		});
		this._world.addSubject(this._coinsText);
		
		this.setCoolDown(-1.5);
		this.setArrows(1.5);
		this.setPenetration(4.5);
		this.setSpeed(7.5);
		this.setShield(10.5);
		
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
	
	setCoolDown(y) {
		this._world.addSubject(
			game.stats.coolDown.getIco(new QQ.Point(-7, y)),
			game.stats.coolDown.getBar(new QQ.Point(0, y)),
			game.stats.coolDown.getSpendCoin1(new QQ.Point(7, y)),
			//game.stats.coolDown.getSpendCoin3(new QQ.Point(10, y)),
		);
	}
	
	setSpeed(y) {
		this._world.addSubject(
			game.stats.speed.getIco(new QQ.Point(-7, y)),
			game.stats.speed.getBar(new QQ.Point(0, y)),
			game.stats.speed.getSpendCoin1(new QQ.Point(7, y)),
			//game.stats.speed.getSpendCoin3(new QQ.Point(10, y)),
		);
	}
	
	setArrows(y) {
		this._world.addSubject(
			game.stats.arrows.getIco(new QQ.Point(-7, y)),
			game.stats.arrows.getTextInfo(new QQ.Point(0, y)),
			game.stats.arrows.getSpendCoin1(new QQ.Point(7, y)),
			//game.stats.arrows.getSpendCoin3(new QQ.Point(10, y))
		);
	}
	
	setPenetration(y) {
		this._world.addSubject(
			game.stats.penetration.getIco(new QQ.Point(-7, y)),
			game.stats.penetration.getTextInfo(new QQ.Point(0, y)),
			game.stats.penetration.getSpendCoin1(new QQ.Point(7, y)),
			//game.stats.penetration.getSpendCoin3(new QQ.Point(10, y))
		);
	}
	
	setShield(y) {
		this._world.addSubject(
			game.stats.shield.getIco(new QQ.Point(-7, y)),
			game.stats.shield.getBar(new QQ.Point(0, y)),
			game.stats.shield.getSpendCoin1(new QQ.Point(7, y)),
			//game.stats.shield.getSpendCoin3(new QQ.Point(10, y)),
		);
	}
	
	tick(delta) {
		super.tick(delta);
		const coins = game.getCoins();
		this._coinsText.setText('Coins - ' + coins);
	}
};

QQ.Seizures.register.set('Bow', game.seizures.Bow);
