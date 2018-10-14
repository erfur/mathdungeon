var gameWidth = (document.documentElement.clientWidth - 20) / 4;
var gameHeight = (document.documentElement.clientHeight - 20) / 4;
// var blockWidth = 60;
// var blockHeight = 20;

var level2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function level2() {
            Phaser.Scene.call(this, { key: 'level2' });
        },

    preload: function preload() {
        // 60x20 16px tiles
        this.load.image('ground', 'assets/ground.png');
        this.load.image('box','assets/box.png')
        this.load.image('mark', 'assets/place.png');
        this.load.image('mark2','assets/place2.png')
        // Need to load walls seperately for collision purposes
        // 60x2 16px tiles
        this.load.image('walls_upper', 'assets/walls_upper.png');
        this.load.image('walls_lower', 'assets/walls_upper.png');
        // 1x18 16px tiles
        this.load.image('walls_left', 'assets/walls_left.png');
        this.load.image('walls_right', 'assets/walls_right.png');
        // 2x18 16px tiles
        this.load.image('walls_mid', 'assets/walls_mid.png');
        // Load the player as a spritesheet
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 19 });


        this.load.spritesheet('undead0', 'assets/undead_0.png', { frameWidth: 16, frameHeight: 12});
        this.load.spritesheet('undead1', 'assets/undead_1.png', { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('undead2', 'assets/undead_2.png', { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('undead3', 'assets/undead_3.png', { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('undead4', 'assets/undead_4.png', { frameWidth: 32, frameHeight: 27});
        this.load.spritesheet('orc0', 'assets/orc_0.png', { frameWidth: 16, frameHeight: 19});
        this.load.spritesheet('orc1', 'assets/orc_1.png', { frameWidth: 16, frameHeight: 18});
        this.load.spritesheet('orc2', 'assets/orc_2.png', { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('orc3', 'assets/orc_3.png', { frameWidth: 16, frameHeight: 12});
        this.load.spritesheet('orc4', 'assets/orc_4.png', { frameWidth: 32, frameHeight: 28});
        this.load.spritesheet('demon0', 'assets/demon_0.png', { frameWidth: 16, frameHeight: 12});
        this.load.spritesheet('demon1', 'assets/demon_1.png', { frameWidth: 16, frameHeight: 21 });
        this.load.spritesheet('demon2', 'assets/demon_2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('demon3', 'assets/demon_3.png', { frameWidth: 16, frameHeight: 17 });
        this.load.spritesheet('demon4', 'assets/demon_4.png', { frameWidth: 32, frameHeight: 32});
        // 16px ladder
        this.load.image('ladder', 'assets/ladder.png');
    },

    create: function create() {
        // Add ground
        this.add.image(60*16 / 2, 20*16 / 2, 'ground');

        // Add walls
        walls = this.physics.add.staticGroup();
        walls.create(60 * 16 / 2, 8, 'walls_upper');
        walls.create(2, 20 * 16 / 2, 'walls_left');
        walls.create(60 * 16 - 8, 20 * 16 / 2, 'walls_right');
        walls.create(20 * 16, 20 * 16 / 2-8 , 'walls_mid');
        walls.create(40 * 16, 20 * 16 / 2-8, 'walls_mid');
        walls.create(60 * 16 / 2, 20*16 - 8, 'walls_lower');

        // Add ladders
        ladder1 = this.physics.add.staticGroup();
        ladder1.create(19 * 16 - 8, 20 * 16 / 2, 'ladder');
        ladder2 = this.physics.add.staticGroup();
        ladder2.create(39 * 16 - 8, 20 * 16 / 2, 'ladder');

        // Add level ending ladder
        laddersEnd = this.physics.add.staticGroup();
        laddersEnd.create(59*16-8, 20*16/2, 'ladder');


        //Marks
        

        mark = this.physics.add.staticGroup();
        for( var i =0;i<5;i++){
            mark.create(i*32+ 25*16+8,5*16+8,'mark')
        }
        box = this.physics.add.group()
        for( var i =0;i<5;i++){
            box.create(i*32+ 25*16+8,10*16+8,'box')
        }

        // Add player
        player = this.physics.add.sprite(2*16, 10*16, 'player');

        //4 orc
        orcY = 5

        //orc0 = this.physics.add.sprite(6*16,5*16,'orc0')
        orc1 = this.physics.add.sprite(3*16,3*16,'orc1')
        orc2 = this.physics.add.sprite(3*16,4*16,'orc2')
        orc3 = this.physics.add.sprite(2*16,4*16,'orc3')
        orc4 = this.physics.add.sprite(2*16,3*16,'orc4')


        //7 demon
        demon0 = this.physics.add.sprite(13*16,3*16,'demon0')
        demon1 = this.physics.add.sprite(13*16,4*16,'demon1')
        demon2 = this.physics.add.sprite(14*16,4*16,'demon2')
        demon3 = this.physics.add.sprite(15*16,4*16,'demon3')
        demon5 = this.physics.add.sprite(14*16,3*16,'demon3')
        demon6 = this.physics.add.sprite(15*16,3*16,'demon3')
        demon4 = this.physics.add.sprite(16.5*16,3*16,'demon4')

        //5 undead
        undead0 = this.physics.add.sprite(8*16,4*16,'undead0')
        undead1 = this.physics.add.sprite(9*16,4*16,'undead1')
        undead2 = this.physics.add.sprite(8*16,3*16,'undead2')
        undead3 = this.physics.add.sprite(9*16,3*16,'undead3')
        undead4 = this.physics.add.sprite(7*16,4*16,'undead4')


        // Add player animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
            frameRate: 10,
        })
        /*
         this.anims.create({
            key: 'wait_o0',
            frames: this.anims.generateFrameNumbers('orc0',{ start: 0, end: 3}),
            frameRate: 5,
        })
        */
         this.anims.create({
            key: 'wait_o1',
            frames: this.anims.generateFrameNumbers('orc1',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_o2',
            frames: this.anims.generateFrameNumbers('orc2',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_o3',
            frames: this.anims.generateFrameNumbers('orc3',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_o4',
            frames: this.anims.generateFrameNumbers('orc4',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_d0',
            frames: this.anims.generateFrameNumbers('demon0',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_d1',
            frames: this.anims.generateFrameNumbers('demon1',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_d2',
            frames: this.anims.generateFrameNumbers('demon2',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_d3',
            frames: this.anims.generateFrameNumbers('demon3',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_d4',
            frames: this.anims.generateFrameNumbers('demon4',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_u0',
            frames: this.anims.generateFrameNumbers('undead0',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_u1',
            frames: this.anims.generateFrameNumbers('undead1',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_u2',
            frames: this.anims.generateFrameNumbers('undead2',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_u3',
            frames: this.anims.generateFrameNumbers('undead3',{ start: 0, end: 3}),
            frameRate: 5,
        })
         this.anims.create({
            key: 'wait_u4',
            frames: this.anims.generateFrameNumbers('undead4',{ start: 0, end: 3}),
            frameRate: 5,
        })



        this.anims.create({
            key: 'wait_p',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10
        })

        demon0.anims.play('wait_d0', true);
        // Collide player with the walls
        this.physics.add.collider(player,box,this.boxPlaced);
        this.physics.add.collider(box,box);
        this.physics.add.collider(player, walls);
        // Collide player with the ladder to go to the next level
        this.physics.add.collider(player, ladder1, this.nextStage1, null, this);
        this.physics.add.collider(player, ladder2, this.nextStage2, null, this);
        this.physics.add.collider(player, laddersEnd, this.nextLevel, null, this);
        //console.log(box)
        // Test text
        //text = this.add.text(16, 16, 'yusuf', { fontSize: '32px', fill: '#fff' });

        // Camera controls
        this.cameras.main.startFollow(player, true, 0.05, 0, 5);

        //Stage
        boxesPlaced = false
    },


    update: function update() {
        // Touch controls
        if (this.input.activePointer.isDown) {
            if (this.input.activePointer.x - gameWidth / 2 < 0) {
                player.flipX = true;
            } else {
                player.flipX = false;
            }
            player.setVelocityX((this.input.activePointer.x - gameWidth / 2) );
            player.setVelocityY((this.input.activePointer.y - gameHeight / 2));
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('wait_p', true);
            
        
        }
        //orc0.anims.play('wait_o0', true);
        orc1.anims.play('wait_o1', true);
        orc2.anims.play('wait_o2', true);
        orc3.anims.play('wait_o3', true);
        orc4.anims.play('wait_o4', true);
        demon0.anims.play('wait_d0', true);
        demon1.anims.play('wait_d1', true);
        demon2.anims.play('wait_d2', true);
        demon3.anims.play('wait_d3', true);
        demon4.anims.play('wait_d4', true);
        demon5.anims.play('wait_d3', true);
        demon6.anims.play('wait_d2', true);
        undead0.anims.play('wait_u0', true);
        undead1.anims.play('wait_u1', true);
        undead2.anims.play('wait_u2', true);
        undead3.anims.play('wait_u3', true);
        undead4.anims.play('wait_u4', true);
        //Boxes

        box.setVelocityX(0);
        box.setVelocityY(0);



        //Put box place

    },
    boxPlaced: function(player,box){
        childs = mark.children.entries
       for (var i = childs.length - 1; i >= 0; i--) {
            diffX = Math.abs(box.x - childs[i].x)
            diffY = Math.abs(box.y - childs[i].y)
            
                if(diffX < 8 && diffY < 8 && childs[i].texture.key != 'mark2'){
                    childs[i].setTexture('mark2')
                    all_true = true
                        for(var j = childs.length-1;j>=0;j--){
                            if(childs[j].texture.key != 'mark2'){
                                all_true = false
                            }
                        }
                        if(all_true)
                            boxesPlaced = true
                    
                }
                else if( childs[i].texture.key == 'mark2' ){
                    di = Math.pow(diffX,2)+Math.pow(diffY,2) 
                    if( di < 500 && di > 200 ){
                        childs[i].setTexture('mark')
                        boxesPlaced = false
                    }

                }            

   }
   
    },
    nextStage1: function(player,ladder){
        this.cameras.main.fadeIn(600);
        player.x += 16 * 3;
    },
    nextStage2: function (player, ladders) {
        


        if(boxesPlaced)
        {
            childs = box.children.entries
            if(childs[0].x < childs[1].x && childs[1].x < childs[2].x && childs[2].x < childs[3].x && childs[3].x < childs[4].x){ //correct order of boxes
                this.cameras.main.fadeIn(600);
                player.x += 16 * 3;
                console.log(box.children.entries[0].x)      
                StageCompleted = false                
            }
            else{ //order is not correct

            }

        }
        else{ //boxes not placed
            this.cameras.main.fadeIn(600);
           player.x -= 6*16
           player.y += 2*16
           
        }
    },

    nextLevel: function nextLevel(player, laddersEnd) {
        this.scene.start('level3');
    }

})
