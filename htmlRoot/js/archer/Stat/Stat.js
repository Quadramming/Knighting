class Stat {
	
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
		this._spendCoinOne = new QQ.Button({
			app: options.app,
			img: 'slotCoinOne',
			size: new QQ.Point(3),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: (point) => {
				const world = this._spendCoinOne.getWorld();
				if ( game.subCoins(1) ) {
					game.playSound('throw');
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
		this._spendCoinAll = new QQ.Button({
			app: options.app,
			img: 'slotCoinAll',
			size: new QQ.Point(3),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: (point) => {
				point.add(new QQ.Point(0, -5*1.5));
				for ( let i = 0; i < 10; ++i ) {
					point.add(new QQ.Point(0, 1.5));
					this._spendCoinOne.onClick(point);
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
	
	getSpendCoinOne(position) {
		if ( position ) {
			this._spendCoinOne.setPosition(position);
		}
		return this._spendCoinOne;
	}
	
	getSpendCoinAll(position) {
		if ( position ) {
			this._spendCoinAll.setPosition(position);
		}
		return this._spendCoinAll;
	}
	
}
