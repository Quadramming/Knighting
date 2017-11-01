class ChangePatrolDirection extends QQ.Subject.Base {
	
	constructor(options) {
		options.size = new QQ.Point(30 * 1.5, 4);
		options.position = new QQ.Point(0, -18);
		options.anchor = new QQ.Point(0.5, 0.5);
		super(options);
		this._player = options.player;
	}
	
	onClickDown(point) {
		this._player.changePatrolDirection();
	}
	
};
