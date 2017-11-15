QQ.Actions.Stun = class Stun extends QQ.Actions.Base {
	
	constructor(options) {
		options.isAbortable = false;
		options.isRestoreOnFinish = true;
		super(options);
		this._starsAmount = 3;
		this._stars = [];
		const subjSize = this._subj.getSize();
		this._size = new QQ.Point(
			subjSize.x() * 0.3,
			subjSize.y() * 0.3
		);
	}
	
	onStart() {
		for ( let i = 0; i < this._starsAmount; ++i ) {
			this._stars[i] = QQ.Subject.make({
				isActionable: true,
				anchor: new QQ.Point(0.5),
				position: new QQ.Point(-this._size.x() + this._size.x()*i, -2),
				size: this._size,
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
