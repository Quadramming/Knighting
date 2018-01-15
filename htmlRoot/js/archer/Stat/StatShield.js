class StatShield extends StatBar {
	
	constructor(options = {}) {
		options.text = 'shield';
		options.storageText = 'Bow shield';
		options.begin = 2;
		options.end = 0.5;
		options.ico = 'statShield';
		options.isLimited = true;
		options.textInfoUpdate = function() {
			this.setSize(game.stats.shield.getPercents());
		};
		super(options);
	}
	
}
