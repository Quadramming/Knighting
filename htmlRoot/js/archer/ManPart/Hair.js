class Hair extends ManPart {
	
	constructor(options) {
		options.img = 'manHair';
		super(options);
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: '', index: new QQ.Point(0, 1)},
			{enum: 1, name: '', index: new QQ.Point(0, 1)}
		];
		if ( ManPart.fillInfo(info, options) ) {
			return new Hair(options);
		}
		return null;
	}
	
};
