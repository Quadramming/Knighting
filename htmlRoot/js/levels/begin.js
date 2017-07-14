game.levels['begin'] = {
	
	knightIni: {
		hp: 75,
		hpMax: 200
	},
	
	enemyIni: {
		hp: 125,
		hpMax: 200
	},
	
	potions: [
		{
			img:     'imgs/potionRed.png',
			amount:  1,
			factory: (app) => new game.Effect.HP(app, 100)
		}
	]
	
};
