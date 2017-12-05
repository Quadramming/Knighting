class EnemyManager extends QQ.Container {
	
	constructor(options) {
		options.z = 3;
		super(options);
		this._player = options.player;
		this._duration = 0;
		this._nextEnemy = 0;
		this._level = options.level;
		this._enemiesLeft = 10 * this._level;
	}
	
	getSpawnPoint() {
		return new QQ.Point(
			QQ.Math.rand(-15, 15),
			QQ.Math.rand(22, 22)
		);
	}
	
	getSpeed() {
		return game.getLevelRandom(2, 10, this._level, {cap: false});
	}
	
	getNextEnemy() {
		let rand = game.getLevelRandom(1.5, 0.1, this._level);
		return this._duration + rand;
	}
	
	isShield() {
		return game.getLevelRandom(0, 1, this._level, {
			round: true, coverage: 100, cap: false
		}) === 1;
	}
	
	count() {
		return this._enemiesLeft + this._subjects.length;
	}
	
	tick(delta) {
		super.tick(delta);
		this._duration += delta;
		if ( this._enemiesLeft > 0 && this._nextEnemy < this._duration ) {
			this._nextEnemy = this.getNextEnemy();
			const enemy = new Enemy({
				size: new QQ.Point(5),
				position: this.getSpawnPoint(),
				speed: this.getSpeed(),
				app: this._app,
				player: this._player,
				world: this._world
			});
			enemy.dress(RandomOutfit);
			if ( this.isShield() ) {
				enemy.setShield();
			}
			this.addSubject(enemy);
			--this._enemiesLeft;
		}
		if ( this.count() === 0 ) {
			this._app.setSz('EndGame', {
				isWin: true,
				level: this._level
			}, true);
		}
	}
	
};
