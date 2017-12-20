class Pants extends ManPart {
	
	constructor(options) {
		options.img = 'manPants';
		super(options);
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: '', index: new QQ.Point(0, 0)},
			{enum: 1, name: '', index: new QQ.Point(0, 1)},
			{enum: 2, name: 'white', index: new QQ.Point(0, 2)},
			{enum: 3, name: '', index: new QQ.Point(0, 3)},
			{enum: 4, name: '', index: new QQ.Point(0, 4)},
			{enum: 5, name: '', index: new QQ.Point(0, 5)},
			{enum: 6, name: '', index: new QQ.Point(0, 6)},
			{enum: 7, name: '', index: new QQ.Point(0, 7)}
		];
		ManPart.setEnumForEnemy(options, info);
		if ( ManPart.fillInfo(info, options) ) {
			return new Pants(options);
		}
		return null;
	}
	
};
