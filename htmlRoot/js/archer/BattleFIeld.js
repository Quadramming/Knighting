class BattleField extends QQ.Subject.Base {
	
	constructor(options) {
		options.size = new QQ.Point(30 * 3, 55);
		options.position = new QQ.Point(0, 0);
		options.anchor = new QQ.Point(0.5, 0.5);
		options.z = 10;
		super(options);
		this._player = options.player;
		this._worldPointer = options.worldPointer;
	}
	
	tick(delta) {
		super.tick(delta);
		if ( this._worldPointer.getWorldPoint() ) {
			if (
				this._worldPointer.isClicked() &&
				this.isHit(this._worldPointer.getWorldPoint())
			) {
				this._player.shoot(
					this._worldPointer.getWorldPoint()
				);
			}
		}
	}
	
	clip(point) {
		const bounds = this.getBounds();
		if ( point.x() > bounds.right() ) {
			point.x(bounds.right());
		}
		if ( point.x() < bounds.left() ) {
			point.x(bounds.left());
		}
		if ( point.y() > bounds.bottom() ) {
			point.y(bounds.bottom());
		}
		if ( point.y() < bounds.top() ) {
			point.y(bounds.top());
		}
		return point;
	}
	
	draw(ctx) {
		return;
		ctx.transform(this.getMatrix());
		this._drawLocalBorder(ctx);
		super.draw(ctx);
	}
	
	/*
	onClickDown(point) {
		this._player.shoot(point);
	}
	*/
	
};
