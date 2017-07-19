game.levels['sam'] = {
	
	knightIni: {
		hp:    100,
		hpMax: 100
	},
	
	enemyIni: {
		hp:    400,
		hpMax: 1000
	},
	
	potions: [
		{
			img:     'imgs/potionRed.png',
			amount:  3,
			factory: (app) => new game.Effect.HP(app, 80)
		},{
			img:     'imgs/potionBlue.png',
			amount:  3,
			factory: (app) => new game.Effect.ReduceDamage(app, 5)
		},{
			img:     'imgs/mirror.png',
			amount:  3,
			factory: (app) => new game.Effect.Mirror(app)
		}
	]
	
};
