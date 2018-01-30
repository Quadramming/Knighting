class EnemyManager extends QQ.Container {
	
	constructor(options) {
		options.z = 3;
		super(options);
		this._player = options.player;
		this._duration = 0;
		this._nextEnemy = 0;
		this._level = options.level;
		this._enemiesLeft = this.calcEnemiesLeft(this._level);
		this._waveText = new QQ.StyledText('wave: ' + this._enemiesLeft, 'score');
		this._world.addSubject(this._waveText);
	}
	
	calcEnemiesLeft(lvl) {
		//return 1;
		return Math.round( Math.exp(2.5725 + 0.0465*lvl) );
	}
	
	getSpawnPoint() {
		return new QQ.Point(
			QQ.Math.rand(-15, 15),
			QQ.Math.rand(22, 22)
		);
	}
	
	getWayPoints() {
		return game.getLevelRandom(0, 10, this._level, {
			round: true
		});
	}
	
	getSpeed() {
		return game.getLevelRandom(2, 10, this._level, {cap: false});
	}
	
	getNextEnemy() {
		let rand = game.getLevelRandom(1.5, 0.1, this._level, {cap: false});
		rand = Math.max(rand, 0);
		return this._duration + rand;
	}
	
	isShield() {
		return game.getLevelRandom(0, 1, this._level, {
			round: true, coverage: 100, cap: false
		}) >= 1;
	}
	
	isBow() {
		return game.getLevelRandom(0, 1, this._level, {
			round: true, coverage: 100, cap: false
		}) >= 1;
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
				level: this._level,
				size: new QQ.Point(5),
				position: this.getSpawnPoint(),
				speed: this.getSpeed(),
				app: this._app,
				player: this._player,
				world: this._world,
				wayPoints: this.getWayPoints()
			});
			enemy.dress(LevelsOutfit);
			if ( this.isShield() ) {
				enemy.setShield({level: this._level});
			}
			if ( this.isBow() ) {
				enemy.setBow({
					level: this._level
				});
			}
			this.addSubject(enemy);
			--this._enemiesLeft;
		}
		const count = this.count();
		this._waveText.setText('wave: ' + count);
		if ( count === 0 ) {
			this._app.setSz('EndGame', {
				isWin: true,
				level: this._level
			}, true);
		}
	}
	
};
