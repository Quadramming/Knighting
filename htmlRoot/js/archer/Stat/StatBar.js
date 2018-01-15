class StatBar extends Stat {
	
	constructor(options) {
		super(options);
		this._bar = new Bar({
			app: options.app,
			updateOnTick: options.textInfoUpdate
		});
	}
	
	getBar(position) {
		if ( position ) {
			this._bar.setPosition(position);
		}
		return this._bar;
	}
	
	getPercents() {
		const start = this._begin;
		const end = this._end;
		const now = this.get();
		return Math.min(
			(start-now)/(start - end)*100,
			100
		);
	}
	
}
