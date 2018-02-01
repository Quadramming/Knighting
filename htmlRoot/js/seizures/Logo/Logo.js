game.seizures.Logo = class Logo
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		this._world.setBackground('blackBg');
		this.addLogo();
	}
	
	addLogo() {
		const logo = new QQ.Subject.make({
			isActionable: true,
			app: this._app,
			img: 'logo',
			size: new QQ.Point(5, 5),
			anchor: new QQ.Point(0.5, 0.5)
		});
		logo.setAction( this.actionAppear() );
		this._world.addSubject(logo);
	}
	
	actionAppear() {
		return new QQ.Actions.Appear({
			duration: 1,
			next: this.actionWait()
		});
	}
	
	actionWait() {
		return new QQ.Actions.WaitFor({
			duration: 1,
			next: this.actionDisappear()
		});
	}
	
	actionDisappear() {
		return new QQ.Actions.Disappear({
			duration: 1,
			onEnd: () => {
				this._app.setSz('Gameplay');
			}
		});
	}
	
};

QQ.Seizures.register.set('Logo', game.seizures.Logo);
