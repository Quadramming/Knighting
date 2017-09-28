class Arrow extends QQ.Subject.Actionable {
	
	constructor(app, options = {}) {
		options.width       = QQ.default(options.width,  1.5);
		options.height      = QQ.default(options.height, 1.5);
		options.imgSrc      = QQ.default(options.imgSrc, 'imgs/arrow.png');
		options.z           = 4;
		options.isClickable = false;
		super(app, options);
		this._time          = app.getTime();
	}
	
	draw(ctx) {
		this._sprite.draw(ctx, QQ.Sprite.Pivot.CENTERBOTTOM);
	}
	
	flyTo(to) {
		let distance = QQ.Math.calcDistance(this._x, this._y, to.x, to.y);
		let duration = 400 + distance*40;
		this.setAngle(Math.atan2(this._y-to.y, this._x-to.x) - Math.PI/2);
		this._action = new QQ.Actions.BallisticsMove(this._app, {
			subj: this,
			to, duration
		});
		this._action.setOnEnd( () => this.hit() );
	}
	
	hit() {
		let hitted   = this._world.getAllSubjectsAtPoint(this._x, this._y);
		let isHitted = false;
		for ( let enemy of hitted ) {
			if ( enemy instanceof Man && enemy.isAlive() ) {
				enemy.hitted();
				isHitted = true;
				break;
			}
		}
		if ( ! isHitted ) {
			this.setZ(0);
		}
		this.disapear();
	}
	
	disapear() {
		this._action = new QQ.Actions.Disapear(this._app, {
			subj:     this,
			duration: 300,
			onEnd:    () => this._world.deleteSubject(this)
		});
	}
	
};
