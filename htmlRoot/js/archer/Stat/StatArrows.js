class StatArrows extends StatNumber {
	
	constructor(options = {}) {
		options.text = 'arrows';
		options.storageText = 'Bow arrows';
		options.begin = 1;
		options.end = 5;
		options.ico = 'statArrows';
		options.isLimited = false;
		options.textInfoUpdate = function() {
			this.setText(game.stats.arrows.get());
		};
		super(options);
	}
	
}
