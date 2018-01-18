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
				game.musicManager.start();
			}
		});
		return action;
	}
	
};

QQ.Seizures.register.set('Logo', game.seizures.Logo);
