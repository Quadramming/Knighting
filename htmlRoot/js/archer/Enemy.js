class Enemy extends Man {
	
	constructor(options) {
		super(options);
		this._player = options.player;
		this._pointsAmount = 20;
		this._points  = [];
		this.initStraightEnemy();
		this.doNextPoint();
	}
	
	fillPoints() {
		for ( let i = 0; i < this._pointsAmount; ++i ) {
			this._points.push(new QQ.Point(
				QQ.Math.rand(-13, 13),
				QQ.Math.rand(-23, 17)
			));
		}
	}
	
	tick(delta) {
		super.tick(delta);
		if ( QQ.Math.rand(0, 40) === 0 ) {
			this.shoot(new QQ.Point(
				QQ.Math.rand(-15, 15),
				-30
			));
		}
	}
	
	initChaoticEnemy() {
		this.fillPoints();
	}
	
	initStraightEnemy() {
		this.initChaoticEnemy();
		this._points.sort((a, b) => a.y() - b.y());
	}
	
	doNextPoint() {
		if ( this._points.length > 0 ) {
			const point = this._points.pop();
			this.goToPoint(point);
		} else {
			this.goToEnter();
		}
	}
	
	goToPoint(point) {
		this.setAction(
			new QQ.Actions.WalkTo({
				to:   point,
				onEnd: () => this.doNextPoint()
			})
		);
	}
	
	goToEnter() {
		const castleEnter = new QQ.Point(0, -23.5);
		this.setAction(
			new QQ.Actions.WalkTo({
				to:    castleEnter,
				onEnd: () => {
					this._player.offend();
					this.disappear();
				}
			})
		);
	}
	
	die() {
		super.die();
		this._player.addScore(1);
		this._world.addSubject(
			new Bones({
				size: new QQ.Size(this._size.x()/1.5),
				app: this._app,
				position: this._position
			})
		);
		this.disappear();
	}
	
};
