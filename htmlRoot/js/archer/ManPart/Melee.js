class Melee extends ManPart {
	
	constructor(options) {
		options.img = 'manMelee';
		super(options);
	}
	
	shoot(target) {
		c('klac');
	}
	
};
