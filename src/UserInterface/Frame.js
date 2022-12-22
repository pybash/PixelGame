class UIFrame {
    x;y;
    width;height;
    children = []
    #storedParent = ""
    visible = true;
    backgroundColor = "#fff"
    spriteClass = undefined;

    set Parent(parentName) {
        this.#storedParent = parentName;
    }
    constructor(x=0,y=0,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setSprite(spriteClass) {
        spriteClass.spriteX = this.x
        spriteClass.spriteY = this.y
        this.spriteClass = spriteClass;
    }

    setPos(x=this.x,y=this.y) {
        this.x = x;
        this.y = y;
        if(this.spriteClass != undefined) {
            this.spriteClass.spriteX = x;
        this.spriteClass.spriteY = y;
        }
    }

    setSize(width=this.width,height=this.height) {
        this.width = width;
        this.height = height;
    }

}