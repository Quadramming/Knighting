class Player extends Man {
	
	constructor(app, options = {}) {
		options.speed = QQ.default(options.speed, 10);
		options.z     = 1;
		super(app, options);
		this.setShield(6, 0);
		this.setWeapon(1, 11);
		this.setPatrol(
			{x: -13.5, y: 18.5},
			{x:  13.5, y: 18.5}
		);
	}
	
	hitted() {
		this.stun();
	}
	
	setPatrol(from, to) {
		this.setAction( new QQ.Actions.Patrol(this._app, {
			subj: this,
			from, to
		}));
	}
	
	changePatrolDirection() {
		if ( this._action instanceof QQ.Actions.Patrol ) {
			this._action.changeDirection();
		}
	}
	
};
