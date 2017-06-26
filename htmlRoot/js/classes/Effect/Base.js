game.Effect = {};

game.Effect.Base = class Base {
	
	constructor(app, img) {
		this._app      = app;
		this._ctx      = this._app.getContext();
		this._duration = 0;
		this._char     = null;
		this._ico      = new game.Effect.EffectIco(app, img);
		this._world    = app.getSz().getWorld();
	}
	
	getIco() {
		return this._ico;
	}
	
	setChar(char) {
		this._char = char;
	}
	
	onStart() {
		this._world.addSubject(this._ico);
	}
	
	tick(delta) {
		this._duration += delta;
	}
	
	draw() {
	}
	
	isEnded() {
		return false;
	}
	
	onEnd() {
		this._world.deleteSubject(this._ico);
	}
	
};