game.Effect.ReduceDamage = class ReduceDamage extends game.Effect.Base {
	
	constructor(app, time = 1) {
		super(app, 'imgs/potionBlue.png', time);
	}
	
	apply(appliedInfo) {
		super.apply(appliedInfo);
		appliedInfo.strength /= 3;
	}
	
};
