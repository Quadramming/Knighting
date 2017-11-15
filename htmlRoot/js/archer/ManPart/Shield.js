class Shield extends ManPart {
	
	constructor(options) {
		options.img = 'manShield';
		super(options);
	}
	
	static make(options) {
		const info =[
			{enum: 0, name: '', index: new QQ.Point(0, 0)},
			{enum: 1, name: '', index: new QQ.Point(1, 0)}
		];
		if ( ManPart.fillInfo(info, options) ) {
			return new Shield(options);
		}
		return null;
	}
	
};
