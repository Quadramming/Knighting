const game = {
	seizures: {},
	
	_app: null,
	
	setApp(app) {
		this._app = app;
	},
	
	storage(...args) {
		return this._app.storage(...args);
	},
	
	getNumberFromStorage(text, init = 0) {
		let n = this.storage(text);
		if ( n === null ) {
			this.storage(text, init);
			n = init;
		}
		return Number(n);
		
		return this._app.storage(...args);
	},
	
	getAvailableLevel() {
		let storageLevel = this._app.storage('Available level');
		if ( storageLevel === null ) {
			storageLevel = 1;
			this._app.storage('Available level', storageLevel);
		}
		return Number(storageLevel);
	},
	
	winLevel(level) {
		const availableLevel = game.getAvailableLevel();
		if ( level === availableLevel ) {
			this._app.storage('Available level', availableLevel+1);
		}
	},
	
	getLevelRandom(a, b, level, options = {}) {
		const cap = QQ.default(options.cap, true);
		const maxLevel = QQ.default(options.maxLevel, 100);
		const coverage = QQ.default(options.coverage, 75);
		const lvlPercent = level/maxLevel;
		const round = QQ.default(options.round, false);
		
		const diff = Math.abs(b-a);
		const interval = (diff/100) * coverage * Math.random();
		const rnd = QQ.Math.rand(0, interval, false) - interval/2;

		let center;
		if ( a < b ) {
			center = a + diff*lvlPercent;
		} else {
			center = a - diff*lvlPercent;
		}
		
		let result = center + rnd;
		
		if ( a < b ) {
			if ( result < a ) {
				result = a;
			}
			if ( result > b && cap ) {
				result = b;
			}
		} else {
			if ( result < b && cap ) {
				result = b;
			}
			if ( result > a  ) {
				result = a;
			}
		}
		if ( round ) {
			result = Math.round(result);
		}
		return result;
	},
	
	limitedRandom(a, b, level) {
		return game.getLevelRandom(
			a, b, Math.min(100, level),
			{maxLevel: 200, coverage: 100}
		);
	},
	
	getCoins() {
		let coins = this._app.storage('coins');
		if ( coins === null ) {
			this._app.storage('coins', 0);
			coins = 0;
		}
		return Number(coins);
	},
	
	addCoins(n) {
		let coins = this.getCoins();
		coins += n;
		this._app.storage('coins', coins);
	},
	
	subCoins(n) {
		let coins = this.getCoins();
		coins -= n;
		if ( coins < 0 ) {
			return false;
		}
		this._app.storage('coins', coins);
		return true;
	}
	
};
