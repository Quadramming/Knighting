game.BuffArea = class BuffArea {
	
	constructor(app, char) {
		this._char  = char;
		this._world = app.getSz().getWorld();
		this._max   = char.getMaxEffects();
		this._slots = [];
		for ( let i = 0; i < this._max; ++i ) {
			let slot = {
				subj:   new QQ.Subject.Sprite(app, 'imgs/slot.png', 2, 2),
				isFree: true,
				ico:    null,
				index:  i
			};
			this._world.addSubject(slot.subj);
			this._slots.push(slot);
		}
	}
	
	getSlotPosition(i) {
		let pos = this._char.getPosition();
		let max = (this._max-1) * 2.5;
		let x   = pos.x;
		let y   = pos.y - 9;
		x       = x - max/2 + i*2.5;
		return {x, y};
	}
	
	applyIco(ico) {
		for ( let slot of this._slots ) {
			if ( slot.isFree ) {
				slot.isFree  = false;
				slot.ico     = ico;
				let position = this.getSlotPosition(slot.index);
				ico.setPosition(position.x, position.y);
				return true;
			}
		}
		return false;
	}
	
	deleteIco(ico) {
		for ( let slot of this._slots ) {
			if ( slot.ico === ico ) {
				slot.ico    = null;
				slot.isFree = true;
			}
		}
	}
	
	calcPosition() {
		for ( let slot of this._slots ) {
			let position = this.getSlotPosition(slot.index);
			slot.subj.setPosition(position.x, position.y);
		}
	}
	
};
