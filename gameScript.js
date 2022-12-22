document.addEventListener("DOMContentLoaded", () => {
    let engine = new gameEngine(window.innerWidth,window.innerHeight - 10, 30);
    let grass = new Sprite("./resource/grasstilesheet.png")
    let treeSprite = new Sprite("./resource/grasstilesheet.png");
    let characterMoveRight = new AnimatedSprite("./resource/character.png")
    let characterMoveDown = new AnimatedSprite("./resource/character.png")
    let characterMoveLeft = new AnimatedSprite("./resource/character.png")
    let characterMoveUp = new AnimatedSprite("./resource/character.png")
    let jojamart = new Sprite("./resource/stardewvalley.png");
    let swings = new Sprite("./resource/stardewvalley.png");
    let playerText = new TextObject("Player")
    let grassPath = new Sprite("./resource/grasstilesheet.png");
    let grassPath2 = new Sprite("./resource/grasstilesheet.png");
    let grassPath3 = new Sprite("./resource/grasstilesheet.png");
    let buttonSprite = new Sprite("./resource/buttons.png")

    buttonSprite.selectSpriteImage(32,40,8,8,3);
    buttonSprite.zindex = 3;
    buttonSprite.opacity = 1

    let frameUI = new UIFrame();
    frameUI.setPos(30,30);
    frameUI.setSize(40,40)
    frameUI.backgroundColor = "#999"
    frameUI.visible = true;
    frameUI.setSprite(buttonSprite)

    


    grassPath.setPos(20,20)
    grassPath.selectSpriteImage(129,59,16,16,4)
    grassPath.zindex = 0;
    grassPath.doesRepeat = true;
    grassPath.repeatBehavior = "inbox";
    grassPath.setRepeatBoundaries(16,240)

    grassPath2.setPos(20,245)
    grassPath2.selectSpriteImage(129,59,16,16,4)
    grassPath2.zindex = 0;
    grassPath2.doesRepeat = true;
    grassPath2.repeatBehavior = "inbox";
    grassPath2.setRepeatBoundaries(1000,16)
    
    grassPath3.setPos(310,210)
    grassPath3.selectSpriteImage(129,59,16,16,4)
    grassPath3.zindex = 0;
    grassPath3.doesRepeat = true;
    grassPath3.repeatBehavior = "inbox";
    grassPath3.setRepeatBoundaries(100,16)


    playerText.fontFamily = "Verdana"
    playerText.fontSize = 20;
    playerText.color = "#fff"
    
    grass.doesRepeat = true;
    grass.selectSpriteImage(80,64,32,48, 4)

    jojamart.setPos(250,30)
    jojamart.selectSpriteImage(0,820, 256, 175, 1.4)

    let player = new Player(engine);
    player.movementSpeed = 4;
    player.addCollision(player.x + 15,player.y,35,65)
    player.setPos(400,400)


    treeSprite.setPos(90,20)
    treeSprite.selectSpriteImage(11,7,28,52,3);
    

    swings.setPos(700,100)
    swings.selectSpriteImage(115,565,77,76,2)
    swings.customClippingMask = 125
    let charFPS = 11.5;
    // Moving Right
    characterMoveRight.setFPS(charFPS);
    characterMoveRight.addFrame(0,200,50,60,1)
    characterMoveRight.addFrame(64,200,50,60,1)
    characterMoveRight.addFrame(128,200,50,60,1)
    characterMoveRight.addFrame(192,200,50,60,1)
    characterMoveRight.addFrame(256,200,50,60,1)
    characterMoveRight.addFrame(320,200,50,60,1)
    characterMoveRight.addFrame(384,200,50,60,1)
    characterMoveRight.addFrame(448,200,50,60,1)
    characterMoveRight.addFrame(512,200,50,60,1)
    // Moving Left
    let LeftOffset = 72;
    characterMoveLeft.setFPS(charFPS);
    characterMoveLeft.setPos(40,40)
    characterMoveLeft.addFrame(0,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(64,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(128,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(192,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(256,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(320,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(384,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(448,LeftOffset,50,60,1)
    characterMoveLeft.addFrame(512,LeftOffset,50,60,1)
    characterMoveLeft.setVisibility(false)
    // Moving Down
    let downOffset = 132;
    characterMoveDown.setFPS(charFPS);
    characterMoveDown.addFrame(0,downOffset,50,60,1)
    characterMoveDown.addFrame(64,downOffset,50,60,1)
    characterMoveDown.addFrame(128,downOffset,50,60,1)
    characterMoveDown.addFrame(192,downOffset,50,60,1)
    characterMoveDown.addFrame(256,downOffset,50,60,1)
    characterMoveDown.addFrame(320,downOffset,50,60,1)
    characterMoveDown.addFrame(384,downOffset,50,60,1)
    characterMoveDown.addFrame(448,downOffset,50,60,1)
    characterMoveDown.addFrame(512,downOffset,50,60,1)
    characterMoveDown.setVisibility(false)
     // Moving Up
     let upOffset = 5;
     characterMoveUp.setFPS(charFPS);
     characterMoveUp.addFrame(0,upOffset,50,60,1)
     characterMoveUp.addFrame(64,upOffset,50,60,1)
     characterMoveUp.addFrame(128,upOffset,50,60,1)
     characterMoveUp.addFrame(192,upOffset,50,60,1)
     characterMoveUp.addFrame(256,upOffset,50,60,1)
     characterMoveUp.addFrame(320,upOffset,50,60,1)
     characterMoveUp.addFrame(384,upOffset,50,60,1)
     characterMoveUp.addFrame(448,upOffset,50,60,1)
     characterMoveUp.addFrame(512,upOffset,50,60,1)
     characterMoveUp.setVisibility(false)

    player.hookMovement(engine)
    engine.onUpdate(() => {
        characterMoveRight.setPos(player.x, player.y)
        characterMoveLeft.setPos(player.x,player.y)
        characterMoveDown.setPos(player.x,player.y)
        characterMoveUp.setPos(player.x,player.y)
    })

    function hideAnimations(exclude) {
        characterMoveDown.setVisibility(false)
        characterMoveRight.setVisibility(false)
        characterMoveLeft.setVisibility(false)
        characterMoveUp.setVisibility(false)
        exclude.setVisibility(true)
    }

    engine.onUpdate(() => {
        if(!player.moving.down && !player.moving.up && !player.moving.left && !player.moving.right) {
            characterMoveRight.pause(0);
            characterMoveLeft.pause(0)
            characterMoveDown.pause(0)
            characterMoveUp.pause(0)
        } else {
            if(player.moving.right) {
                hideAnimations(characterMoveRight);
                characterMoveRight.resume();
            }
            if(player.moving.left) {
                hideAnimations(characterMoveLeft);
                characterMoveLeft.resume();
            }
            if(player.moving.down) {
                hideAnimations(characterMoveDown)
                characterMoveDown.resume();
            }
            if(player.moving.up) {
                hideAnimations(characterMoveUp);
                characterMoveUp.resume()
            }
        }

    })
    engine.appendObject(treeSprite)
    engine.appendObject(jojamart)
    engine.appendObjects([characterMoveRight, characterMoveLeft, characterMoveDown, characterMoveUp])    
    engine.appendObject(swings)
    engine.addCollision(250,100, 256*1.4,80*1.4);
    engine.appendObjects([grassPath,grassPath2,grassPath3])
    engine.appendObject(frameUI);
    engine.addCollision(130,120,20,2)
    // engine.highlightCollisions();
    // player.highlightCollisions()


    engine.onUpdate(() => {
        
        engine.fillStyle("#fff")
        engine.fillRect(0,0,engine.width,engine.height)
        // engine.drawImage(img, 0,0,90,90, options={repeats:true})
        engine.drawSprite(grass);
        // engine.drawSprite(treeSprite)
        // engine.drawSprite(jojamart)

    })
    // engine.onUpdate(() => {
    //     playerText.x = player.x + 10
    //     playerText.y = player.y + 80
    //     engine.fillOutline(player.x + 10,player.y,40,60, "#131013", "#f542e9", 2)
    //     engine.fillText(playerText)
    // }, "highlightPlayer", -1, onTop=true)

    engine.addKey("/", "keypress", () => {
        engine.highlightCollisions()
    })
    engine.addKey(".", "keypress", () => {
        player.highlightCollisions()
    })
   
}) 