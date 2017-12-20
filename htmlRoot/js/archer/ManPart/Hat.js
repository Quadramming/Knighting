class Hat extends ManPart {
	
	constructor(options) {
		options.img = 'manHat';
		super(options);
	}
	
	static make(options) {
		const info = [
			{enum: 0, name: '', index: new QQ.Point(0, 0)},
			{enum: 1, name: '', index: new QQ.Point(1, 0)},
			{enum: 2, name: '', index: new QQ.Point(2, 0)},
			{enum: 3, name: '', index: new QQ.Point(3, 0)},
			{enum: 4, name: '', index: new QQ.Point(0, 1)},
			{enum: 5, name: '', index: new QQ.Point(1, 1)},
			{enum: 6, name: '', index: new QQ.Point(2, 1)},
			{enum: 7, name: '', index: new QQ.Point(3, 1)},
			{enum: 8, name: '', index: new QQ.Point(0, 2)},
			{enum: 9, name: '', index: new QQ.Point(1, 2)},
			{enum: 10, name: '', index: new QQ.Point(2, 2)},
			{enum: 11, name: '', index: new QQ.Point(3, 2)},
			{enum: 12, name: '', index: new QQ.Point(0, 3)},
			{enum: 13, name: '', index: new QQ.Point(1, 3)},
			{enum: 14, name: '', index: new QQ.Point(2, 3)},
			{enum: 15, name: '', index: new QQ.Point(3, 3)},
			{enum: 16, name: '', index: new QQ.Point(0, 4)},
			{enum: 17, name: '', index: new QQ.Point(1, 4)},
			{enum: 18, name: '', index: new QQ.Point(2, 4)},
			{enum: 19, name: '', index: new QQ.Point(3, 4)},
			{enum: 20, name: '', index: new QQ.Point(0, 5)},
			{enum: 21, name: '', index: new QQ.Point(1, 5)},
			{enum: 22, name: '', index: new QQ.Point(2, 5)},
			{enum: 23, name: '', index: new QQ.Point(3, 5)},
			{enum: 24, name: '', index: new QQ.Point(0, 6)},
			{enum: 25, name: '', index: new QQ.Point(1, 6)},
			{enum: 26, name: '', index: new QQ.Point(2, 6)},
			{enum: 27, name: '', index: new QQ.Point(3, 6)}
		];
		ManPart.setEnumForEnemy(options, info);
		if ( ManPart.fillInfo(info, options) ) {
			return new Hat(options);
		}
		return null;
	}
	
};
