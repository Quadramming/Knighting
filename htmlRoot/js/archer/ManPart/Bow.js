class Bow extends ManPart {
	
	constructor(options) {
		options.img = 'manBow';
		super(options);
		this._coolDown = {
			offset: new QQ.Point(0, -2),
			time: QQ.default(options.coolDown, 1),
			rest: QQ.default(options.coolDown, 1),
			width: 5,
			obj: null,
			show: QQ.default(options.showCoolDown, false)
		};
		if ( this._coolDown.show ) {
			this.initCoolDownObj();
		}
	}
	
	initCoolDownObj() {
		this._coolDown.obj = QQ.Subject.make({
			img: 'redBar',
			app: this._app,
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(this._coolDown.width, 0.5)
		});
		this.updateCoolDownPosition();
	}
	
	drawCoolDown(ctx) {
		if ( this._coolDown.obj ) {
			this._coolDown.obj.draw(ctx);
		}
	}
	
	draw(ctx) {
		this.drawCoolDown(ctx);
		super.draw(ctx);
	}
	
	updateCoolDownPosition() {
		this._coolDown.obj.setPosition(this._owner.getWorldPosition());
		this._coolDown.obj.addPosition(this._coolDown.offset);
	}
	
	tickCoolDown(delta) {
		this._coolDown.rest += delta;
		const CDLeft = Math.max(this._coolDown.time - this._coolDown.rest, 0);
		const x = CDLeft / this._coolDown.time;
		if ( this._coolDown.obj ) {
			this._coolDown.obj.setSize(new QQ.Size(
				this._coolDown.width*x,
				this._coolDown.obj.getSize().y()
			));
			this.updateCoolDownPosition();
		}
	}
	
	tick(delta) {
		this.tickCoolDown(delta);
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
		this._coolDown.rest = 0;
	}
	
	_isCanShoot() {
		if ( this._coolDown.rest < this._coolDown.time ) {
			return false;
		}
		return true;
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: '', index: new QQ.Point(0, 0)},
			{enum: 1, name: '', index: new QQ.Point(0, 1)},
			{enum: 2, name: '', index: new QQ.Point(1, 0)},
			{enum: 3, name: '', index: new QQ.Point(1, 2)},
			{enum: 4, name: '', index: new QQ.Point(1, 1)},
			{enum: 5, name: '', index: new QQ.Point(0, 2)},
			{enum: 6, name: '', index: new QQ.Point(0, 3)},
			{enum: 7, name: '', index: new QQ.Point(1, 3)},
			{enum: 8, name: '', index: new QQ.Point(0, 4)},
			{enum: 9, name: '', index: new QQ.Point(1, 4)}
		];
		if ( ManPart.fillInfo(info, options) ) {
			return new Bow(options);
		}
		return null;
	}
	
};
