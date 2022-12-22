function compare( a, b ) {
    if ( a.getLayer() < b.getLayer() ){
      return -1;
    }
    if (a.getLayer() > b.getLayer()) {
      return 1;
    }
    return 0;
  }
  function isCollide(a, b) {
    return !(
        ((a[1] + a[3]) < (b[1])) ||
        (a[1] > (b[1] + b[3])) ||
        ((a[0] + a[2]) < b[0]) ||
        (a[0]> (b[0] + b[2]))
    );
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

  

class gameEngine {
    width = 200;
    height = 200;
    ctx;
    onRender = []
    onRenderPriority = []
    canvasElem;
    keyListeners = {
        "key": {
            "keypress": [],
            "keydown": [],
            "keyup": []
        }
    };
    collisionEnvironment = [
        
    ]
    worldEnvironment = [

    ]
    zIndexes = {}
    uiEnvironment = [

    ]
    engineFPS;
    highlightingCollisions = false;


    constructor(width=200,height=200, setFPS=60) {
        this.width = width;
        this.height = height;
        var canvas = document.createElement("canvas");
        this.canvasElem = canvas;
        canvas.setAttribute("height", this.height);
        canvas.setAttribute("width", this.width);
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.engineFPS = setFPS;
        setInterval(() => {
            // rec1 = {
            //     left: r1[0],
            //     right: r1[0] + r1[2],
            //     top: r1[1],
            //     bottom: r1[1] + r1[3]
            // }
            // rec2 = {
            //     left: r2[0],
            //     right: r2[0] + r2[2],
            //     top: r2[1],
            //     bottom: r2[1] + r2[3]
            // }
            // Check Collisions
            let lastCollision = this.collisionEnvironment;
            for(let x = 0; x < this.onRender.length; x++) {
                this.onRender[x]["_callback"]();
            }
            
            let allZindexes = Object.keys(this.zIndexes);
            for(let x = 0; x < allZindexes.length; x++) {
                this.zIndexes[allZindexes[x]].sort(compare)
                // this.fillRect(this.worldEnvironment[x].spriteX, this.worldEnvironment[x].spriteY + this.worldEnvironment[x].height, 10, 10 )
                for(let sprite = 0; sprite < this.zIndexes[allZindexes[x]].length; sprite++) {
                    this.drawSprite(this.zIndexes[allZindexes[x]][sprite])
                }
            }
            for(let x = 0; x < this.onRenderPriority.length; x++) {
                this.onRenderPriority[x]["_callback"]();
            }
            for(let x = 0; x < this.collisionEnvironment.length; x++) {
                for(let b = x + 1; b < lastCollision.length; b++) {
                    if(isCollide(this.collisionEnvironment[x], lastCollision[b])) {
                        console.log("collision!")
                        this.fillRect(lastCollision[b][0], lastCollision[b][1], lastCollision[b][2], lastCollision[b][3])
                        this.fillRect(lastCollision[x][0], lastCollision[x][1], lastCollision[x][2], lastCollision[x][3])
                        this.collisionEnvironment[x][5] (lastCollision[x][0], lastCollision[x][1])

                    }

                }
            }

            for(let x = 0; x < this.uiEnvironment.length; x++) {
                let uiElem = this.uiEnvironment[x];
                if(uiElem.visible) {
                    if(uiElem.spriteClass != undefined) {
                        this.drawSprite(uiElem.spriteClass)
                    } else {
                        this.fillStyle(uiElem.backgroundColor);
                        this.fillRect(uiElem.x,uiElem.y,uiElem.width,uiElem.height);
                        this.fillStyle("#fff");
                    }                
                }
            }

        },1000/this.engineFPS)
        document.addEventListener("keypress", (e) => {
            let keyCode = e.key.toLowerCase()
            e.preventDefault()
            if(this.keyListeners[keyCode] !== undefined && this.keyListeners[keyCode]["keypress"] !== undefined && this.keyListeners[keyCode]["keypress"].length > 0) {
                for(let x = 0; x < this.keyListeners[keyCode]["keypress"].length; x++) {
                    this.keyListeners[keyCode]["keypress"][x]();
                }
            }
        })
        document.addEventListener("keyup", (e) => {
            let keyCode = e.key.toLowerCase()

            if(this.keyListeners[keyCode] !== undefined && this.keyListeners[keyCode]["keyup"] !== undefined && this.keyListeners[keyCode]["keyup"].length > 0) {
                for(let x = 0; x < this.keyListeners[keyCode]["keyup"].length; x++) {
                    this.keyListeners[keyCode]["keyup"][x]();
                }
            }
        })
        document.addEventListener("keydown", (e) => {
            let keyCode = e.key.toLowerCase()
            if(this.keyListeners[keyCode] !== undefined && this.keyListeners[keyCode]["keydown"] !== undefined && this.keyListeners[keyCode]["keydown"].length > 0) {
                for(let x = 0; x < this.keyListeners[keyCode]["keydown"].length; x++) {
                    this.keyListeners[keyCode]["keydown"][x]();
                }
            }
        })
        canvas.addEventListener('mousedown', (e) => {
            getCursorPosition(canvas, e)
        })
        this.ctx.imageSmoothingEnabled = false
    }
    fillStyle(hex) {
        this.ctx.fillStyle = hex;
    }
    fillRect(x=0,y=0,width=0,height=0) {
        this.ctx.fillRect(x,y,width,height);
    }
    onUpdate(_callback,id="",priority=-1, onTop=false) {
        let construct = {
            "_callback": _callback
        }
        if(id != "") {
            construct.id = id
        }
        if(!onTop) {
            if(priority < 0) {
                this.onRender.push(construct)
            } else {
                this.onRender.splice(priority, 0, construct)
            }
        } else {
            if(priority < 0) {
                this.onRenderPriority.push(construct)
            } else {
                this.onRenderPriority.splice(priority, 0, construct)
            }
        }
    }
    addKey(keyName, keyListen, _callback) {
        if(this.keyListeners[keyName] == undefined)
            this.keyListeners[keyName] = {}
        
        if(this.keyListeners[keyName][keyListen] == undefined)
            this.keyListeners[keyName][keyListen] = []
        
        this.keyListeners[keyName][keyListen].push(_callback)
    }
    drawImage(url,x=0,y=0,width=0,height=0, options={
        repeats: false
    }) {

        if(!options.repeats) {
            this.ctx.drawImage(url,x,y,width,height);
        } else {
            for(let xA = 0; xA < this.width; xA += width) {
                for(let yA = 0; yA < this.height; yA += height) {
                    this.ctx.drawImage(url,xA,yA,width,height);
                }
            }
        }
    }
    drawSprite(spriteClass) {
        this.ctx.globalAlpha = spriteClass.opacity

        if(spriteClass.isVisible) {
            if(spriteClass.doesRepeat) {
                if(spriteClass.repeatBehavior == "all") {
                    for(let xA = 0; xA < this.width; xA += spriteClass.spriteWidth) {
                        for(let yA = 0; yA < this.height; yA += spriteClass.spriteHeight) {
                            this.ctx.drawImage(spriteClass.spriteImg, spriteClass.x, spriteClass.y, spriteClass.width, spriteClass.height, xA, yA, spriteClass.spriteWidth, spriteClass.spriteHeight)
                        }
                    }
                } else if(spriteClass.repeatBehavior == "inbox") {
                    for(let xA = spriteClass.spriteX; xA < spriteClass.spriteX + spriteClass.repeatBoundaries[0]; xA += spriteClass.width) {
                        for(let yA = spriteClass.spriteY; yA < spriteClass.spriteY + spriteClass.repeatBoundaries[1]; yA += spriteClass.height) {
                            this.ctx.drawImage(spriteClass.spriteImg, spriteClass.x, spriteClass.y, spriteClass.width, spriteClass.height, xA, yA, spriteClass.spriteWidth, spriteClass.spriteHeight)
                        }
                    }
                }
            } else {
                this.ctx.drawImage(spriteClass.spriteImg, spriteClass.x, spriteClass.y, spriteClass.width, spriteClass.height, spriteClass.spriteX, spriteClass.spriteY, spriteClass.spriteWidth, spriteClass.spriteHeight)
            }
        }
        // if(spriteClass.isVisible) {
        //     // Promise.all([
        //     //     createImageBitmap(spriteClass.spriteImg, spriteClass.spriteX, spriteClass.spriteY, spriteClass.width, spriteClass.height)
        //     // ]).then((sprites) => {
        //     //     sprites.forEach(obj => {
        //     //         this.ctx.drawImage(obj, spriteClass.x, spriteClass.y)
        //     //     })
        //     // })
        // }
        this.ctx.globalAlpha = 1
    }
    drawSpriteCollection(spriteCollection) {
        for(let x = 0; x < spriteCollection.length; x++) {
            this.drawSprite(spriteCollection[x])
        }
    }

    addCollision(x,y,dx,dy, id="", _callback) {
        this.collisionEnvironment.push([x,y,dx,dy, id, _callback])
    }

    updateCollision(x,y,dx,dy, id="") {
        for(let xA = 0; xA < this.collisionEnvironment.length; xA++) {
            if(this.collisionEnvironment[xA][4] == id) {
                this.collisionEnvironment[xA][0] = x;
                this.collisionEnvironment[xA][1] = y;
                this.collisionEnvironment[xA][2] = dx;
                this.collisionEnvironment[xA][3] = dy;
            }
        }
    }

    getCollision(id) {
        for(let xA = 0; xA < this.collisionEnvironment.length; xA++) {
            if(this.collisionEnvironment[xA][4] == id) {
                return this.collisionEnvironment[xA];
            }
        }
        return undefined
    }
    
    fillOutline(x=0,y=0,dx=0,dy=0, fillInside="",fillOutside="#fff", strokeWidth=2) {
        // Fill Inside
        if(fillInside != "") {
            this.ctx.globalAlpha = 0.3
            this.fillStyle(fillInside)
            this.fillRect(x,y,dx,dy);
            this.ctx.globalAlpha = 1;
        }
        if(fillOutside != "") {
            this.fillStyle(fillOutside);
            this.fillRect(x,y,dx,strokeWidth);
            this.fillRect(x,y + dy,dx,strokeWidth);
            this.fillRect(x,y,strokeWidth,dy);
            this.fillRect(x + dx,y,strokeWidth,dy);
        }
    }

    fillText(textClass) {
        this.ctx.font = textClass.fontSize + "px " + textClass.fontFamily;
        this.ctx.fillStyle = textClass.color;
        this.ctx.fillText(textClass.text, textClass.x, textClass.y);
        this.ctx.fillStyle = "#fff"
    }

    appendObject(object) {
        if(object instanceof UIFrame) {
            this.uiEnvironment.push(object);
            return;
        }

        let index = this.worldEnvironment.push(object)

        if(this.zIndexes[object.zindex] == undefined) {
            this.zIndexes[object.zindex] = []
        }
        this.zIndexes[object.zindex].push(this.worldEnvironment[index - 1])
    }
    appendObjects(list) {
        for(let x = 0; x < list.length; x++) {
            // let index = this.worldEnvironment.push(list[x])

            // if(this.zIndexes[list[x].zindex] == undefined) {
            //     this.zIndexes[list[x].zindex] = []
            // }
            // this.zIndexes[list[x]["zindex"]].push(this.worldEnvironment[index - 1])
            this.appendObject(list[x])
        }
    }
    removeUpdate(id) {
        for(let x =0; x < this.onRender.length; x++) {
            if(this.onRender[x]["id"] == id) {
                this.onRender.splice(x, 1);
            }
        }
        for(let x =0; x < this.onRenderPriority.length; x++) {
            if(this.onRenderPriority[x]["id"] == id) {
                this.onRenderPriority.splice(x, 1);
            }
        }
    }
    highlightCollisions() {
        if(this.highlightingCollisions) {
            this.highlightingCollisions = false;
            this.removeUpdate("highlightCollisions")
            return;
        }
        this.onUpdate(()=> {
            for(let x = 0; x < this.collisionEnvironment.length; x++) {
                this.fillOutline(this.collisionEnvironment[x][0],this.collisionEnvironment[x][1], this.collisionEnvironment[x][2], this.collisionEnvironment[x][3], "#131013", "#54c0ff", 2)
                this.fillStyle("#54c0ff")
                this.fillRect(this.collisionEnvironment[x][0], this.collisionEnvironment[x][1] + this.collisionEnvironment[x][3], 120, 20)
                this.fillStyle("#fff")
                let collisionTag = new TextObject("Collision ID:" + x)
                collisionTag.fontSize = 14
                collisionTag.x = this.collisionEnvironment[x][0] + 5
                collisionTag.y = this.collisionEnvironment[x][1] + this.collisionEnvironment[x][3] + 16
                collisionTag.color = "#000"
                this.fillText(collisionTag)
            }
        }, "highlightCollisions", -1, true)
        this.highlightingCollisions = true;
    }
    checkCollisions(collisonBoxes) {
        for(let x = 0; x < this.collisionEnvironment.length; x++) {
            for(let b = 0; b < collisonBoxes.length; b++) {
                if(isCollide(this.collisionEnvironment[x], collisonBoxes[b])) {
                    console.log("collision!")
                    return true;
                }

            }
        }
        return false;
    }
}