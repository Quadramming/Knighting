class BubbleText extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Text)
{
	constructor(options) {
		super(options);
		this.disappear();
		this._alpha = 1;
		this.up();
	}
	
	up() {
		const thisPos = this.getPosition();
		this.setAction(
			new QQ.Actions.MoveTo({
				subj: this,
				to: new QQ.Point(thisPos.x(), thisPos.y() - 2.5),
				duration: 0.5,
				onEnd: () => {
					this.disappear();
				}
			})
		);
	}
	
	disappear() {
		this.setAction(
			new QQ.Actions.Disappear({
				duration: 0.5,
				onEnd: () => {
					this.deleteMe();
				}
			})
		);
	}
	
	static make(options) {
		const bubble = new BubbleText({
			align: 'center',
			valign: 'middle',
			position: options.position,
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(30, 1.5),
			baseLine: 'middle',
			fontSize: 5,
			font: 'KenFuture',
			text: options.text,
			isClickable: false,
			color: QQ.default(options.color, '#FF0000'),
			z: 20
		});
		if ( options.world ) {
			options.world.addSubject(bubble);
		}
		return bubble;
	}
	
};

game.seizures.Menu = class Menu
	extends QQ.Seizures.Base
{
	
	constructor(input) {
		super(input);
		const size = new QQ.Point(30, 40);
		const eye  = new QQ.Point(0, 0);
		this._camera.init(size, eye);
		
		this._world.addSubject(
			QQ.Subject.make({
				img: 'dialog',
				app: this._app,
				size: new QQ.Point(25, 27),
				anchor: new QQ.Point(0.5, 0.35)
			})
		);
		
		const level = game.getAvailableLevel();
		this._levelText = new QQ.Text({
			align: 'center',
			valign: 'middle',
			position: new QQ.Point(0, -6),
			anchor: new QQ.Point(0.5, 0.5),
			size: new QQ.Size(20, 3),
			baseLine: 'middle',
			fontSize: 2,
			font: 'KenFuture',
			text: 'Level: '+level+' / 100',
			isClickable: false,
			color: '#6d543a',
			z: 20
		});
		this._world.addSubject(this._levelText);
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'start',
			position: new QQ.Point(0, -2),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				input.startGame();
				this._app.closePopUp();
			}
		}));
		
		this._world.addSubject(new QQ.Button({
			app: this._app,
			img: 'bow',
			position: new QQ.Point(0, 3),
			size: new QQ.Point(15, NaN),
			anchor: new QQ.Point(0.5, 0.5),
			onBtnClick: () => {
				this._app.popUp('Bow');
			}
		}));
		
		const char = new Man({
			size: new QQ.Point(8),
			position: new QQ.Point(0, 11),
			app: this._app,
			onClick: (point) => {
				const texts = [
					'Wow!',
					'Best game ever!',
					'Such action!',
					'Very good!',
					'So much fun!',
					'Hello!',
					'Have fun!',
					'You are the best!'
				];
				BubbleText.make({
					world: this._world,
					text: texts[Math.floor(Math.random()*texts.length)],
					color: '#FF0000',
					position: point
				});
			}
		});
		char.dress(RandomOutfit);
		//char.setChest({enum: 8});
		this._world.addSubject(char);
	}
	
};

QQ.Seizures.register.set('Menu', game.seizures.Menu);
