class Boots extends ManPart {
	
	constructor(options) {
		options.img = 'manBoots';
		super(options);
	}
	
	static make(options) {
		const info = [
			{enum: 0, name: 'black', index: new QQ.Point(0, 0)},
			{enum: 1, name: 'brown', index: new QQ.Point(0, 1)},
			{enum: 2, name: 'white', index: new QQ.Point(0, 2)},
			{enum: 3, name: 'gold', index: new QQ.Point(0, 3)},
			{enum: 4, name: 'green', index: new QQ.Point(0, 4)},
			{enum: 5, name: 'red', index: new QQ.Point(0, 5)},
			{enum: 6, name: 'marine', index: new QQ.Point(0, 6)},
			{enum: 7, name: 'purple', index: new QQ.Point(0, 7)},
			{enum: 8, name: 'red2', index: new QQ.Point(0, 8)},
			{enum: 9, name: 'super purple', index: new QQ.Point(0, 9)},
			{enum: 10, name: 'super marine', index: new QQ.Point(0, 10)},
			{enum: 11, name: 'super brown', index: new QQ.Point(0, 11)}
		];
		ManPart.setEnumForEnemy(options, info);
		if ( ManPart.fillInfo(info, options) ) {
			return new Boots(options);
		}
		return null;
	}
	
};
