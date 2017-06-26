game.PotionDnD = class PotionDnD extends
	QQ.Subject.DragAndDropMix(QQ.Subject.Sprite)
{
	
	constructor(app, img, slot, x, y) {
		super(app, img);
		this._slot   = slot;
		this._effect = slot.getEffect();
		this._world  = app.getSz().getWorld();
		this.setSize(4, 4);
		this.setPosition(x, y);
		this._world.addSubject(this);
	}
	
	onDrop() {
		let pos       = this.getPosition();
		let hits      = this._world.getAllSubjectsAtPoint(pos.x, pos.y);
		let char      = hits.filter( (s) => s instanceof game.Char);
		let isApplyed = false;
		if ( char.length !== 0 ) {
			char = char[0];
			if ( char.applyEffect(this._effect) ) {
				isApplyed = true;
			}
		}
		if ( ! isApplyed ) {
			this._slot.addAmount(1);
		}
		this._world.deleteSubject(this);
	}
	
	getEffect() {
		return this._effect;
	}
	
};
