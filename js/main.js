var KLS = KLS || {};

KLS.game = new Phaser.Game(960, 640, Phaser.CANVAS);

KLS.game.state.add("MainMenu", KLS.MainMenu);
KLS.game.state.add("StartMenu", KLS.StartMenu);

KLS.game.state.start("MainMenu");
