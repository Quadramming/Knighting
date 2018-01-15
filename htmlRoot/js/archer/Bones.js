class Bones extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(options) {
		options.anchor = new QQ.Point(0.5, 0.5);
		options.z = 2;
		super(options);
		this._bonesAmount = QQ.Math.rand(1, 3);
				
		for ( let i = 0; i < this._bonesAmount; ++i ) {
			this.addSubject(QQ.Subject.make({
				app: this._app,
				size: options.size,
				img: 'bone',
				anchor: options.anchor,
				angle: QQ.Math.rand(-3.14, 3.14, false),
				position: new QQ.Point(
					QQ.Math.rand(-0.5, 0.5),
					QQ.Math.rand(-0.5, 0.5)
				)
			}));
		}
		this.addSubject(QQ.Subject.make({
			app: this._app,
			size: options.size,
			img: 'skull',
			anchor: options.anchor,
			angle: QQ.Math.rand(-3.14, 3.14, false),
			position: new QQ.Point(
				QQ.Math.rand(-0.5, 0.5),
				QQ.Math.rand(-0.5, 0.5)
			)
		}));
		
		this.drop();
	}
	
	drop() {
		const thisPos = this.getPosition();
		this.setAction(
			new QQ.Actions.MoveTo({
				subj: this,
				to: new QQ.Point(thisPos.x(), thisPos.y() + 2.5),
				duration: 0.15,
				onEnd: () => {
					game.mergeBones(this);
					this.deleteMe();
				}
			})
		);
	}
	
	wait() {
		this.setAction(
			new QQ.Actions.WaitFor({
				duration: 5,
				onEnd: () => {this.disappear();}
			})
		);
	}
	
	disappear() {
		this.setAction(
			new QQ.Actions.Disappear({
				duration: 1,
				onEnd: () => {this.deleteMe();}
			})
		);
	}
	
	setAlpha(a) {
		this.forAllSubjects((subj) => {
			subj.setAlpha(a);
		});
	}
	
};
