class Arrow extends QQ.Subject.Actionable {
	
	constructor(options) {
		options.size        = new QQ.Size(3, 3);
		options.img         = QQ.default(options.img, 'arrow');
		options.z           = 5;
		options.isClickable = false;
		options.anchor      = new QQ.Point(0.5, 1);
		super(options);
		this._penetration = QQ.default(options.penetration, 1);
		this._timeFixed = options.timeFixed;
		this._timePerMeter = options.timePerMeter;
	}
	
	flyTo(to) {
		const distance = to.getDistance(this._position);
		const duration = this._timeFixed + distance * this._timePerMeter;
		const angle = Math.atan2(
			this._position.y()-to.y(),
			this._position.x()-to.x()
		) + Math.PI/2;
		this.setAngle(angle);
		this._action = new QQ.Actions.BallisticsMove({
			subj: this,
			to, duration
		});
		this._action.setOnEnd( () => this.hit() );
	}
	
	hit() {
		const hitted = this._world.getAllSubjectsAtPoint(this._position);
		const hittedEnemies = [];
		for ( const enemy of hitted ) {
			if ( enemy instanceof Man && enemy.isAlive() ) {
				hittedEnemies.push(enemy);
			}
		}
		hittedEnemies.reverse();
		let hittedAmount = 0;
		for ( const enemy of hittedEnemies ) {
			if ( enemy.hitted(this._position) ) {
				++hittedAmount;
				if ( hittedAmount >= this._penetration ) {
					break;
				}
			}
		}
		if ( hittedAmount === 0) {
			this.setZ(2);
		}
		this.disappear();
	}
	
	disappear() {
		this._action = new QQ.Actions.Disappear({
			subj:     this,
			duration: 0.3,
			onEnd:    () => this.deleteMe()
		});
	}
	
};
