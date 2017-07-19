game.Char = class Char extends QQ.Subject.Sprite {
	
	constructor(app, img, info = {}) {
		super(app, img);
		this._world = app.getSz().getWorld();
		this.setSize(8, 8);
		this._world.addSubject(this);
		
		let defaultInfo = {
			hpMax:          1000, // HP Cap
			hpRegen:        0,    // HP per Second
			armor:          1,
			strength:       10,
			commonHit:      10,
			criticalHit:    10,
			weakHit:        10,
			hitSpeed:       2,    // Hits per second
			accuracy:       2
		};
		
		this._hp            = info.hp || 100;
		delete info.hp;
		this._maxEffects    = info.maxEffects || 3;
		delete info.maxEffects;
		
		this._info          = Object.assign({}, defaultInfo, info);
		this._appliedInfo   = null;
		this._saveInfo      = null;
		this._hpRegenCharge = 0;  // Time without hp regen
		this._hitCharge     = 0;  // Time without hits
		this._hitsReady     = 0;  // Charged hits
		this._isAlive       = true;
		this._effects       = [];
		this._buffArea      = new game.BuffArea(app, this);
		this._fight         = null;
	}
	
	getInfo() {
		return this._info;
	}
	
	getEnemy() {
		return this._fight.getEnemy(this);
	}
	
	setFight(fight) {
		this._fight = fight;
	}
	
	draw() {
		super.draw();
		for ( let effect of this._effects ) {
			effect.draw();
		}
		let ctx          = this._ctx;
		ctx.font         = '50px Ken';
		ctx.textBaseline = 'middle';
		ctx.textAlign    = 'center';
		ctx.fillStyle    = '#006400';
		ctx.fillText(this.getHp(), 0, 200);
	}
	
	setPosition(...args) {
		super.setPosition(...args);
		this._buffArea.calcPosition();
	}
	
	onBeforeFightTick() {
		this._appliedInfo = Object.assign({}, this._info);
		for ( let e of this._effects ) {
			e.apply(this._appliedInfo);
		}
	}
	
	onAfterFightTick() {
	}
	
	fightTick(delta) {
		if ( ! this.isAlive() ) {
			return;
		}
		
		let applied = this._appliedInfo;
		
		for ( let e of this._effects ) {
			e.tick(delta);
		}
		
		this._effects = this._effects.filter( (e) => {
			let isEnd = e.isEnded();
			if ( isEnd ) {
				e.onEnd(this._info);
				this._buffArea.deleteIco(e.getIco());
			}
			return ! isEnd;
		});
		
		this._hpRegenCharge += delta;
		while ( this._hpRegenCharge > 1 ) {
			this.addHp(applied.hpRegen);
			this._hpRegenCharge -= 1;
		}
		
		this._hitCharge += delta;
		let timePerHit = 1 / applied.hitSpeed;
		while ( this._hitCharge > timePerHit ) {
			++this._hitsReady;
			this._hitCharge -= timePerHit;
		}
		
		if ( this.getHp() > applied.hpMax ) {
			this.setHp(applied.hpMax);
		}
	}
	
	getHitsReady() {
		return this._hitsReady;
	}
	
	getMaxEffects() {
		return this._maxEffects;
	}
	
	getHp() {
		return this._hp;
	}
	
	setHp(hp) {
		this._hp = hp;
	}
	
	changeHp(hp) {
		this._hp += hp;
	}
	
	makeHit() {
		let applied = this._appliedInfo;
		if ( this._hitsReady < 1 ) {
			alert('makeHit error');
			return 0;
		}
		--this._hitsReady;
		let dmg = applied.strength;
		dmg     = this.criticalModify(dmg);
		dmg     = dmg - QQ.Math.rand(0, dmg/applied.accuracy, false);
		return dmg;
	}
	
	criticalModify(dmg) {
		let applied = this._appliedInfo;
		let sum  = applied.commonHit + applied.criticalHit + applied.weakHit;
		let r    = QQ.Math.rand(1, sum);
		if ( r <= applied.criticalHit ) { // Crit
			return dmg * 2;
		} if ( r <= applied.criticalHit + applied.weakHit ) { // Weak
			return dmg / 2;
		} else { // Common
			return dmg;
		}
	}
	
	applyEffect(effect) {
		let effects = this._effects.length;
		if ( effects >= this.getMaxEffects() ) {
			return false;
		}
		effect.setChar(this);
		if ( ! this._buffArea.applyIco(effect.getIco()) ) {
			return false;
		}
		this._effects.push(effect);
		effect.onStart(this._info);
		return true;
	}
	
	addHp(hp) {
		let applied = this._appliedInfo;
		hp = Math.round(hp);
		if ( hp === 0 ) {
			return;
		}
		this.changeHp(hp);
		this.bubbleText(hp);
		if ( this.getHp() > applied.hpMax ) {
			this.setHp(applied.hpMax);
		}
	}
	
	subHp(hp) {
		this.sufferHit(hp);
	}
	
	sufferHit(dmg) {
		let applied = this._appliedInfo;
		dmg /= applied.armor;
		dmg = Math.round(dmg);
		if ( dmg === 0 ) {
			return;
		}
		this.changeHp(-dmg);
		this.bubbleText(dmg, 'red');
		if ( this.getHp() <= 0 ) {
			this.die();
		}
	}
	
	bubbleText(text, color = '#006400') {
		let pos = this.getPosition();
		let x = pos.x + QQ.Math.randDispersion(4);
		let y = pos.y + QQ.Math.randDispersion(4);
		new game.BubbleText(this._app, this._world, x, y, text, color);
	}
	
	cleanEffects() {
		this._effects.forEach( (e) => {
			e.onEnd();
			this._buffArea.deleteIco(e.getIco());
		});
		this._effects = [];
	}
	
	onDie() {
	}
	
	isAlive() {
		return this._isAlive;
	}
	
	die() {
		this._isAlive = false;
		this._world.deleteSubject(this);
		this.onDie();
		this.cleanEffects();
	}
	
};
