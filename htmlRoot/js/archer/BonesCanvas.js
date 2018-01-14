class BonesCanvas extends QQ.Subject.Base {
	
	constructor(options) {
		super(options);
		this._camera = options.camera;
		this._canvas = null;
		this._ctx = null;
		this._sprite = null;
		window.addEventListener('resize', this.makeCanvas.bind(this));
		this.makeCanvas();
	}
	
	makeCanvas() {
		const size = this._app.getResolution();
		this._canvas = QQ.makeCanvas(size);
		this._ctx = this._canvas.ctx;
		this._sprite = new QQ.Sprite(this._canvas.cvs);
	}
	
	draw(ctx) {
		QQ.cleanTransform(ctx.get());
		this._sprite.draw(ctx.get());
	}
	
	merge(bones) {
		bones.forChildren( (bone) => {
			this._camera.setTransform(bone.getMatrix(), this._ctx);
			bone.getSprite().draw(this._ctx);
		});
	}
	
};
