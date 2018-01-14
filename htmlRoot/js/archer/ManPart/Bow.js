class stat {
	
	constructor(options) {
		this._text = options.text;
		this._storageText = options.storageText;
		this._begin = options.begin;
		this._end = options.end;
		if ( this._begin > this._end ) {
			this._cmpFn = (a, b) => a < b;
		} else {
			this._cmpFn = (a, b) => a > b;
		}
		this._isLimited = QQ.default(options.isLimited, true);
		this._ico = QQ.Subject.make({
			app: options.app,
			img: options.ico,
			size: new QQ.Point(3),
			anchor: new QQ.Point(0.5, 0.5),
			onClick: (point) => {
				QQ.BubbleText.make({
					world: this._ico.getWorld(),
					text: this._text,
					color: '#FF0000',
					position: point
				});
			}
		});
		this._spendCoin1 = new QQ.Button({
			app: options.app,
			img: 'slotCoin1',
			size: new QQ.Point(3),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: (point) => {
				const world = this._spendCoin1.getWorld();
				/*
				if ( game.subCoins(1) ) {
					const val = this.getRandom();
					this.set(val);
				}
				*/
				if ( game.subCoins(1) ) {
					const val = this.getRandom();
					if ( this._cmpFn(val, this.get()) ) {
						this.set(val);
						QQ.BubbleText.make({
							world: world,
							text: 'success',
							color: '#00FF00',
							position: point
						});
					} else {
						QQ.BubbleText.make({
							world: world,
							text: 'fail',
							color: '#FF0000',
							position: point
						});
					}
				} else {
					QQ.BubbleText.make({
						world: world,
						text: 'no coins',
						color: '#FF0000',
						position: point
					});
				}
			}
		});
		this._spendCoin3 = new QQ.Button({
			app: options.app,
			img: 'slotCoin3',
			size: new QQ.Point(3),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				if ( game.subCoins(3) ) {
					const val = this.getRandom();
					if ( this._cmpFn(val, this.get()) ) {
						this.set(val);
					}
				}
			}
		});
	}
	
	set(v) {
		game.storage(this._storageText, v);
	}
	
	get() {
		return game.getNumberFromStorage(this._storageText, this._begin);
	}
	
	getRandom(lvl = game.getAvailableLevel()) {
		if ( this._isLimited ) {
			return game.limitedRandom(this._begin, this._end, lvl);
		} else {
			return game.getLevelRandom(this._begin, this._end, lvl, {
				round: true, coverage: 100, cap: false
			});
		}
	}
	
	getIco(position) {
		if ( position ) {
			this._ico.setPosition(position);
		}
		return this._ico;
	}
	
	getSpendCoin1(position) {
		if ( position ) {
			this._spendCoin1.setPosition(position);
		}
		return this._spendCoin1;
	}
	
	getSpendCoin3(position) {
		if ( position ) {
			this._spendCoin3.setPosition(position);
		}
		return this._spendCoin3;
	}
	
}

class statBar extends stat {
	
	constructor(options) {
		super(options);
		this._bar = new Bar({
			app: options.app,
			updateOnTick: options.textInfoUpdate
		});
	}
	
	getBar(position) {
		if ( position ) {
			this._bar.setPosition(position);
		}
		return this._bar;
	}
	
	getPercents() {
		const start = this._begin;
		const end = this._end;
		const now = this.get();
		return Math.min(
			(start-now)/(start - end)*100,
			100
		);
	}
	
}

class statNumber extends stat {
	
	constructor(options) {
		super(options);
		this._textInfo = new QQ.Text({
			align: 'center',
			valign: 'middle',
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(10, 2),
			baseLine: 'middle',
			fontSize: 5,
			font: 'KenFuture',
			text: '',
			isClickable: false,
			color: '#6d543a',
			updateOnTick: options.textInfoUpdate
		});
	}
	
	getTextInfo(position) {
		if ( position ) {
			this._textInfo.setPosition(position);
		}
		return this._textInfo;
	}
	
}

class statPenetration extends statNumber {
	
	constructor(options = {}) {
		options.text = 'penetration';
		options.storageText = 'Bow penetration';
		options.begin = 1;
		options.end = 5;
		options.ico = 'statPenetration';
		options.isLimited = false;
		options.textInfoUpdate = function() {
			this.setText(game.stats.penetration.get());
		};
		super(options);
	}
	
}

class statArrows extends statNumber {
	
	constructor(options = {}) {
		options.text = 'arrows';
		options.storageText = 'Bow arrows';
		options.begin = 1;
		options.end = 5;
		options.ico = 'statArrows';
		options.isLimited = false;
		options.textInfoUpdate = function() {
			this.setText(game.stats.arrows.get());
		};
		super(options);
	}
	
}

class statCoolDown extends statBar {
	
	constructor(options = {}) {
		options.text = 'reload';
		options.storageText = 'Bow coolDown';
		options.begin = 1;
		options.end = 0.1;
		options.ico = 'statCoolDown';
		options.isLimited = true;
		options.textInfoUpdate = function() {
			this.setSize(game.stats.coolDown.getPercents());
		};
		super(options);
	}
	
}

class statSpeed extends statBar {
	
	constructor(options = {}) {
		options.text = 'speed';
		options.storageText = 'Bow speed';
		options.begin = 0;
		options.end = 1;
		options.ico = 'statSpeed';
		options.isLimited = true;
		options.textInfoUpdate = function() {
			this.setSize(game.stats.speed.getPercents());
		};
		super(options);
	}
	
}

class statShield extends statBar {
	
	constructor(options = {}) {
		options.text = 'shield';
		options.storageText = 'Bow shield';
		options.begin = 2;
		options.end = 0.5;
		options.ico = 'statShield';
		options.isLimited = true;
		options.textInfoUpdate = function() {
			this.setSize(game.stats.shield.getPercents());
		};
		super(options);
	}
	
}

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
			return;
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
			const arrow = new Arrow({
				app: this._app,
				position: this._owner.localToWorldPoint(new QQ.Point(0, 0)),
				timePerMeter: this._timePerMeter,
				timeFixed: this._timeFixed,
				penetration: this._penetration
			});
			if ( !(this._owner instanceof Enemy) ) {
				battleField.clip(aim);
			}
			arrow.flyTo(aim);
			this._world.addSubject(arrow);
		}
		this._coolDown.rest = 0;
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
