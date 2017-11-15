class Body extends ManPart {
	
	constructor(options) {
		options.img = 'manBody';
		super(options);
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: 'man', index: new QQ.Point(0, 0)},
			{enum: 1, name: 'orc', index: new QQ.Point(0, 3)}
		];
		if ( ManPart.fillInfo(info, options) ) {
			return new Body(options);
		}
		return null;
	}
	
};
