game.PotionSlotsArea = class PotionSlotsArea {
	
	constructor(app) {
		this._count     = 0;
		this._app       = app;
		this._slotWidth = 5;
		this._x         = -10;
		this._y         = -2;
	}
	
	add(img, amount, getEffect) {
		let slot = new game.PotionSlot(this._app, img, amount, getEffect);
		slot.setPosition(this._x + this._slotWidth*this._count, this._y);
		++this._count;
	}
	
};
