var KLS = KLS || {};

KLS.highscore = {
    init: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setScreenSize( true );
        this.highscore = localStorage.getItem("Highscore");
        if(this.highscore===null){
          localStorage.setItem("Highscore","300")
        }

    },
    preload: function(){
        this.load.image("background","assets/images/background.png");
        this.load.spritesheet("button","assets/images/button.png",361,176,4,0,23);
        this.load.audio("menu","assets/audio/menu.mp3");


    },
    create: function(){
        this.backmusic = this.game.add.audio("menu");

        this.background = this.add.image(0,0,"background");
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.highscore = localStorage.getItem("Highscore");

        this.title = this.game.add.text(135,25,"Highscore is:", {fontSize:"50px"});
        this.title = this.game.add.text(135,90,this.highscore, {fontSize:"50px"});

        this.startButton = this.game.add.button(210,200,"button",function(){this.state.start("MainMenu");},this,1,4,2,1);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(0.5,0.5);
        this.startText = this.game.add.text(this.startButton.x-65,this.startButton.y-25,"BACK",{fontSize:"40px"});


    }


};
