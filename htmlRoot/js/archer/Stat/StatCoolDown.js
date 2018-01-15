class StatCoolDown extends StatBar {
	
	constructor(options = {}) {
		options.text = 'reload';
		options.storageText = 'Bow coolDown';
		options.begin = 1;
		options.end = 0.1;
		options.ico = 'statCoolDown';
		options.isLimited = true;
		options.textInfoUpdate = function() {
			this.setSize(game.stats.coolDown.getPercents());
		};
		super(options);
	}
	
}
