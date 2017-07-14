game.Effect.HP = class HP extends game.Effect.Base {
	
	constructor(app, hp, time = 1) {
		super(app, 'imgs/potionRed.png', time);
		this._hp = hp;
	}
	
	onStart(info) {
		super.onStart(info);
		this._char.addHp(this._hp);
	}
	
};

