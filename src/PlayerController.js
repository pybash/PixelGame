class Player {
    x; y; id;
    engineRef;
    localCollisionBoxes = []
    globalCollisionBoxes = []
    highlightingCollisions = false;

    moving = {
        down: false,
        up: false,
        left: false,
        right: false
    }
    movementSpeed = 1;
    constructor(engineRef, x=0,y=0, id="", overrideDefaultCollision=false) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.engineRef = engineRef;
    }

    addCollision(xA,yA,dx,dy) {
        this.localCollisionBoxes.push([xA,yA,dx,dy])
    }
    highlightCollisions() {
        if(this.highlightingCollisions) {
            this.highlightingCollisions = false;
            this.engineRef.removeUpdate("highlightPlayerCollisions");
            return
        }
        this.engineRef.onUpdate(() => {
            for(let x = 0; x < this.globalCollisionBoxes.length; x++) {
                this.engineRef.fillOutline(this.globalCollisionBoxes[x][0],this.globalCollisionBoxes[x][1],this.globalCollisionBoxes[x][2],this.globalCollisionBoxes[x][3],"#131013", "#f542e9", 2)
                
            }
        }, "highlightPlayerCollisions", -1, true)
        this.highlightingCollisions = true;
    }

    _translateCollisions(x=0,y=0) {
        let clonedGlobal = JSON.parse(JSON.stringify(this.globalCollisionBoxes))
        for(let xA =0; xA < clonedGlobal.length; xA++) {
            clonedGlobal[xA][0] += x;
            clonedGlobal[xA][1] += y;
        }
        return clonedGlobal
    }
    setPos(x,y) {
        this.x = x;
        this.y = y;
    }

    hookMovement(engine) {
        engine.addKey("s", "keydown", () => {
            this.moving.down = true;
        })
        engine.addKey("w", "keydown", () => {
            this.moving.up = true;
        })
        engine.addKey("a", "keydown", () => {
            this.moving.left = true;
        })
        engine.addKey("d", "keydown", () => {
            this.moving.right = true;
        })
        engine.addKey("s", "keyup", () => {
            this.moving.down = false;
        })
        engine.addKey("w", "keyup", () => {
            this.moving.up = false;
        })
        engine.addKey("a", "keyup", () => {
            this.moving.left = false;
        })
        engine.addKey("d", "keyup", () => {
            this.moving.right = false;
        })
        engine.onUpdate(() => {
            let updatedCollisions = JSON.parse(JSON.stringify(this.localCollisionBoxes))
            for(let x = 0; x < this.localCollisionBoxes.length; x++) {
                // updatedCollisions.push([
                //     this.x + this.localCollisionBoxes[x][0],
                //     this.y + this.localCollisionBoxes[x][1],
                //     this.localCollisionBoxes[x][2],
                //     this.localCollisionBoxes[x][3],
                    
                // ])
                updatedCollisions[x][0] = this.x + this.localCollisionBoxes[x][0];
                updatedCollisions[x][1] = this.y + this.localCollisionBoxes[x][1];
            }
            this.globalCollisionBoxes = updatedCollisions;

            if(this.moving.down) {
                if(!this.engineRef.checkCollisions(this._translateCollisions(0, +this.movementSpeed))) {
                    this.y+=this.movementSpeed
                }

            };
            if(this.moving.up) {
                if(!this.engineRef.checkCollisions(this._translateCollisions(0, -this.movementSpeed))) {
                    this.y-=this.movementSpeed
                }
            };
            if(this.moving.left) {
                if(!this.engineRef.checkCollisions(this._translateCollisions(-this.movementSpeed, 0))) {
                    this.x-=this.movementSpeed
                }
            };
            if(this.moving.right) {
                if(!this.engineRef.checkCollisions(this._translateCollisions(this.movementSpeed,0))) {
                    this.x+=this.movementSpeed
                }
            };
        })
    }
}