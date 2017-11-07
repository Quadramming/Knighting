class ControlButton extends QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.DragAndDropMix, QQ.Button) {
	
	constructor(options) {
		super(options);
		this._initPosition = this._position.clone();
		this._pause = new QQ.Subject.Sprite({
			app: this._app,
			img: 'pause',
			size: this._size,
			isClickable: false,
			alpha: 0
		});
		this.addSubject(this._pause);
	}
	
	getOffsetDistance() {
		return Math.abs(this._position.x() - this._initPosition.x());
	}
	
	onDrop() {
		if ( this.getOffsetDistance() >= 2.5 ) {
			this._app.pause();
		}
		this.setAction( new QQ.Actions.MoveTo({
				subj: this,
				to: this._initPosition,
				duration: 0.2
			})
		);
	}
	
	tick(delta) {
		super.tick(delta);
		const offset = this.getOffsetDistance()/3;
		this._pause.setAlpha(offset);
	}
	
};

game.seizures.GameHud = class GameHud
	extends QQ.Seizures.Base
{
	constructor(settings) {
		super(settings);
		this.setCamera();
		const hero = this._parent.getHero();
		this._world.addSubject(new ControlButton({
			app: this._app,
			size: new QQ.Size(3, 3),
			position: new QQ.Size(10, 16),
			clip: new QQ.Rect(7, 16, 3, 0),
			img: 'changeDirection',
			onBtnClickDown : () => {
				hero.changePatrolDirection();
			}
		}));
	}
	
	setCamera() {
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		const resizeCamera = () => {
			const cameraSize = this._camera.getViewSize();
			this._camera.setPosition(new QQ.Point(
				eye.x(),
				-(cameraSize.h()-size.h())/2
			));
		};
		resizeCamera();
		window.addEventListener('resize', resizeCamera);
	}
	
};

QQ.Seizures.register.set('GameHud', game.seizures.GameHud);

game.seizures.Pause = class Pause
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'pause',
			size: new QQ.Point(10, 10),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {this._app.closePopUp();}
		}));
	}
	
};

QQ.Seizures.register.set('Pause', game.seizures.Pause);

game.seizures.EndGame = class EndGame
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'pause',
			size: new QQ.Point(5, 5),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {this._app.closePopUp();}
		}));
	}
	
};

QQ.Seizures.register.set('EndGame', game.seizures.EndGame);

game.seizures.Logo = class Logo
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		this._world.setBackground('blackBg');
		
		this._logo = new QQ.Subject.make({
			isActionable: true,
			app: this._app,
			img: 'logo',
			size: new QQ.Point(20, 20),
			anchor: new QQ.Point(0.5, 0.5)
		});
		this._logo.setAction(this.actionAppear());
		this._world.addSubject(this._logo);
	}
	
	actionAppear() {
		const action = new QQ.Actions.Appear({
			duration: 1,
			next: this.actionWait()
		});
		return action;
	}
	
	actionWait() {
		const action = new QQ.Actions.WaitFor({
			duration: 1,
			next: this.actionDisappear()
		});
		return action;
	}
	
	actionDisappear() {
		const action = new QQ.Actions.Disappear({
			duration: 1,
			onEnd: () => {
				this._app.setSz('Gameplay');
			}
		});
		return action;
	}
	
};

QQ.Seizures.register.set('Logo', game.seizures.Logo);
