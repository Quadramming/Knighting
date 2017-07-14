game.Fight = class Fight extends QQ.Subject.Base {
	
	constructor(app, fighterA, fighterB) {
		super(app);
		this._fighterA = fighterA;
		this._fighterB = fighterB;
	}
	
	tick(delta) {
		this.forFighters( f => f.onBeforeFightTick() );
		this.forFighters( f => f.fightTick(delta) );
		
		if ( ! this.isBothAlive() ) {
			return;
		}
		
		let hits = this._fighterB.getHitsReady();
		for ( ; hits > 0; --hits ) {
			this._fighterA.sufferHit( this._fighterB.makeHit() );
		}
		
		if ( ! this.isBothAlive() ) {
			return;
		}
		hits = this._fighterA.getHitsReady();
		for ( ; hits > 0; --hits ) {
			this._fighterB.sufferHit( this._fighterA.makeHit() );
		}
		this.forFighters( f => f.onAfterFightTick() );
	}
	
	forFighters(fn) {
		fn(this._fighterA);
		fn(this._fighterB);
	}
	
	isBothAlive() {
		return this._fighterA.isAlive() && this._fighterB.isAlive();
	}
	
	isClickable() {
		return false;
	}
	
};
