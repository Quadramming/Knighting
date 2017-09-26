game.seizures.GameHud = class GameHud
	extends QQ.Seizures.Base
{
	constructor(app, settings) {
		super(app);
		this._parent = settings.parent;
		this._camera.init(30, 40, 0, 0);
		let hero = this._parent.getHero();
		this._world.addSubject(new QQ.Button(app, {
			width  :   3,
			height :   3,
			x      :  13,
			y      : -18,
			imgSrc : 'imgs/changeDirection.png',
			onClick : () => hero.changePatrolDirection()
		}));
	}
	
};

QQ.Seizures.register.set('GameHud', game.seizures.GameHud);
