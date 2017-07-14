let game = {
	seizures: {},
	levels:   {}
};

(function() {
	const imgs = [
			'imgs/tile.png',
			'imgs/bg.png',
			'imgs/knight.png',
			'imgs/enemy.png',
			'imgs/potionRed.png',
			'imgs/potionGreen.png',
			'imgs/slot.png'
		];
	
	const appConfig = {
		imgs: imgs
	};
	
	QQ.start(appConfig);
})();
