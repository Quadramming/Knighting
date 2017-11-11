class ControlButton extends
	QQ.mixins(
		QQ.Subject.ActionableMix,
		QQ.Subject.DragAndDropMix,
		QQ.Subject.Sprite
	)
{
	
	constructor(options) {
		options.img = 'changeDirection';
		options.size = new QQ.Size(5, 5);
		options.position = new QQ.Size(9, 14);
		options.clip = new QQ.Rect(6, 14, 3, 0);
		super(options);
		this._hero = options.hero;
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
	
	onClickDown(worldPoint) {
		super.onClickDown(worldPoint);
		this._hero.changePatrolDirection();
	}
	
	getOffsetDistance() {
		return Math.abs(this._position.x() - this._initPosition.x());
	}
	
	onDrop() {
		if ( this.getOffsetDistance() >= this._clip.width() * 0.75 ) {
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
