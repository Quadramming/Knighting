game.Char = class Char extends QQ.Subject.Sprite {
	
	constructor(app, img) {
		super(app, img);
		this._world = app.getSz().getWorld();
		this.setSize(8, 8);
		this._world.addSubject(this);
		
		this._effects       = [];
		this._maxEffects    = 5;
		this._isAlive       = true;
		this._hp            = 100;  // HP
		this._hpMax         = 1000; // HP Cap
		this._hpRegen       = 1;    // HP per Second
		this._hpRegenCharge = 0;    // Time without hp regen
		this._armor         = 100;
		this._strength      = 10;
		this._commonHit     = 10;
		this._criticalHit   = 10;
		this._weakHit       = 10;
		this._hitCharge     = 0;    // Time without hits
		this._hitsReady     = 0;    // Charger hits
		this._hitSpeed      = 2;    // Hits per second
		this._accuracy      = 2;
		this._buffArea      = new game.BuffArea(app, this);
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
		ctx.fillText(this._hp, 0, 200);
	}
	
	setPosition(...args) {
		super.setPosition(...args);
		this._buffArea.calcPosition();
	}
	
	tick(delta) {
		super.tick(delta);
		
		for ( let e of this._effects ) {
			e.tick(delta);
		}
		
		this._effects = this._effects.filter( (e) => {
			let isEnd = e.isEnded();
			if ( isEnd ) {
				e.onEnd();
				this._buffArea.deleteIco(e.getIco());
			}
			return ! isEnd;
		});
		
		this._hpRegenCharge += delta;
		while ( this._hpRegenCharge > 1 ) {
			this.addHp(this._hpRegen);
			this._hpRegenCharge -= 1;
		}
		
		this._hitCharge += delta;
		let timePerHit = 1/this._hitSpeed;
		while ( this._hitCharge > timePerHit ) {
			++this._hitsReady;
			this._hitCharge -= timePerHit;
		}
		
		if ( this._hp > this._hpMax ) {
			this._hp = this._hpMax;
		}
	}
	
	getHitsReady() {
		return this._hitsReady;
	}
	
	getMaxEffects() {
		return this._maxEffects;
	}
	
	makeHit() {
		if ( this._hitsReady < 1 ) {
			alert('makeHit error');
			return 0;
		}
		--this._hitsReady;
		let dmg = this._strength;
		dmg = this.criticalModify(dmg);
		dmg = dmg - QQ.Math.rand(0, dmg*1/this._accuracy, false);
		return dmg;
	}
	
	criticalModify(dmg) {
		let sum = this._commonHit + this._criticalHit + this._weakHit;
		let r = QQ.Math.rand(1, sum);
		if ( r <= this._criticalHit ) { // Crit
			return dmg*2;
		} if ( r <= this._criticalHit + this._weakHit ) { // Weak
			return dmg/2;
		} else { // Common
			return dmg;
		}
	}
	
	sufferHit(dmg) {
		dmg = Math.round(dmg);
		this._hp -= dmg;
		this.bubbleText(dmg, 'red');
		if ( this._hp <= 0 ) {
			this.die();
		}
	}
	
	applyEffect(effect) {
		let effects = this._effects.length;
		if ( effects >= this._maxEffects ) {
			return false;
		}
		effect.setChar(this);
		if ( ! this._buffArea.applyIco(effect.getIco()) ) {
			return false;
		}
		effect.onStart();
		this._effects.push(effect);
		return true;
	}
	
	addHp(hp) {
		hp        = Math.round(hp); 
		this._hp += hp;
		this.bubbleText(hp);
	}
	
	bubbleText(text, color = '#006400') {
		let pos = this.getPosition();
		let x = pos.x + QQ.Math.randDispersion(4);
		let y = pos.y + QQ.Math.randDispersion(4);
		new game.BubbleText(this._app, this._world, x, y, text, color);
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
	}
	
};
