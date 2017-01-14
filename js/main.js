var KLS = KLS || {};

KLS.game = new Phaser.Game(700, 350, Phaser.CANVAS);

KLS.game.state.add("MainMenu", KLS.MainMenu);
KLS.game.state.add("customization", KLS.customization);
KLS.game.state.add("onePlayer",KLS.onePlayer);

KLS.game.state.start("MainMenu");
