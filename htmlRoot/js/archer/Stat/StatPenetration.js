class StatPenetration extends StatNumber {
	
	constructor(options = {}) {
		options.text = 'penetration';
		options.storageText = 'Bow penetration';
		options.begin = 1;
		options.end = 5;
		options.ico = 'statPenetration';
		options.isLimited = false;
		options.textInfoUpdate = function() {
			this.setText(game.stats.penetration.get());
		};
		super(options);
	}
	
}
