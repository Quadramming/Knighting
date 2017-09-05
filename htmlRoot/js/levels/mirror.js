game.levels['mirror'] = {
	
	knightIni: {
		hp:    100,
		hpMax: 1000
	},
	
	enemyIni: {
		hp:      400,
		hpMax:   10000,
		hpRegen: 25,
		armor:   10
	},
	
	potions: [
		{
			img:     'imgs/potionGreen.png',
			amount:  1,
			factory: (app) => new game.Effect.Poison(app, 50)
		},{
			img:     'imgs/mirror.png',
			amount:  1,
			factory: (app) => new game.Effect.Mirror(app)
		}
	]
	
};
