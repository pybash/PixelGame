class TextObject {
    fontFamily;
    fontSize;
    color;
    text;
    x;y;
    constructor(text="", x=0,y=0, fontFamily="Verdana", fontSize=14, color="#fff") {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize + "px";
        this.color = "#fff"
        this.text = text;
        this.x = x;
        this.y = y;
    }
}