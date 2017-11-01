class Arrow extends QQ.Subject.Actionable {
	
	constructor(options) {
		options.size        = new QQ.Size(1.5, 1.5);
		options.img         = QQ.default(options.img, 'arrow');
		options.z           = 5;
		options.isClickable = false;
		options.anchor      = new QQ.Point(0.5, 1);
		super(options);
	}
	
	flyTo(to) {
		const distance = to.getDistance(this._position);
		const duration = 0.4 + distance*0.04;
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
		let hittedEnemy = null;
		for ( const enemy of hitted ) {
			if ( enemy instanceof Man && enemy.isAlive() ) {
				hittedEnemy = enemy;
			}
		}
		if ( hittedEnemy ) {
			hittedEnemy.hitted();
		} else {
			this.setZ(1);
		}
		this.disapear();
	}
	
	disapear() {
		this._action = new QQ.Actions.Disapear({
			subj:     this,
			duration: 0.3,
			onEnd:    () => this.deleteMe()
		});
	}
	
};
