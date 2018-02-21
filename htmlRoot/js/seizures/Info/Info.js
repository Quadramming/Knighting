game.seizures.Info = class Info
	extends szDialog
{
	
	constructor(input) {
		super(input);

		this._world.addSubject( new QQ.StyledText(
			'Info', 'text header'
		));
		
		this._world.addSubject( new QQ.StyledText(
			'Developer \nTrifle Quad Studio\n\n' +
			'Assets & Sounds & Fonts\nhttps://kenney.nl\n\n' +
			'Sound \nhttps://opengameart.org',
			'text dialog'
		));
		
		this.addBackButton();
	}
	
	addBackButton() {
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'back',
			position: new QQ.Point(0, 14),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
			}
		}));
	}
	
	onBackButton() {
		this._app.closePopUp();
	}
	
};

QQ.Seizures.register.set('Info', game.seizures.Info);
