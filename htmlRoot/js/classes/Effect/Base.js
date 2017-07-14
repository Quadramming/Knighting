game.Effect = {};

game.Effect.Base = class Base {
	
	constructor(app, img, time = 1) {
		this._app      = app;
		this._ctx      = this._app.getContext();
		this._duration = 0;
		this._char     = null;
		this._ico      = new game.Effect.EffectIco(app, img);
		this._world    = app.getSz().getWorld();
		this._time     = time;
	}
	
	getIco() {
		return this._ico;
	}
	
	setChar(char) {
		this._char = char;
	}
	
	onStart(info) {
		this._world.addSubject(this._ico);
	}
	
	tick(delta) {
		this._duration += delta;
	}
	
	apply(appliedInfo) {
	}
	
	draw() {
	}
	
	isEnded() {
		return this._duration >= this._time;
	}
	
	onEnd(info) {
		this._world.deleteSubject(this._ico);
	}
	
};