QQ.Actions.Stun = class Stun extends QQ.Actions.Base {
	
	constructor(options) {
		options.isAbortable       = false;
		options.isRestoreOnFinish = true;
		super(options);
		this._starsAmount = 3;
		this._stars = [];
	}
	
	onStart() {
		for ( let i = 0; i < this._starsAmount; ++i ) {
			this._stars[i] = QQ.Subject.make({
				isActionable: true,
				position: new QQ.Point(i-1.5, -1.5),
				app: this._app,
				img: 'star',
				z: 10
			});
			this._stars[i].setAction(new QQ.Actions.Shake({
				subj: this._stars[i],
				dispersion: new QQ.Point(0, 0.8),
				period: 1+i
			}));
			this._subj.addSubject(this._stars[i]);
		}
	}
	
	onEnd() {
		for ( let i = 0; i < this._starsAmount; ++i ) {
			this._stars[i].deleteMe();
		}
	}
	
};
