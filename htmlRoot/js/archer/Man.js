class Man extends
	QQ.mixins(QQ.Subject.ActionableMix, Equipable)
{
	
	constructor(options) {
		options.size = QQ.default(options.size, new QQ.Point(5));
		options.anchor = new QQ.Point(0.5);
		super(options);
		this._isAlive = true;
		this._speed = QQ.default(options.speed, 1);
	}
	
	die() {
		this._isAlive = false;
	}
	
	hitted(worldPoint) {
		const local = this.worldToLocalPoint(worldPoint);
		const percent = new QQ.Point(
			(this._size.x()*this._anchor.x()+local.x())/this._size.x(),
			(this._size.y()*this._anchor.y()+local.y())/this._size.y()
		);
		const picData = this.getPicData();
		const imgSize = new QQ.Point(picData.width, picData.height);
		const imgPoint = new QQ.Point(
			Math.floor(imgSize.w()*percent.x()),
			Math.floor(imgSize.h()*percent.y())
		);
		const pixel = QQ.getPixel(picData.data, imgSize, imgPoint);
		if ( pixel.a === 0 ) {
			// Miss sprite
			return false;
		}
		if ( this._shield ) {
			this.removeShield();
		} else {
			this.die();
		}
		return true;
	}
	
	getSpeed() {
		return this._speed;
	}
	
	disappear() {
		this._isAlive = false;
		this.setAction(
			new QQ.Actions.Disappear({
				duration: 0.1,
				isAbortable: false
			})
		);
	}
	
	isAlive() {
		return this._isAlive;
	}
	
	isCanShoot() {
		if ( ! this._isAlive ) {
			return false;
		}
		if ( ! this._weapon ) {
			return false;
		}
		if ( this._action instanceof QQ.Actions.Stun ) {
			return false;
		}
		if ( this._action instanceof QQ.Actions.Disappear ) {
			return false;
		}
		return true;
	}
	
	shoot(target) {
		if ( this.isCanShoot() ) {
			return this._weapon.shoot(target);
		}
		return false;
	}
	
	stun(duration = 1) {
		this.setAction(
			new QQ.Actions.Stun({
				app: this._app,
				subj: this,
				duration: duration
			})
		);
	}
	
};
