class Pants extends ManPart {
	
	constructor(options) {
		options.img = 'manPants';
		super(options);
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: '', index: new QQ.Point(0, 0)},
			{enum: 1, name: '', index: new QQ.Point(0, 1)}
		];
		if ( ManPart.fillInfo(info, options) ) {
			return new Pants(options);
		}
		return null;
	}
	
};
