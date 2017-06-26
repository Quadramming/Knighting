game.BubbleText = class BubbleText extends
	QQ.Subject.ActionableMix(QQ.Subject.Base)
{
	
	constructor(app, world, x, y, text, color = 'black') {
		super(app);
		this.setPosition(x, y);
		this._color = color;
		this._text  = text;
		this._alpha = 1;
		
		let disapear = new QQ.Actions.Disapear(this._app, this, 1000);
		disapear.onEnd = () => {
			world.deleteSubject(this);
		};
		this.setAction(disapear);
		world.addSubject(this);
	}
	
	getScale() {
		return { x : 0.05, y : 0.05 };
	}
	
	setAlpha(a) {
		this._alpha = a;
	}
	
	draw() {
		const changeAlpha = (this._alpha !== 1);
		if ( changeAlpha ) {
			this._ctx.globalAlpha = this._alpha;
		}
		
		this._ctx.font         = '20px Ken';
		this._ctx.textBaseline = 'middle';
		this._ctx.textAlign    = 'center';
		this._ctx.fillStyle    = this._color;
		this._ctx.fillText(this._text, 0, 0);
		if ( changeAlpha ) {
			this._ctx.globalAlpha = 1;
		}
	}
	
};
