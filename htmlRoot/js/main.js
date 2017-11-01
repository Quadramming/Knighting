(function() {
	
	const imgs = [
		        'imgs/Preview.png',
		        'imgs/arrow.png',
		        'imgs/back.png',
		        'imgs/bg.png',
		        'imgs/bone.png',
		        'imgs/castle.png',
		        'imgs/changeDirection.png',
		        'imgs/charMap.png',
		        'imgs/charMap.xcf',
		        'imgs/door.png',
		        'imgs/enemy.png',
		        'imgs/grass.png',
		        'imgs/knight.png',
		        'imgs/level.png',
		        'imgs/man/body.png',
		        'imgs/man/boots.png',
		        'imgs/man/bow.png',
		        'imgs/man/chest.png',
		        'imgs/man/hair.png',
		        'imgs/man/hat.png',
		        'imgs/man/pants.png',
		        'imgs/man/shield.png',
		        'imgs/man/weapon.png',
		        'imgs/mirror.png',
		        'imgs/potionBlue.png',
		        'imgs/potionGreen.png',
		        'imgs/potionRed.png',
		        'imgs/potions.png',
		        'imgs/roguelikeDungeon_transparent.png',
		        'imgs/skull.png',
		        'imgs/slot.png',
		        'imgs/star.png',
		        'imgs/tower.png',
		        'imgs/wall.png',
		        'imgs/wall1.png'
	];
	
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
		['skull',             'imgs/skull.png']
		
	];
	
	const sounds = [
		['arrow', 'sounds/arrow.ogg']
	];
	
	const appConfig = {
		imgs: images,
		sounds
	};
	
	QQ.start(appConfig);
	
})();
