var KLS = KLS || {};

KLS.game = new Phaser.Game(480, 320, Phaser.CANVAS);

KLS.game.state.add("MainMenu", KLS.MainMenu);

KLS.game.state.start("MainMenu");