(function() {
	
	const images = [
		['grass',             'imgs/grass.png'],
		['tower',             'imgs/tower.png'],
		['wall',              'imgs/wall.png'],
		['manBody',           'imgs/man/body.png'],
		['manBoots',          'imgs/man/boots.png'],
		['manBow',            'imgs/man/bow.png'],
		['manChest',          'imgs/man/chest.png'],
		['manHair',           'imgs/man/hair.png'],
		['manHat',            'imgs/man/hat.png'],
		['manPants',          'imgs/man/pants.png'],
		['manShield',         'imgs/man/shield.png'],
		['manMelee',          'imgs/man/melee.png'],
		['star',              'imgs/star.png'],
		['arrow',             'imgs/arrow.png'],
		['changeDirection',   'imgs/changeDirection.png'],
		['bone',              'imgs/bone.png'],
		['skull',             'imgs/skull.png'],
		['pause',             'imgs/pause.png'],
		['heart',             'imgs/heart.png'],
		['redBar',            'imgs/redBar.png'],
		['bar',               'imgs/bar.png'],
		['logo',              'imgs/logo.png'],
		['blackBg',           'imgs/blackBg.png'],
		['dialog',            'imgs/dialog.png'],
		['coin',              'imgs/coin.png'],
		['slotCoin1',         'imgs/slotCoin1.png'],
		['slotCoin3',         'imgs/slotCoin3.png'],
		['start',             'imgs/buttons/start.png'],
		['abort',             'imgs/buttons/abort.png'],
		['continue',          'imgs/buttons/continue.png'],
		['restart',           'imgs/buttons/restart.png'],
		['next level',        'imgs/buttons/nextLevel.png'],
		['menu',              'imgs/buttons/menu.png'],
		['bow',               'imgs/buttons/bow.png'],
		['back',              'imgs/buttons/back.png'],
		['statArrows',        'imgs/stats/arrows.png'],
		['statCoolDown',      'imgs/stats/coolDown.png'],
		['statPenetration',   'imgs/stats/penetration.png'],
		['statSpeed',         'imgs/stats/speed.png'],
		['statShield',        'imgs/stats/shield.png']
	];
	
	const sounds = [
		['arrow', 'sounds/arrow.ogg'],
		['coin',  'sounds/coin.ogg']
	];
	
	const appConfig = {
		imgs: images,
		sounds
	};
	
	QQ.start(appConfig);
	
})();
