game.PotionSlot = class PotionSlot extends QQ.Subject.Sprite {
	
	constructor(app, img, amount, getEffect) {
		super(app, img);
		this._getEffect = getEffect;
		this._world     = app.getSz().getWorld();
		this._amount    = amount;
		this._world.addSubject(this);
		this.setSize(4, 4);
	}
	
	draw() {
		super.draw();
		this._ctx.font         = '14px Ken';
		this._ctx.textBaseline = 'middle';
		this._ctx.textAlign    = 'center';
		this._ctx.fillStyle    = 'black';
		this._ctx.fillText(this._amount, 45, 45);
	}
	
	addAmount(x) {
		this._amount += x;
	}
	
	getEffect() {
		return this._getEffect();
	}
	
	onClickDown(x, y) {
		if ( this._amount === 0 ) {
			return;
		}
		--this._amount;
		let potionDnD = new game.PotionDnD(
				this._app,
				'imgs/potion.png',
				this,
				this._x,
				this._y
			);
		potionDnD.onClickDown(x, y);
	}
	
};
