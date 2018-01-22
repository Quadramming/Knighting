game.seizures.EndGame = class EndGame
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		let result = 'You ';
		if ( input.isWin ) {
			result += 'win';
		} else {
			result += 'lose';
		}
		
		this._world.addSubject(
			QQ.Subject.make({
				img: 'dialog',
				app: this._app,
				size: new QQ.Point(25, 27),
				anchor: new QQ.Point(0.5, 0.35)
			})
		);
		
		this._world.addSubject(new QQ.StyledText(
			result, 'text header'
		));
		
		if ( input.isWin ) {
			game.winLevel(input.level);
			this._world.addSubject( new QQ.Button({
				app: this._app,
				img: 'next level',
				position: new QQ.Point(0, -2),
				size: new QQ.Point(15, NaN),
				anchor: new QQ.Point(0.5, 0.5),
				onBtnClick: () => {
					this._app.closePopUp();
					this._szManager.forActive(sz => {
						sz.startGame();
					});
				}
			}));
		}
		
		this._world.addSubject( new QQ.Button({
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
		
		this._world.addSubject( new QQ.Button({
			app: this._app,
			img: 'menu',
			position: new QQ.Point(0, 8),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.closePopUp();
				this._szManager.reset();
			}
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'bow',
			position: new QQ.Point(0, 13),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Bow');
			}
		}));
	}
	
	init(input) {
		super.init();
		if ( input.level === 100 && input.isWin ) {
			this._app.popUp('Winner');
		}
	}
	
};

QQ.Seizures.register.set('EndGame', game.seizures.EndGame);
	