game.Effect.Poison = class Poison extends game.Effect.Base {
	
	constructor(app, hp, time = 1) {
		super(app, 'imgs/potionGreen.png', time);
		this._hp = hp;
	}
	
	onStart(info) {
		super.onStart(info);
		this._char.subHp(this._hp);
	}
	
};

