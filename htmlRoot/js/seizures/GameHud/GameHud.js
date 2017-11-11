game.seizures.GameHud = class GameHud
	extends QQ.Seizures.Base
{
	constructor(settings) {
		super(settings);
		this.setCamera();
		const hero = this._parent.getHero();
		this._world.addSubject(new ControlButton({
			app: this._app,
			hero: hero
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
