var KLS = KLS || {};

KLS.customization = {
    init: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setScreenSize( true );

    },
    preload: function(){
        this.load.image("background","assets/images/background.png");
        this.load.spritesheet("leftArrow","assets/images/leftArrow.png",176,176,4,0,16);
        this.load.spritesheet("rightArrow","assets/images/rightArrow.png",176,176,4,0,16);
        this.load.spritesheet("sprite1","assets/images/jorge.png",80,110,24);
        this.load.spritesheet("sprite2","assets/images/alden.png",80,110,24);
        this.load.spritesheet("sprite3","assets/images/sergio.png",80,110,24);
        this.load.spritesheet("select","assets/images/select.png",176,176,4,0,16);



    },
    create: function(){
        this.background = this.add.image(0,0,"background");
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.selectButton = this.game.add.button(315,315,"select",function(){
          if(this.playerName=="Jorge"){
            
          }else if(this.playerName=="Alden"){

          }else {

          }
        },this,1,4,2,1);
        this.selectButton.anchor.setTo(0.5);
        this.selectButton.scale.setTo(0.3,0.3);

        this.jorge = this.add.sprite(330,185,"sprite1",13);
        this.jorge.anchor.setTo(0.5);
        this.jorge.scale.setTo(1.5,1.5);

        this.onePlayerButton = this.game.add.button(150,165,"leftArrow",function(){
          if(this.playerName.text=="Jorge"){
            this.jorge.destroy();
            this.playerName.text="Alden";
            this.alden = this.add.sprite(330,185,"sprite2",3);
            this.alden.anchor.setTo(0.5);
            this.alden.scale.setTo(1.5,1.5);

        }else if(this.playerName.text=="Alden"){
          this.alden.destroy();
          this.playerName.text="Sergio"
          this.sergio = this.add.sprite(330,185,"sprite3",1);
          this.sergio.anchor.setTo(0.5);
          this.sergio.scale.setTo(1.5,1.5);
        }else{
          this.sergio.destroy();
          this.playerName.text="Jorge"
          this.jorge = this.add.sprite(330,185,"sprite1",13);
          this.jorge.anchor.setTo(0.5);
          this.jorge.scale.setTo(1.5,1.5);
        }
        },this,1,4,2,1);
        this.onePlayerButton.anchor.setTo(0.5);
        this.onePlayerButton.scale.setTo(0.5,0.5);

        this.twoPlayerButton = this.game.add.button(510,165,"rightArrow",function(){
          if(this.playerName.text=="Jorge"){
            this.jorge.destroy();
            this.playerName.text="Sergio"
            this.sergio = this.add.sprite(330,185,"sprite3",1);
            this.sergio.anchor.setTo(0.5);
            this.sergio.scale.setTo(1.5,1.5);

        }else if(this.playerName.text=="Alden"){
          this.alden.destroy();
          this.playerName.text="Jorge"
          this.jorge = this.add.sprite(330,185,"sprite1",13);
          this.jorge.anchor.setTo(0.5);
          this.jorge.scale.setTo(1.5,1.5);
        }else{
          this.sergio.destroy();
          this.playerName.text="Alden";
          this.alden = this.add.sprite(330,185,"sprite2",3);
          this.alden.anchor.setTo(0.5);
          this.alden.scale.setTo(1.5,1.5);
        }
      },this,1,4,2,1);
        this.twoPlayerButton.anchor.setTo(0.5);
        this.twoPlayerButton.scale.setTo(0.5,0.5)

        this.playerName = this.game.add.text(260,60,"Jorge",{fontSize:"50px"});

    }


};
