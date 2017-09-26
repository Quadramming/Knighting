QQ.Actions.WalkTo = class WalkTo extends QQ.Actions.Base {
	
	constructor(app, options) {
		super(app, options);
		this._to = options.to;
	}
	
	setTarget(to) {
		this._to = to;
	}
	
	getTarget() {
		return this._to;
	}
	
	tick(delta) {
		let walked = this._subj.getSpeed()*delta;
		let from   = this._subj.getPosition();
		let to     = this._to;
		let A      = to.y - from.y;
		let B      = to.x - from.x;
		let C      = Math.sqrt(A*A+B*B);
		let sin    = A/C;
		let cos    = B/C;
		let b      = sin*walked;
		let a      = cos*walked;
		if ( walked < C ) {
			this._subj.addPosition(a, b);
		} else {
			this._subj.setPosition(to.x, to.y);
			this.finishAction();
		}
	}
	
};
