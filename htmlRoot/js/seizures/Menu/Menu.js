game.seizures.Menu = class Menu
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		this._world.addSubject(
			QQ.Subject.make({
				img: 'dialog',
				app: this._app,
				size: new QQ.Point(25, 27),
				anchor: new QQ.Point(0.5, 0.35)
			})
		);
		
		const level = game.getAvailableLevel();
		this._levelText = new QQ.Text({
			align: 'center',
			valign: 'middle',
			position: new QQ.Point(0, -6),
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(20, 3),
			baseLine: 'middle',
			fontSize: 2,
			font: 'KenFuture',
			text: 'Level: '+level+' / 100',
			isClickable: false,
			color: '#6d543a',
			z: 20
		});
		this._world.addSubject(this._levelText);
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'start',
			position: new QQ.Point(0, -2),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				input.startGame();
				this._app.closePopUp();
			}
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'bow',
			position: new QQ.Point(0, 3),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Bow');
			}
		}));
	}
	
};

QQ.Seizures.register.set('Menu', game.seizures.Menu);
