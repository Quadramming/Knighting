QQ.Actions.Stun = class Stun extends QQ.Actions.Base {
	
	constructor(app, options) {
		options.isAbortable       = false;
		options.isRestoreOnFinish = true;
		super(app, options);
		this._star = app.createSprite('imgs/star.png');
	}
	
	draw(ctx) {
		let x = -this._star.getSize().width/2 - 50;
		let y = -40 + Math.sin(this._lasting/250)*10;
		this._star.draw(ctx, x, y);
		x = -this._star.getSize().width/2;
		y = -40 + Math.sin(this._lasting/300)*10;
		this._star.draw(ctx, x, y);
		x = -this._star.getSize().width/2 + 50;
		y = -40 + Math.sin(this._lasting/200)*10;
		this._star.draw(ctx, x, y);
	}
	
};
