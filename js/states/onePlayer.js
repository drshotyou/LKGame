var KLS = KLS || {};

KLS.onePlayer = {

  init: function(level,playerName) {

    this.currentLevel = level || 'level1';
    this.playerName = playerName;

    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 500;
    this.BOUNCING_SPEED = 150;
    this.Score = 0;

    //gravity
    this.game.physics.arcade.gravity.y = 1000;

    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.esc = this.game.input.keyboard.ESC;
  },
  preload: function(){
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('goal', 'assets/images/goal.png');
    this.load.image('slime', 'assets/images/slime.png');
    this.load.image('coin', 'assets/images/coin.png');
    this.load.spritesheet('fly', 'assets/images/fly_spritesheet.png', 35, 18, 2, 1, 2);
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image("pause","assets/images/pause.png");
    this.load.spritesheet("button","assets/images/button.png",361,176,4,0,23);


    this.load.spritesheet("Jorge","assets/images/jorge.png",80,110,24);
    this.load.spritesheet("Alden","assets/images/alden.png",80,110,24);
    this.load.spritesheet("Sergio","assets/images/sergio.png",80,110,24);

    this.load.image('background', 'assets/images/background.png');
    this.load.image('underground', 'assets/images/underground.png');
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
    this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);

  },
  create: function() {

    this.scoreText = this.game.add.text(30,10,"Score:")
    this.scoreText.fixedToCamera = true;
    this.scoreNum = this.game.add.text(120,10,"0")
    this.scoreNum.fixedToCamera = true;

    this.timeText = this.game.add.text(30,40,"Time:");
    this.timeText.fixedToCamera = true;
    this.timeLeft = this.game.add.text(120,40,"100");
    this.timeLeft.fixedToCamera = true;
    this.timer = this.game.time.create(false);
    this.timer.add(100000,this.timer,this);
    this.timer.start();


    this.pauseText = this.game.add.text(600,20,"Pause");
    this.pauseText.inputEnabled = true;
    this.pauseText.fixedToCamera= true;
    this.pauseText.alpha = 0.5
    this.pauseText.events.onInputUp.add(function(){
      this.game.paused= true;
      this.pause=this.game.add.sprite(this.scoreText.x+280,this.scoreText.y+120,"pause");
      this.pause.scale.setTo(0.4);
      this.pause.anchor.setTo(0.4);
      this.pause.fixedToCamera = true;
      this.pauseText = this.game.add.text(this.pause.x+15,this.pause.y-34,"Paused",{fontSize:"25px"});
      this.pauseText.anchor.setTo(0.4);
      this.descriptionText = this.game.add.text(this.pause.x+7,this.pause.y+47,"Click anywhere to continue",{fontSize:"20px"});
      this.descriptionText.anchor.setTo(0.4);


    },this);

    this.game.input.onDown.add(this.unpause,this);

    //load current level
    this.loadLevel();

    //show on-screen touch controls
    this.createOnscreenControls();
  },
  timer: function(){
   this.gameOver();
  },
  unpause: function(){
    if(this.game.paused){
      this.game.paused=false;
      this.pause.destroy();
      this.pauseText.destroy();
      this.descriptionText.destroy();
    }
  },

  update: function() {

    this.scoreNum.text = this.Score.toString();
    this.timeLeft.text = this.timer.duration.toFixed(0);

    //collision between the player, enemies and the collision layer
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
    this.game.physics.arcade.collide(this.enemies, this.collisionLayer);
    this.game.physics.arcade.collide(this.coins, this.collisionLayer);

    //collision between player and enemies
    this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);

    this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

    //overlap between player and goal
    this.game.physics.arcade.overlap(this.player, this.goal, this.changeLevel, null, this);

    //generic platformer behavior (as in Monster Kong)
    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-0.4, 0.4);
      this.player.play('walking');
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(0.4, 0.4);
      this.player.play('walking');
    }
    else {
      this.player.animations.stop();
      this.player.frame = 0;
    }

    if((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
      this.player.frame = 1;
    }


    //kill enemy if it falls off
    if(this.player.bottom == this.game.world.height){
      this.gameOver();
    }
  },
  loadLevel: function(){
    //create a tilemap object
    this.map = this.add.tilemap(this.currentLevel);

    //join the tile images to the json data
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
    this.map.addTilesetImage('background', 'background');
    this.map.addTilesetImage('underground', 'underground');

    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');

    this.game.world.sendToBack(this.collisionLayer);
    //send background to the back
    this.game.world.sendToBack(this.backgroundLayer);

    //collision layer should be collisionLayer
    this.map.setCollisionBetween(1, 160, true, 'collisionLayer');

    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();

    //create the goal
    var goalArr = this.findObjectsByType('goal', this.map, 'objectsLayer');
    this.goal = this.add.sprite(goalArr[0].x, goalArr[0].y, goalArr[0].properties.key);
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;
    this.goal.nextLevel = goalArr[0].properties.nextLevel;

    //create player
    var playerArr = this.findObjectsByType('player', this.map, 'objectsLayer');
    this.player = this.add.sprite(playerArr[0].x, playerArr[0].y, this.playerName,10);
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.4);
    this.player.animations.add('walking', [10, 0, 10, 9], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;
    this.player.body.height = this.player.height;

    //follow player with the camera
    this.game.camera.follow(this.player);

    //create enemies
    this.enemies = this.add.group();
    this.coins = this.add.group();
    this.createEnemies();
    this.createCoins();
    this.coins.forEach(function(coin){
      coin.body.allowGravity = false;
    },this)

  },
  createOnscreenControls: function(){
    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowButton');
    this.rightArrow = this.add.button(110, this.game.height - 60, 'arrowButton');
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);
  },
  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];

    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight;
        result.push(element);
      }
    }, this);

    return result;
  },
  changeLevel: function(player, goal){
    this.game.state.start('onePlayer', true, false, goal.nextLevel,this.playerName);
  },
  createEnemies: function(){
    var enemyArr = this.findObjectsByType('enemy', this.map, 'objectsLayer');
    var enemy;

    enemyArr.forEach(function(element){
      enemy = new KLS.Enemy(this.game, element.x, element.y, 'slime', +element.properties.velocity, this.map);
      this.enemies.add(enemy);
    }, this);
  },
  createCoins: function(){

  var coinArr = this.findObjectsByType('coin',this.map,'objectsLayer');
    var coin;

    coinArr.forEach(function(element){
      coin= new KLS.Enemy(this.game,element.x,element.y,'coin',+element.properties.velocity,this.map);
      this.coins.add(coin);
    },this);
  },
  hitEnemy: function(player, enemy){
    if(enemy.body.touching.up){
      this.Score+=10;
      enemy.kill();
      player.body.velocity.y = -this.BOUNCING_SPEED;
    }
    else {
      this.gameOver();
    }
  },
  collectCoin: function(player, coin){
    this.Score +=5;
    coin.kill();
  },
  gameOver: function(){
    this.game.state.start('onePlayer', true, false, this.currentLevel,this.playerName);
  }//,
//  render: function(){
  //  this.game.debug.body(this.player);
//  }

};
