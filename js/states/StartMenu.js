var KLS = KLS || {};

KLS.StartMenu = {
    init: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setScreenSize( true );

    },
    preload: function(){
        this.load.image("background","assets/images/background.png");
        this.load.spritesheet("onePlayer","assets/images/onePlayer.png",176,176,4,0,16);
        this.load.spritesheet("twoPlayer","assets/images/twoPlayer.png",176,176,4,0,16);


    },
    create: function(){
        this.background = this.add.image(0,0,"background");
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.onePlayerButton = this.game.add.button(140,165,"onePlayer",null,null,1,4,2,1);
        this.onePlayerButton.anchor.setTo(0.5);
        this.onePlayerButton.scale.setTo(0.5,0.5);

        this.twoPlayerButton = this.game.add.button(340,165,"twoPlayer",null,null,1,4,2,1);
        this.twoPlayerButton.anchor.setTo(0.5);
        this.twoPlayerButton.scale.setTo(0.5,0.5);

    }


};
