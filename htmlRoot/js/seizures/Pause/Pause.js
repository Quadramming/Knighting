game.seizures.Pause = class Pause
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		this._world.addSubject( QQ.Subject.make({
			img: 'dialog',
			app: this._app,
			size: new QQ.Point(25, 27),
			anchor: new QQ.Point(0.5, 0.35)
		}));
		
		this._world.addSubject(new QQ.Text({
			align: 'center',
			valign: 'middle',
			position: new QQ.Point(0, -6),
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(20, 3),
			baseLine: 'middle',
			fontSize: 50,
			font: 'KenFuture',
			text: 'Pause',
			isClickable: false,
			color: '#6d543a',
			z: 20
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'continue',
			position: new QQ.Point(0, -2),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
			}
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'restart',
			position: new QQ.Point(0, 3),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.forActive(sz => {
					sz.restartGame();
				});
			}
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'settings',
			position: new QQ.Point(7.5, 13),
			size: new QQ.Point(5, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Settings');
			}
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'abort',
			position: new QQ.Point(0, 8),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.reset();
			}
		}));
	}
	
};

QQ.Seizures.register.set('Pause', game.seizures.Pause);
