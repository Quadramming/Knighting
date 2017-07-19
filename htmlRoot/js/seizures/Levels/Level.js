game.seizures.Levels.Level = class Level extends QQ.Subject.Sprite {
	
	constructor(app, x, y, name, text, ) {
		super(app, 'imgs/level.png', 5, 5);
		this.setPosition(x, y);
		this._name = name;
		this._text = new QQ.Text(app, text);
		this._text.setLineHeight(30);
	}
	
	onClick() {
		this._app.setSz('Game', {
			cfg:  game.levels[this._name],
			name: this._name
		});
	}
	
	draw() {
		super.draw();
		this._text.draw();
	}
	
};
