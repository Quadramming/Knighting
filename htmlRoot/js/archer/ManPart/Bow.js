class Bow extends ManPart {
	
	constructor(options) {
		options.img = 'manBow';
		super(options);
		this._coolDown = 0.2;
		this._coolDownCurrent = this._coolDown;
		this._coolDownWidth = 5;
		this._coolDownBar = QQ.Subject.make({
			img: 'redBar',
			app: this._app,
			anchor: new QQ.Point(0.5, 0.5),
			position: new QQ.Point(0, -1.5),
			size: new QQ.Size(this._coolDownWidth, 0.5)
		});
		this._owner.addSubject(this._coolDownBar);
	}
	
	tick(delta) {
		this._coolDownCurrent += delta;
		const CDLeft = Math.max(this._coolDown - this._coolDownCurrent, 0);
		const x = CDLeft / this._coolDown;
		this._coolDownBar.setSize(new QQ.Size(
			this._coolDownWidth*x, this._coolDownBar.getSize().y()
		));
		super.tick(delta);
	}
	
	shoot(target) {
		if ( ! this._isCanShoot() ) {
			return;
		}
		const arrow = new Arrow({
			app: this._app,
			position: this._owner.localToWorldPoint(new QQ.Point(0, 0))
		});
		arrow.flyTo(target);
		this._world.addSubject(arrow);
		this._app.playSound('arrow');
		this._coolDownCurrent = 0;
	}
	
	_isCanShoot() {
		if ( this._coolDownCurrent < this._coolDown ) {
			return false;
		}
		return true;
	}
	
};
