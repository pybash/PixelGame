class Sprite {
    spriteImg;
    x;
    y;
    width;
    height;
    spriteX;
    spriteY;
    spriteWidth;
    spriteHeight;
    isVisible = true;
    doesRepeat = false;
    customClippingMask = 0;
    layer;
    zindex = 1;
    repeatBehavior = "all";
    repeatBoundaries = [0,0,0,0]

    constructor(url="",x=0,y=0,width=0,height=0, spriteX=0,spriteY=0, spriteWidth=0,spriteHeight=0, doesRepeat=false) {
        this.spriteImg = new Image()
        this.spriteImg.src = url;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.doesRepeat = doesRepeat;
    }
    setClippingMask(num) {
        this.customClippingMask = num;
    }
    setVisibility(boolean) {
        this.isVisible = boolean;
    }
    setPos(x,y) {
        this.spriteX = x;
        this.spriteY = y;
    }
    setRepeatBoundaries(dx,dy) {
        this.repeatBoundaries = [dx,dy]
    }
    getLayer() {
        // if(this.customClippingMask != 0 ) {
        //     return this.spriteY + this.customClippingMask
        // } else {
        //     return this.spriteY + this.spriteHeight;
        // }
        // return this.spriteY + this.spriteHeight - this.customClippingMask;
        if(this.customClippingMask != 0) {
            return this.spriteY + this.customClippingMask;
        } else {
            return this.spriteY + this.spriteHeight - this.customClippingMask;
        }
    }
    selectSpriteImage(x,y,width,height, scaleFactor=1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteWidth = width*scaleFactor;
        this.spriteHeight = height*scaleFactor;
    }
}
class AnimatedSprite {
    spriteImg; x; y; width; height; spriteX; spriteY; spriteWidth; spriteHeight; fps; onFrame = 0;
    renderInterval;
    isPlaying = true;
    isVisible = true;
    frames = [
        // {
        //     x: 0,
        //     y: 0,
        //     width: 0,
        //     height: 0,
        //     spriteWidth:0,
        //     spriteHeight:0,
        // }
    ]
    customClippingMask = 0;
    layer;
    zindex = 1;
    repeatBehavior = "all";

    constructor(url="",x=0,y=0,width=0,height=0, spriteX=0,spriteY=0, spriteWidth=0,spriteHeight=0, setFPS = 30) {
        this.spriteImg = new Image()
        this.spriteImg.src = url;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.fps = setFPS;
        this.renderInterval = setInterval(() => {
            if(this.frames.length == 0) return
            if(this.onFrame == this.frames.length) {
                this.onFrame = 0
            }
            this.x = this.frames[this.onFrame].x
            this.y = this.frames[this.onFrame].y
            this.width = this.frames[this.onFrame].width
            this.height = this.frames[this.onFrame].height
            this.spriteWidth = this.frames[this.onFrame].spriteWidth
            this.spriteHeight = this.frames[this.onFrame].spriteHeight
            this.onFrame += 1;
        },1000/this.fps)
    }
    setClippingMask(num) {
        this.customClippingMask = num;
    }
    getLayer() {
        // if(this.customClippingMask != -1 ) {
        //     return this.spriteY + this.customClippingMask
        // } else {
        //     return this.spriteY + this.spriteHeight;
        // }
        // return this.spriteY + this.spriteHeight - this.customClippingMask;
        if(this.customClippingMask != 0) {
            return this.spriteY + this.customClippingMask;
        } else {
            return this.spriteY + this.spriteHeight - this.customClippingMask;
        }
    }
    setVisibility(boolean) {
        this.isVisible = boolean;
    }
    setFPS(fps) {
        clearInterval(this.renderInterval)
        this.fps = fps;
        this.renderInterval = setInterval(() => {
            if(this.frames.length == 0) return
            if(this.onFrame == this.frames.length) {
                this.onFrame = 0
            }
            this.x = this.frames[this.onFrame].x
            this.y = this.frames[this.onFrame].y
            this.width = this.frames[this.onFrame].width
            this.height = this.frames[this.onFrame].height
            this.spriteWidth = this.frames[this.onFrame].spriteWidth
            this.spriteHeight = this.frames[this.onFrame].spriteHeight
            this.onFrame += 1;
        },1000/this.fps)
    }
    pause(atFrame=-1) {
        clearInterval(this.renderInterval)
        this.isPlaying = false;
        if(atFrame >= 0) {
            this.x = this.frames[atFrame].x
            this.y = this.frames[atFrame].y
            this.width = this.frames[atFrame].width
            this.height = this.frames[atFrame].height
            this.spriteWidth = this.frames[atFrame].spriteWidth
            this.spriteHeight = this.frames[atFrame].spriteHeight
        } else {
            this.x = this.frames[this.onFrame].x
            this.y = this.frames[this.onFrame].y
            this.width = this.frames[this.onFrame].width
            this.height = this.frames[this.onFrame].height
            this.spriteWidth = this.frames[this.onFrame].spriteWidth
            this.spriteHeight = this.frames[this.onFrame].spriteHeight
        }
    }
    resume(atFrame=-1) {
        if(this.isPlaying) return;
        this.isPlaying = true;
        if(atFrame >= 0) {
            this.onFrame = atFrame
        }
        this.renderInterval = setInterval(() => {
            if(this.frames.length == 0) return
            if(this.onFrame == this.frames.length) {
                this.onFrame = 0
            }
            this.x = this.frames[this.onFrame].x
            this.y = this.frames[this.onFrame].y
            this.width = this.frames[this.onFrame].width
            this.height = this.frames[this.onFrame].height
            this.spriteWidth = this.frames[this.onFrame].spriteWidth
            this.spriteHeight = this.frames[this.onFrame].spriteHeight
            this.onFrame += 1;
        },1000/this.fps)
    }
    setPos(x,y) {
        this.spriteX = x;
        this.spriteY = y;
    }
    addFrame(x,y,width,height, scaleFactor=1) {
        this.frames.push({
            x: x,
            y: y,
            width: width,
            height: height,
            spriteWidth: width * scaleFactor,
            spriteHeight: height * scaleFactor
        })
    }
}
