class Bones extends
	QQ.mixins(QQ.Subject.ActionableMix, QQ.Subject.Base)
{
	
	constructor(options) {
		options.size  = new QQ.Point(2, 2);
		options.anchor  = new QQ.Point(0.5, 0.5);
		options.z = 1;
		super(options);
		this._bonesAmount = QQ.Math.rand(1, 3);
				
		for ( let i = 0; i < 1 + this._bonesAmount; ++i ) {
			this.addSubject(QQ.Subject.make({
				app: this._app,
				size: new QQ.Point(2, 2),
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
			size: new QQ.Point(2, 2),
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
				to: new QQ.Point(thisPos.x(), thisPos.y() + 1.5),
				duration: 0.1,
				onEnd: () => {this.wait();}
			})
		);
	}
	
	wait() {
		this.setAction(
			new QQ.Actions.WaitFor({
				duration: 5,
				onEnd: () => {this.disapear();}
			})
		);
	}
	
	disapear() {
		this.setAction(
			new QQ.Actions.Disapear({
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
