class GrassCanvas extends QQ.Subject.Base {
	
	constructor(options) {
		super(options);
		this._camera = options.camera;
		this._canvas = null;
		this._sprite = null;
		this._tileSize = new QQ.Size(5, 5);
		window.addEventListener('resize', this.initCanvas.bind(this));
		this.initCanvas();
	}
	
	initCanvas() {
		const size = this._app.getResolution();
		this._canvas = QQ.makeCanvas(size);
		const ctx = this._canvas.ctx;
		this._sprite = new QQ.Sprite(this._canvas.cvs);
		const view = this._camera.getViewRect();
		const bg = QQ.Subject.make({
			app: this._app,
			img: 'grass',
			tiled: true,
			tileSize: this._tileSize,
			size: view.size(),
			anchor: QQ.Anchor.center,
			position: view.center()
		});
		this._camera.setTransform(bg.getMatrix(), ctx);
		bg.getSprite().draw(ctx);
	}
	
	draw(ctx) {
		QQ.cleanTransform(ctx.get());
		this._sprite.draw(ctx.get());
	}
	
	/* Alternative methods
	
	initCanvas() {
		const size = this._app.getResolution();
		this._canvas = QQ.makeCanvas(size);
		const ctx = this._canvas.ctx;
		const view = this._camera.getViewRect();
		const bg = QQ.Subject.make({
			app: this._app,
			img: 'grass',
			tiled: true,
			tileSize: this._tileSize,
			size: view.size(),
			anchor: QQ.Anchor.center,
			position: view.center()
		});
		this._camera.setTransform(bg.getMatrix(), ctx);
		bg.getSprite().draw(ctx);
		this._sprite = new QQ.Sprite(this._canvas.cvs);
		this._sprite.setAnchor(QQ.Anchor.center);
		this._sprite.setSize(view.size());
		this.setSize(view.size());
		this.setPosition(view.center());
	}
	
	draw(ctx) {
		ctx.transform(this.getMatrix());
		this._sprite.draw(ctx.get());
	}
	
	*/
	
};
