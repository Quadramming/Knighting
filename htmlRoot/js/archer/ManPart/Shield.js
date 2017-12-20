class Shield extends ManPart {
	
	constructor(options) {
		options.img = 'manShield';
		super(options);
	}
	
	static make(options) {
		const info =[
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
			{enum: 10, name: '', index: new QQ.Point(4, 0)},
			{enum: 11, name: '', index: new QQ.Point(5, 0)},
			{enum: 12, name: '', index: new QQ.Point(6, 0)},
			{enum: 13, name: '', index: new QQ.Point(7, 0)},
			{enum: 14, name: '', index: new QQ.Point(4, 1)},
			{enum: 15, name: '', index: new QQ.Point(5, 1)},
			{enum: 16, name: '', index: new QQ.Point(6, 1)},
			{enum: 17, name: '', index: new QQ.Point(7, 1)},
			{enum: 18, name: '', index: new QQ.Point(4, 2)},
			{enum: 19, name: '', index: new QQ.Point(5, 2)},
			{enum: 20, name: '', index: new QQ.Point(0, 3)},
			{enum: 21, name: '', index: new QQ.Point(1, 3)},
			{enum: 22, name: '', index: new QQ.Point(2, 3)},
			{enum: 23, name: '', index: new QQ.Point(3, 3)},
			{enum: 24, name: '', index: new QQ.Point(0, 4)},
			{enum: 25, name: '', index: new QQ.Point(1, 4)},
			{enum: 26, name: '', index: new QQ.Point(2, 4)},
			{enum: 27, name: '', index: new QQ.Point(3, 4)},
			{enum: 28, name: '', index: new QQ.Point(0, 5)},
			{enum: 29, name: '', index: new QQ.Point(1, 5)},
			{enum: 30, name: '', index: new QQ.Point(4, 3)},
			{enum: 31, name: '', index: new QQ.Point(5, 3)},
			{enum: 32, name: '', index: new QQ.Point(6, 3)},
			{enum: 33, name: '', index: new QQ.Point(7, 3)},
			{enum: 34, name: '', index: new QQ.Point(4, 4)},
			{enum: 35, name: '', index: new QQ.Point(5, 4)},
			{enum: 36, name: '', index: new QQ.Point(6, 4)},
			{enum: 37, name: '', index: new QQ.Point(7, 4)},
			{enum: 38, name: '', index: new QQ.Point(4, 5)},
			{enum: 39, name: '', index: new QQ.Point(5, 5)},
			{enum: 40, name: '', index: new QQ.Point(0, 6)},
			{enum: 41, name: '', index: new QQ.Point(1, 6)},
			{enum: 42, name: '', index: new QQ.Point(2, 6)},
			{enum: 43, name: '', index: new QQ.Point(3, 6)},
			{enum: 44, name: '', index: new QQ.Point(0, 7)},
			{enum: 45, name: '', index: new QQ.Point(1, 7)},
			{enum: 46, name: '', index: new QQ.Point(2, 7)},
			{enum: 47, name: '', index: new QQ.Point(3, 7)},
			{enum: 48, name: '', index: new QQ.Point(0, 8)},
			{enum: 49, name: '', index: new QQ.Point(1, 8)},
			{enum: 50, name: '', index: new QQ.Point(0, 6)},
			{enum: 51, name: '', index: new QQ.Point(1, 6)},
			{enum: 52, name: '', index: new QQ.Point(2, 6)},
			{enum: 53, name: '', index: new QQ.Point(3, 6)},
			{enum: 54, name: '', index: new QQ.Point(0, 7)},
			{enum: 55, name: '', index: new QQ.Point(1, 7)},
			{enum: 56, name: '', index: new QQ.Point(2, 7)},
			{enum: 57, name: '', index: new QQ.Point(3, 7)},
			{enum: 58, name: '', index: new QQ.Point(0, 8)},
			{enum: 59, name: '', index: new QQ.Point(1, 8)}
		];
		ManPart.setEnumForEnemy(options, info);
		if ( ManPart.fillInfo(info, options) ) {
			return new Shield(options);
		}
		return null;
	}
	
};
