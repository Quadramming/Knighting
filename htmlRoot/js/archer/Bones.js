class Bones extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(app, options) {
		options.width  = QQ.default(options.width,  2);
		options.height = QQ.default(options.height,  2);
		super(app, options);
		this._alpha = 1;
		this._bonesAmount = QQ.Math.rand(1, 3);
		this._skull = new QQ.Sprite(this._app.getImg('imgs/skull.png'));
		this._bone  = new QQ.Sprite(this._app.getImg('imgs/bone.png'));
		this._transforms = [];
		for ( let i = 0; i < 1 + this._bonesAmount; ++i ) {
			this._transforms.push({
				angle: QQ.Math.rand(-3.14, 3.14, false),
				x: QQ.Math.rand(-25, 25),
				y: QQ.Math.rand(-25, 25)
			});
		}
		this.waitAndDisapear();
	}
	
	waitAndDisapear() {
		this.setAction(new QQ.Actions.WaitFor(this._app, {
			subj:     this,
			duration: 5000,
			onEnd:    () => {this.disapear();}
		}));
	}
	
	disapear() {
		this.setAction(new QQ.Actions.Disapear(this._app, {
			subj:     this,
			duration: 1000,
			onEnd:    () => {this._world.deleteSubject(this);}
		}));
	}
	
	setAlpha(a) {
		this._alpha = a;
	}
	
	getScale() {
		let size   = this._bone.getSize();
		let scaleX = this._width  / size.width;
		let scaleY = this._height / size.height;
		return { x : scaleX, y : scaleY };
	}
	
	tick(d) {
		super.tick(d);
		c(d);
	}
	
	draw(ctx) {
		this._bone.setAlpha(this._alpha);
		this._skull.setAlpha(this._alpha);
		for ( let i = 1; i < this._transforms.length; ++i ) {
			ctx.restore();
			ctx.rotate(this._transforms[i].angle);
			ctx.translate(this._transforms[i].x, this._transforms[i].y);
			this._bone.draw(ctx);
			ctx.translate(-this._transforms[i].x, -this._transforms[i].y);
			ctx.rotate(-this._transforms[i].angle);
		}
		ctx.rotate(this._transforms[0].angle);
		ctx.translate(this._transforms[0].x, this._transforms[0].y);
		this._skull.draw(ctx);
	}
	
};