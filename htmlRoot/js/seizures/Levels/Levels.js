game.seizures.Levels = class Levels
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._camera.setClip(0, 0, 0, 0);
		this._world.addBackground('imgs/tile.png');
		this._addLevels();
	}
	
	tick(delta) {
		super.tick(delta);
		this.tickScroll();
	}
	
	_addLevels() {
		const stepY  = 7;
		const stepX  = 7;
		const startY = 10;
		const startX = -stepX * 1.5;
		const perRow = 4;
		const n      = game.levelsOrder.length;
		const rows   = Math.ceil(n / perRow);
		let   level  = 0;
		for ( let row = 0; row < rows; ++row ) {
			for ( let i = 0; i < perRow && level < n; ++i ) {
				++level;
				this._addLevel(
					startX + i*stepX,
					startY - stepY*row,
					game.levelsOrder[level-1],
					level
				);
			}
		}
	}
	
	_addLevel(x, y, name, text) {
		this._world.addSubject(
			new	Levels.Level(this._app, x, y, name, text)
		);
	}
	
};

QQ.Seizures.register.set('Levels', game.seizures.Levels);
