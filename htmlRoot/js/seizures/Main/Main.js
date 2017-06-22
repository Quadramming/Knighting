game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
	}
	
	init() {
		let app = this._app;
		this._camera.init(30, 40, 0, 0);
		app._fpsCounter.showDetails();
		
		let bg = new QQ.Subject.TileSprite(app, 'imgs/tile.png');
		bg.setPosition(0, 0);
		bg.setTileSize(5, 5);
		let resizeBg = () => {
				let cameraView = this._camera.getView();
				bg.setSize(cameraView.width, cameraView.height);
			};
		resizeBg();
		window.addEventListener('resize', resizeBg);
		this._world.addSubject(bg);
		
		let frame = new QQ.Subject.Sprite(app, 'imgs/bg.png', 30, 40);
		this._world.addSubject(frame);
		
		let knight = new game.Char(app, 'imgs/knight.png');
		knight.onDie = () => {
			//alert('You lose');
		};
		knight.setPosition(-8, 12);
		
		let enemy = new game.Char(app, 'imgs/enemy.png');
		enemy.onDie = () => {
			//alert('You win');
		};
		enemy.setPosition(8, 12);
		
		new game.PotionSlot(app, 'imgs/potion.png');
		
		this._world.addSubject(
			new game.Fight(app, knight, enemy)
		);
	}
	
	getScore() {
		return this._score;
	}
	
	tick(delta) {
		this.tickWorld(delta);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);

game.Fight = class Fight extends QQ.Subject.Base {
	
	constructor(app, fighterA, fighterB) {
		super(app, 1, 1);
		this._fighterA = fighterA;
		this._fighterB = fighterB;
	}
	
	tick(delta) {
		if ( ! this.isBothAlive() ) {
			return;
		}
		
		let hits = this._fighterB.getHitsReady();
		for ( ; hits > 0; --hits ) {
			this._fighterA.sufferHit( this._fighterB.makeHit() );
		}
		
		if ( ! this.isBothAlive() ) {
			return;
		}
		hits = this._fighterA.getHitsReady();
		for ( ; hits > 0; --hits ) {
			this._fighterB.sufferHit( this._fighterA.makeHit() );
		}
	}
	
	isBothAlive() {
		return this._fighterA.isAlive() && this._fighterB.isAlive();
	}
	
	isClickable() {
		return false;
	}
	
};

game.Char = class Char extends QQ.Subject.Sprite {
	
	constructor(app, img) {
		super(app, img);
		this._world = app.getSz().getWorld();
		this.setSize(8, 8);
		this._world.addSubject(this);
		
		this._effects       = [];
		this._maxEffects    = 2;
		
		this._isAlive       = true;
		this._hp            = 100;  // HP
		this._hpMax         = 1000; // HP Cap
		this._hpRegen       = 1;    // HP per Second
		this._hpRegenCharge = 0;    // Time without hp regen
		this._armor         = 100;
		this._strength      = 10;
		this._commonHit     = 10;
		this._criticalHit   = 10;
		this._weakHit       = 10;
		this._hitCharge     = 0;    // Time without hits
		this._hitsReady     = 0;    // Charger hits
		this._hitSpeed      = 2;    // Hits per second
		this._accuracy      = 2;
	}
	
	draw() {
		super.draw();
		for ( let effect of this._effects ) {
			effect.draw();
		}
		let ctx          = this._ctx;
		ctx.font         = '50px Ken';
		ctx.textBaseline = 'middle';
		ctx.textAlign    = 'center';
		ctx.fillStyle    = '#006400';
		ctx.fillText(this._hp, 0, 200);
	}
	
	tick(delta) {
		super.tick();
		
		for ( let e of this._effects ) {
			e.tick(delta);
			if ( e.isEnded() ) {
			}
		}
		
		this._effects = this._effects.filter( (e) => {
				let isEnd = !e.isEnded();
				if ( ! isEnd ) {
					e.onEnd();
				}
				return isEnd;
			});
		
		this._hpRegenCharge += delta;
		while ( this._hpRegenCharge > 1 ) {
			this.addHp(this._hpRegen);
			this._hpRegenCharge -= 1;
		}
		
		this._hitCharge += delta;
		let timePerHit = 1/this._hitSpeed;
		while ( this._hitCharge > timePerHit ) {
			++this._hitsReady;
			this._hitCharge -= timePerHit;
		}
		
		if ( this._hp > this._hpMax ) {
			this._hp = this._hpMax;
		}
	}
	
	getHitsReady() {
		return this._hitsReady;
	}
	
	makeHit() {
		if ( this._hitsReady < 1 ) {
			alert('makeHit error');
			return 0;
		}
		--this._hitsReady;
		let dmg = this._strength;
		dmg = this.criticalModify(dmg);
		dmg = dmg - QQ.Math.rand(0, dmg*1/this._accuracy, false);
		return dmg;
	}
	
	criticalModify(dmg) {
		let sum = this._commonHit + this._criticalHit + this._weakHit;
		let r = QQ.Math.rand(1, sum);
		if ( r <= this._criticalHit ) { // Crit
			return dmg*2;
		} if ( r <= this._criticalHit + this._weakHit ) { // Weak
			return dmg/2;
		} else { // Common
			return dmg;
		}
	}
	
	sufferHit(dmg) {
		dmg = Math.round(dmg);
		this._hp -= dmg;
		this.bubbleText(dmg, 'red');
		if ( this._hp <= 0 ) {
			this.die();
		}
	}
	
	applyEffect(effect) {
		let effects = this._effects.length;
		if ( effects >= this._maxEffects ) {
			return false;
		}
		effect.setChar(this);
		let x = this._x + effects * 2.5;
		let y = this._y - 9;
		effect.getIco().setPosition(x, y);
		effect.onStart();
		this._effects.push(effect);
		return true;
	}
	
	addHp(hp) {
		this._hp += hp;
		this.bubbleText(hp);
	}
	
	bubbleText(text, color = '#006400') {
		let pos = this.getPosition();
		let x = pos.x + QQ.Math.randDispersion(4);
		let y = pos.y + QQ.Math.randDispersion(4);
		new game.BubbleText(this._app, this._world, x, y, text, color);
	}
	
	onDie() {
	}
	
	isAlive() {
		return this._isAlive;
	}
	
	die() {
		this._isAlive = false;
		this._world.deleteSubject(this);
		this.onDie();
	}
	
};

game.potionsSlots = [];

game.PotionSlot = class PotionSlot extends QQ.Subject.Sprite {
	
	constructor(app, img) {
		super(app, img);
		this._world = app.getSz().getWorld();
		this.setSize(4, 4);
		this.setPosition(-10, -2);
		this._world.addSubject(this);
		this._amount = 3;
	}
	
	draw() {
		super.draw();
		this._ctx.font         = '20px Ken';
		this._ctx.textBaseline = 'middle';
		this._ctx.textAlign    = 'center';
		this._ctx.fillStyle    = 'black';
		this._ctx.fillText(this._amount, 45, 45);
	}
	
	addAmount(x) {
		this._amount += x;
	}
	
	onClickDown(x, y) {
		if ( this._amount === 0 ) {
			return;
		}
		--this._amount;
		let effect = new game.PotionDnD(
				this._app,
				'imgs/potion.png',
				this,
				this._x,
				this._y
			);
		effect.onClickDown(x, y);
	}
	
};

game.PotionDnD = class PotionDnD extends
	QQ.Subject.DragAndDropMix(QQ.Subject.Sprite)
{
	
	constructor(app, img, slot, x, y) {
		super(app, img);
		this._slot = slot;
		this._world = app.getSz().getWorld();
		this.setSize(4, 4);
		this.setPosition(x, y);
		this._world.addSubject(this);
		this._effect = new game.Effect.HP(this._app, 30);
	}
	
	onDrop() {
		let pos  = this.getPosition();
		let hits = this._world.getAllSubjectsAtPoint(pos.x, pos.y);
		let char = hits.filter( (s) => s instanceof game.Char);
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

game.Effect = {};

game.Effect.Base = class Base {
	
	constructor(app, img) {
		this._app      = app;
		this._ctx      = this._app.getContext();
		this._duration = 0;
		this._char     = null;
		this._ico      = new game.Effect.EffectIco(app, img);
		this._world    = app.getSz().getWorld();
	}
	
	getIco() {
		return this._ico;
	}
	
	setChar(char) {
		this._char = char;
	}
	
	onStart() {
		this._world.addSubject(this._ico);
	}
	
	tick(delta) {
		this._duration += delta;
	}
	
	draw() {
	}
	
	isEnded() {
		return false;
	}
	
	onEnd() {
		this._world.deleteSubject(this._ico);
	}
	
};

game.Effect.EffectIco = class EffectIco extends QQ.Subject.Sprite {
	
	constructor(app, img, w = 2, h = 2) {
		super(app, img, w, h);
	}
	
};

game.Effect.HP = class HP extends game.Effect.Base {
	
	constructor(app, hp, time = 5) {
		super(app, 'imgs/potion.png');
		this._hp     = hp;
		this._time   = time;
	}
	
	tick(delta) {
		super.tick(delta);
		this._char.addHp(1);
	}
	
	onStart() {
		super.onStart();
		this._char.addHp(this._hp);
	}
	
	isEnded() {
		return this._duration >= this._time;
	}
	
	onEnd() {
		super.onEnd();
		this._char.addHp(this._hp);
	}
	
};

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