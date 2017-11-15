class Melee extends ManPart {
	
	constructor(options) {
		options.img = 'manMelee';
		super(options);
	}
	
	shoot(target) {
		c('klac');
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
			return new Melee(options);
		}
		return null;
	}
	
};
