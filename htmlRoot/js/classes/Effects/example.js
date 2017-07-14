game.Effect.NAME = class NAME extends game.Effect.Base {
	
	constructor(app, time = 1) {
		super(app, 'imgs/potionRed.png');
		this._time = time;
	}
	
	tick(delta) {
		super.tick(delta);
	}
	
	apply(appliedInfo) {
		super.apply(appliedInfo);
	}
	
	onStart(info) {
		super.onStart(info);
	}
	
	isEnded() {
		return this._duration >= this._time;
	}
	
	onEnd(info) {
		super.onEnd(info);
	}
	
};

