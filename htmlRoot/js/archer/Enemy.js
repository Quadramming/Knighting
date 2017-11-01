class Enemy extends Man {
	
	constructor(options) {
		if ( ! options.position ) {
			options.position = new QQ.Point(
				Enemy.getSpawnPositionX(),
				Enemy.getSpawnPositionY()
			);
		}
		options.speed = QQ.default(options.speed, 2);
		super(options);
		this._pointsAmount = 5;
		this._points       = [];
		this.initStraightEnemy();
		this.doNextPoint();
	}
	
	static getSpawnPositionX() {
		return QQ.Math.rand(-15, 15);
	}
	
	static getSpawnPositionY() {
		return QQ.Math.rand(22, 22);
	}
	
	fillPoints() {
		for ( let i = 0; i < this._pointsAmount; ++i ) {
			this._points.push(new QQ.Point(
				QQ.Math.rand(-15, 15),
				QQ.Math.rand(-13, 18)
			));
		}
	}
	
	tick(delta) {
		super.tick(delta);
		if ( QQ.Math.rand(0, 400) === 0 ) {
			this.shoot(new QQ.Point(QQ.Math.rand(-15, 15), -18));
		}
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
		const castleEnter = new QQ.Point(0, -13);
		this.setAction(
			new QQ.Actions.WalkTo({
				to:    castleEnter,
				onEnd: () => this.disapear()
			})
		);
	}
	
};
