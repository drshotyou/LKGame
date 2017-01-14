var KLS = KLS || {};

KLS.MainMenu = {
    init: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setScreenSize( true );

    },
    preload: function(){
        this.load.image("background","assets/images/background.png");
        this.load.spritesheet("button","assets/images/button.png",361,176,4,0,23);
        this.load.spritesheet("score","assets/images/score.png",176,176,4,0,16);


    },
    create: function(){
        this.background = this.add.image(0,0,"background");
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.startButton = this.game.add.button(210,200,"button",function(){this.state.start("customization");},this,1,4,2,1);
        this.startButton.anchor.setTo(0.5);
        this.title = this.game.add.text(135,50,"Los Kalientes", {fontSize:"50px"});
        this.startButton.scale.setTo(0.5,0.5);
        this.startText = this.game.add.text(this.startButton.x-65,this.startButton.y-25,"START",{fontSize:"40px"});

        this.highscoreButton = this.game.add.button(415,200,"score",null,null,1,4,2,1);
        this.highscoreButton.anchor.setTo(0.5);
        this.highscoreButton.scale.setTo(0.5,0.5);

    }


};
