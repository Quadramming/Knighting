game.seizures.GameHud = class GameHud
	extends QQ.Seizures.Base
{
	
	constructor(settings) {
		super(settings);
		this._onResize = null;
		this.setCamera();
		this.addControlButton();
	}
	
	addControlButton() {
		this._world.addSubject( new ControlButton({
			app: this._app,
			hero: this._parent.getHero()
		}));
	}
	
	setCamera() {
		const size = new QQ.Point(30, 40);
		const eye = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		this._onResize = this.resizeCamera.bind(this, size, eye);
		this._onResize();
		window.addEventListener('resize', this._onResize);
	}
	
	release() {
		super.release();
		window.removeEventListener('resize', this._onResize);
		this._onResize = null;
	}
	
	resizeCamera(size, eye) {
		const cameraSize = this._camera.getViewSize();
		this._camera.setPosition( new QQ.Point(
			eye.x(),
			-(cameraSize.h() - size.h()) / 2
		));
	}
	
	onBackButton() {
	}
	
};

QQ.Seizures.register.set('GameHud', game.seizures.GameHud);
