class Hat extends ManPart {
	
	constructor(options) {
		options.img = 'manHat';
		super(options);
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: '', index: new QQ.Point(0, 0)},
			{enum: 1, name: '', index: new QQ.Point(0, 1)}
		];
		if ( ManPart.fillInfo(info, options) ) {
			return new Hat(options);
		}
		return null;
	}
	
};
