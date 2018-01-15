class StatSpeed extends StatBar {
	
	constructor(options = {}) {
		options.text = 'speed';
		options.storageText = 'Bow speed';
		options.begin = 0;
		options.end = 1;
		options.ico = 'statSpeed';
		options.isLimited = true;
		options.textInfoUpdate = function() {
			this.setSize(game.stats.speed.getPercents());
		};
		super(options);
	}
	
}
