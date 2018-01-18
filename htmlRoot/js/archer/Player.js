class Player extends Man {
	
	constructor(options) {
		options.speed = QQ.default(options.speed, 10);
		options.bodyName = 'human';
		super(options);
		this._level = options.level;
		this._lives = [];
		this.setShield({
			enum: 40
		});
		this.setBow({
			enum: 3,
			level: this._level,
			showCoolDown: true,
			coolDown: game.stats.coolDown.get(),
			arrows: game.stats.arrows.get(),
			penetration: game.stats.penetration.get(),
			speed: game.stats.speed.get()
		});
		this.setBoots({name: 'white'});
		this.setPants({name: 'white'});
		this.setChest({enum: 78});
		this.setHair({enum: 0});
		this.setPatrol(
			new QQ.Point(-13.5, 0),
			new QQ.Point( 13.5, 0)
		);
		this.setLives(10);
		this._score = 0;
		this._scoreText = new QQ.Text({
			align: 'left',
			valign: 'middle',
			position: new QQ.Point(-14, 17),
			size: new QQ.Size(25, 2),
			baseLine: 'middle',
			fontSize: 2,
			font: 'KenFuture',
			text: this.getScoreText(),
			isClickable: false,
			color: '#6d543a',
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
					size: new QQ.Size(4, 4),
					position: new QQ.Point(-14 + this.getLives(), 13),
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
		this._app.setSz('EndGame', {isWin: false}, true);
	}
	
	setPatrol(from, to) {
		this.setAction( new QQ.Actions.Patrol({
			from, to
		}));
	}
	
	stun() {
		super.stun(
			game.stats.shield.get()
		);
	}
	
	shoot(target) {
		if ( super.shoot(target) ) {
			game.playSound('arrow');
		}
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
