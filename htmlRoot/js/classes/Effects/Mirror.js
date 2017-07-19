game.Effect.Mirror = class Mirror extends game.Effect.Base {
	
	constructor(app, time = 0.5) {
		super(app, 'imgs/mirror.png');
		this._time = time;
	}
	
	onStart(info) {
		super.onStart(info);
		let enemy = this._char.getEnemy();
		let char  = this._char;
		let hpEnemy = enemy.getHp(100);
		let hpChar = char.getHp(100);
		enemy.setHp(hpChar);
		char.setHp(hpEnemy);
	}
	
};

