
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla

var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    bomb: [],
    carrots: [],
    
    
    function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
    
    
        //Handles the movement with keyboard input ~
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                
                var gam = event.getCurrentTarget();
                //right
                if(keyCode === 39 && gam.Bunny.x < 670){    
                    gam.Bunny.x += 10;
                }
                //left
                if(keyCode === 37 && gam.Bunny.x > 270){      
                    gam.Bunny.x -= 10;
                }
            }
        }, this);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

