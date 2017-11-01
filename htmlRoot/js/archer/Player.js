class Player extends Man {
	
	constructor(options) {
		options.speed = QQ.default(options.speed, 10);
		super(options);
		this.setShield(new QQ.Point(1, 6));
		this.setMelee(new QQ.Point(1, 3));
		this.setPatrol(
			new QQ.Point(-13.5, -18),
			new QQ.Point( 13.5, -18)
		);
	}
	
	hitted() {
		this.stun();
	}
	
	setPatrol(from, to) {
		this.setAction( new QQ.Actions.Patrol({
			from, to
		}));
	}
	
	changePatrolDirection() {
		if ( this._action instanceof QQ.Actions.Patrol ) {
			this._action.changeDirection();
		}
	}
	
};
