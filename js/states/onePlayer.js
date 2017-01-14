var KLS = KLS || {};

KLS.onePlayer = {
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
        

    }


};
