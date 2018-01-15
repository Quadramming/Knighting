class CoinUp extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(options) {
		options.anchor = new QQ.Point(0.5, 0.5);
		options.z = 9;
		super(options);
		this._coin = QQ.Subject.make({
			app: this._app,
			img: 'coin',
			size: new QQ.Point(3, 3),
			anchor: options.anchor
		});
		this.addSubject(this._coin);
		game.addCoins(1);
		this._app.playSound('coin');
		this.up();
	}
	
	up() {
		const thisPos = this.getPosition();
		this.setAction(
			new QQ.Actions.MoveTo({
				subj: this,
				to: new QQ.Point(thisPos.x(), thisPos.y() - 1.5),
				duration: 0.3,
				onEnd: () => {this.disappear();}
			})
		);
	}
	
	disappear() {
		this.setAction(
			new QQ.Actions.Disappear({
				duration: 0.5,
				onEnd: () => {this.deleteMe();}
			})
		);
	}
	
	setAlpha(a) {
		this._coin.setAlpha(a);
	}
	
};
