game.levels['bob'] = {
	
	knightIni: {
		hp: 100,
		hpMax: 100
	},
	
	enemyIni: {
		hp: 200,
		hpMax: 1000
	},
	
	potions: [
		{
			img:     'imgs/potionGreen.png',
			amount:  1,
			factory: (app) => new game.Effect.Poison(app, 50)
		},{
			img:     'imgs/potionRed.png',
			amount:  1,
			factory: (app) => new game.Effect.HP(app, 100)
		}
	]
	
};
