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
		this._arrows = QQ.default(options.arrows, 1);
		this._timePerMeter = QQ.default(options.timePerMeter, 0.04);
		this._timeFixed = QQ.default(options.timeFixed, 0.4);
		if ( this._coolDown.show ) {
			this.initCoolDownObj();
		}
		this._penetration = QQ.default(options.penetration, 1);
	}
	
	getPenetration() {
		return this._penetration;
	}
	
	initCoolDownObj() {
		this._coolDown.obj = QQ.Subject.make({
			img: 'redBar',
			app: this._app,
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(0, 0.5)
		});
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
	
	tickCoolDown(delta) {
		this._coolDown.rest += delta;
		const CDLeft = Math.max(this._coolDown.time - this._coolDown.rest, 0);
		const x = CDLeft / this._coolDown.time;
		if ( this._coolDown.obj ) {
			this._coolDown.obj.setSize(new QQ.Size(
				this._coolDown.width*x,
				this._coolDown.obj.getSize().y()
			));
			this._coolDown.obj.setPosition(this._owner.getWorldPosition());
			this._coolDown.obj.addPosition(this._coolDown.offset);
		}
	}
	
	tick(delta) {
		this.tickCoolDown(delta);
		super.tick(delta);
	}
	
	shoot(target) {
		if ( ! this._isCanShoot() ) {
			return false;
		}
		const battleField = this._world.getSubjects(
			(subj) => subj instanceof BattleField
		).pop();
		for ( let i = 0; i < this._arrows; ++i ) {
			const aim = target.clone();
			if ( i !== 0 ) {
				aim.add( new QQ.Point(
					5 - QQ.Math.rand(0, 10, false),
					5 - QQ.Math.rand(0, 10, false)
				) );
			}
			
			const arrow = game.getArrowsPool().get({
				position: this._owner.localToWorldPoint(new QQ.Point(0, 0)),
				timePerMeter: this._timePerMeter,
				timeFixed: this._timeFixed,
				penetration: this._penetration
			});
			
			if ( !(this._owner instanceof Enemy) ) {
				battleField.clip(aim);
			}
			arrow.flyTo(aim);
			const container = this._world.getSubjects(
				(s) => s instanceof ArrowsContainer
			)[0];
			container.addSubject(arrow);
		}
		this._coolDown.rest = 0;
		return true;
	}
	
	_isCanShoot() {
		if ( this._coolDown.rest < this._coolDown.time ) {
			return false;
		}
		return true;
	}
	
	static make(options) {
		options.speed = QQ.default(options.speed, 0);
		const info = [
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
		ManPart.setEnumForEnemy(options, info);
		if ( ManPart.fillInfo(info, options) ) {
			options.timePerMeter = 0.04 - (0.04-0.0025)*options.speed;
			options.timeFixed = 0.4 - (0.04-0.025)*options.speed;
			options.coolDown = QQ.default(options.coolDown, 0.5);
			options.arrows = QQ.default(options.arrows, 1);
			options.penetration = QQ.default(options.penetration, 1);
			return new Bow(options);
		}
		return null;
	}
	
};
