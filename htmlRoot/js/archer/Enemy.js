class Enemy extends Man {
	
	constructor(app, options = {}) {
		options.x     = QQ.default(options.x, Enemy.getSpawnPositionX());
		options.y     = QQ.default(options.y, Enemy.getSpawnPositionY());
		options.speed = QQ.default(options.speed, 2);
		options.z     = 3;
		super(app, options);
		this._pointsAmount = 5;
		this._points       = [];
		this.initStraightEnemy();
		this.doNextPoint();
	}
	
	static getSpawnPositionX() {
		return QQ.Math.rand(-15, 15);
	}
	
	static getSpawnPositionY() {
		return QQ.Math.rand(-22, -22);
	}
	
	fillPoints() {
		for ( let i = 0; i < this._pointsAmount; ++i ) {
			this._points.push({
				x: QQ.Math.rand(-15, 15),
				y: QQ.Math.rand(-18, 13.5)
			});
		}
	}
	
	tick(delta) {
		super.tick(delta);
		if ( QQ.Math.rand(0, 500) === 1 ) {
			this.shoot(QQ.Math.rand(-15, 15), 18.5);
		}
		//
	}
	
	initChaoticEnemy() {
		this.fillPoints();
	}
	
	initStraightEnemy() {
		this.initChaoticEnemy();
		this._points.sort((a, b) => b.y - a.y);
	}
	
	doNextPoint() {
		if ( this._points.length > 0 ) {
			let point = this._points.pop();
			this.goToPoint(point);
		} else {
			this.goToEnter();
		}
	}
	
	goToPoint(point) {
		this.setAction(
			new QQ.Actions.WalkTo(this._app, {
				subj: this,
				to:   point,
				onEnd: () => this.doNextPoint()
			})
		);
	}
	
	goToEnter() {
		let castleEnter = {x: 0, y: 13.5};
		this.setAction(
			new QQ.Actions.WalkTo(this._app, {
				subj: this,
				to:   castleEnter,
				onEnd: () => this.disapear()
			})
		);
	}
	
};
