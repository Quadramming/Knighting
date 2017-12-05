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
			text: 'Bow',
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
		this._world.addSubject(PlayerBowCoolDown.makeIco({
			app: this._app,
			position: new QQ.Point(-8, y)
		}));
		this._world.addSubject(PlayerBowCoolDown.makeBar({
			app: this._app,
			position: new QQ.Point(-1, y)
		}));
		this._world.addSubject(PlayerBowCoolDown.makeSpendCoin1({
			app: this._app,
			position: new QQ.Point(6, y)
		}));
		this._world.addSubject(PlayerBowCoolDown.makeSpendCoin3({
			app: this._app,
			position: new QQ.Point(9, y)
		}));
	}
	
	tick(delta) {
		super.tick(delta);
		const coins = game.getCoins();
		this._coinsText.setText('Coins - ' + coins);
	}
};

QQ.Seizures.register.set('Bow', game.seizures.Bow);
