game.Effect.HP = class HP extends game.Effect.Base {
	
	constructor(app, hp, time = 1) {
		super(app, 'imgs/potion.png');
		this._hp   = hp;
		this._time = time;
	}
	
	tick(delta) {
		super.tick(delta);
		this._char.addHp(1);
	}
	
	onStart() {
		super.onStart();
		this._char.addHp(this._hp);
	}
	
	isEnded() {
		return this._duration >= this._time;
	}
	
	onEnd() {
		super.onEnd();
		this._char.addHp(this._hp);
	}
	
};
