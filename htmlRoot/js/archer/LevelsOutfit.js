class LevelsOutfit {
	
	static dress(player) {
		const lvl = player.getLevel();
		player.setBoots({level: lvl});
		player.setChest({level: lvl});
		player.setPants({level: lvl});
		player.setHair({level: lvl});
		player.setHat({level: lvl});
	}
	
};
