class GrassCanvas extends QQ.Subject.Base {
	
	constructor(options) {
		super(options);
		this._camera = options.camera;
		this._canvas = null;
		this._ctx = null;
		this._sprite = null;
		this._tileSize = new QQ.Size(5, 5);
		this._onResize = this.initCanvas.bind(this);
		window.addEventListener('resize', this._onResize);
		this.initCanvas();
	}
	
	release() {
		window.removeEventListener('resize', this._onResize);
		this._onResize = null;
	}
	
	initCanvas() {
		const size = this._app.getResolution();
		this._canvas = QQ.makeCanvas(size);
		this._ctx = this._canvas.ctx;
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
		this._camera.setTransform(bg.getMatrix(), this._ctx);
		bg.getSprite().draw(this._ctx);
		// Castle static part
		this.mergeSubject(QQ.Subject.make({
			app: this._app,
			img: 'tower',
			position: new QQ.Point(6, -0.5 -30),
			size: new QQ.Size(6, 14),
			anchor: new QQ.Point(0.5, 0.5),
			z: 0
		}));
		this.mergeSubject(QQ.Subject.make({
			app: this._app,
			img: 'wall',
			position: new QQ.Point(0, 3 -30),
			size: new QQ.Size(37.5, 6),
			anchor: new QQ.Point(0.5, 0),
			z: 2
		}));
	}
	
	draw(ctx) {
		QQ.cleanTransform(ctx.get());
		this._sprite.draw(ctx.get());
	}
	
	merge(bones) {
		bones.forChildren( (bone) => {
			this.mergeSubject(bone);
		});
	}
	
	mergeSubject(subj) {
			this._camera.setTransform(subj.getMatrix(), this._ctx);
			subj.getSprite().draw(this._ctx);
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
