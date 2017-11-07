class Player extends Man {
	
	constructor(options) {
		options.speed = QQ.default(options.speed, 10);
		super(options);
		this._lives = [];
		this.setShield(new QQ.Point(1, 6));
		this.setBow(new QQ.Point(1, 3));
		this.setPatrol(
			new QQ.Point(-13.5, 0),
			new QQ.Point( 13.5, 0)
		);
		this.setLives(3);
		this._score = 0;
		this._scoreText = new QQ.Text({
			align: 'left',
			position: new QQ.Point(-14, 18),
			size: new QQ.Size(20, 2),
			fontSize: 1.5,
			font: 'KenFuture',
			text: this.getScoreText(),
			isClickable: false,
			z: 20
		});
		this._world.addSubject(this._scoreText);
	}
	
	getScoreText() {
		return 'Score: ' + this._score;
	}
	
	setLives(n) {
		const diff = n - this.getLives();
		if ( diff > 0 ) {
			for ( let i = 0; i < diff; ++i ) {
				const heart = QQ.Subject.make({
					app: this._app,
					img: 'heart',
					size: new QQ.Size(2, 2),
					position: new QQ.Point(-14 + this.getLives(), 16),
					isClickable: false,
					z: 20
				});
				this._lives.push(heart);
				this._world.addSubject(heart);
			}
		}
		if ( diff < 0 ) {
			for ( let i = 0; i > diff; --i ) {
				this._lives.pop().deleteMe();
			}
		}
	}
	
	draw(ctx) {
		super.draw(ctx);
	}
	
	hitted() {
		this.stun();
	}
	
	offend() {
		if ( this.getLives() > 0 ) {
			this.setLives(this.getLives() - 1);
			if ( this.getLives() === 0 ) {
				this.die();
			}
		}
	}
	
	addScore(n) {
		this._score += n;
		this._scoreText.setText(
			this.getScoreText()
		);
	}
	
	die() {
		super.die();
		this._app.setSz('EndGame', {}, true);
		c('ENDGAME');
	}
	
	setPatrol(from, to) {
		this.setAction( new QQ.Actions.Patrol({
			from, to
		}));
	}
	
	getLives() {
		return this._lives.length;
	}
	
	changePatrolDirection() {
		if ( this._action instanceof QQ.Actions.Patrol ) {
			this._action.changeDirection();
		}
	}
	
};
