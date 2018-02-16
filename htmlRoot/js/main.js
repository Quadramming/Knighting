(function() {
	
	const images = [
		['manBody',           'imgs/man/body.png'],
		['manBoots',          'imgs/man/boots.png'],
		['manBow',            'imgs/man/bow.png'],
		['manChest',          'imgs/man/chest.png'],
		['manHair',           'imgs/man/hair.png'],
		['manHat',            'imgs/man/hat.png'],
		['manPants',          'imgs/man/pants.png'],
		['manShield',         'imgs/man/shield.png'],
		['manMelee',          'imgs/man/melee.png'],
		['start',             'imgs/buttons/start.png'],
		['abort',             'imgs/buttons/abort.png'],
		['continue',          'imgs/buttons/continue.png'],
		['restart',           'imgs/buttons/restart.png'],
		['next level',        'imgs/buttons/nextLevel.png'],
		['menu',              'imgs/buttons/menu.png'],
		['bow',               'imgs/buttons/bow.png'],
		['back',              'imgs/buttons/back.png'],
		['thankYou',          'imgs/buttons/thankYou.png'],
		['statArrows',        'imgs/stats/arrows.png'],
		['statCoolDown',      'imgs/stats/coolDown.png'],
		['statPenetration',   'imgs/stats/penetration.png'],
		['statSpeed',         'imgs/stats/speed.png'],
		['statShield',        'imgs/stats/shield.png'],
		['grass',             'imgs/grass.png'],
		['tower',             'imgs/tower.png'],
		['wall',              'imgs/wall.png'],
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
		['slotCoinOne',       'imgs/slotCoinOne.png'],
		['slotCoinAll',       'imgs/slotCoinAll.png'],
		['info',              'imgs/info.png'],
		['potato',            'imgs/potato.png'],
		['reset',             'imgs/reset.png'],
		['settings',          'imgs/settings.png'],
		['checkBoxChecked',   'imgs/checkBoxChecked.png'],
		['checkBoxEmpty',     'imgs/checkBoxEmpty.png'],
		['whiteBg',           'imgs/whiteBg.png'],
		['castleEdge',        'imgs/castleEdge.png']
	];
	
	const sounds = [
		['battle', 'sounds/battle.ogg'],
		['arrow',  'sounds/arrow.ogg'],
		['coin',   'sounds/coin.ogg'],
		['hitted', 'sounds/punch.ogg'],
		['throw',  'sounds/throw.ogg']
	];
	
	const appConfig = {
		imgs: images,
		sounds: sounds,
		showFps: false,
		game: game
	};
	
	QQ.start(appConfig);
	
})();
