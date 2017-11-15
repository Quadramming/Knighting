class ChangePatrolDirection extends QQ.Subject.Base {
	
	constructor(options) {
		options.size = new QQ.Point(30 * 1.5, 4);
		options.position = new QQ.Point(0, -30);
		options.anchor = new QQ.Point(0.5, 0.5);
		options.z = 10;
		super(options);
		this._player = options.player;
	}
	
	draw(ctx) {
		return;
		ctx.transform(this.getMatrix());
		this._drawLocalBorder(ctx);
		super.draw(ctx);
	}
	
	onClickDown(point) {
		this._player.changePatrolDirection();
	}
	
};
