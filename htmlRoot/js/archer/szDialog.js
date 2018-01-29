class szDialog extends QQ.Seizures.Base {
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		this._world.addSubject( QQ.Subject.make({
			app: this._app,
			img: 'dialog',
			size: new QQ.Point(25, 27),
			anchor: new QQ.Point(0.5, 0.35)
		}));
	}
	
}
