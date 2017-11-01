class BattleField extends QQ.Subject.Base {
	
	constructor(options) {
		options.size = new QQ.Point(30 * 1.5, 36);
		options.position = new QQ.Point(0, 2);
		options.anchor = new QQ.Point(0.5, 0.5);
		options.z = 10;
		super(options);
		this._player = options.player;
	}
	
	onClickDown(point) {
		this._player.shoot(point);
	}
	
};