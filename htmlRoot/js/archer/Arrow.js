class Arrow extends QQ.Subject.Actionable {
	
	constructor(options) {
		options.size        = new QQ.Size(3, 3);
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
		const hittedEnemies = [];
		for ( const enemy of hitted ) {
			if ( enemy instanceof Man && enemy.isAlive() ) {
				hittedEnemies.push(enemy);
			}
		}
		let hit = false;
		hittedEnemies.reverse();
		for ( const enemy of hittedEnemies ) {
			const isHit = enemy.hitted(this._position);
			if ( isHit ) {
				hit = true;
				break;
			}
		}
		
		if ( ! hit ) {
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
