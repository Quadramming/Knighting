class EnemyManager extends QQ.Container {
	
	constructor(options) {
		options.z = 3;
		super(options);
		this._player = options.player;
		this._duration = 0;
		this._nextEnemy = 0;
		this._difficulty = 1;
	}
	
	getSpawnPoint() {
		return new QQ.Point(
			QQ.Math.rand(-15, 15),
			QQ.Math.rand(22, 22)
		);
	}
	
	getSpeed() {
		return 1 + this._difficulty/10;
	}
	
	getNextEnemy() {
		return this._duration + 1/((100+this._difficulty)/100);
	}
	
	tick(delta) {
		super.tick(delta);
		this._duration += delta;
		this._difficulty = Math.floor(1 + this._duration/2);
		if ( this._nextEnemy < this._duration ) {
			this._nextEnemy = this.getNextEnemy();
			this.addSubject(new Enemy({
				position: this.getSpawnPoint(),
				speed: this.getSpeed(),
				app: this._app,
				player: this._player
			}));
		}
	}
	
};
