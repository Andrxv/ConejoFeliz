
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    bomb: [],
    carrots: [],
    points: 0,
    pointsLbl: null,
    
    
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
        
        this.pointsLbl = new cc.LabelTTF('Points: 0',  'Arial', 16);
        this.pointsLbl.attr({
            anchorX: 0,
            anchorY: 0
        });
        this.pointsLbl.setColor(cc.color(255,255,255, 100));
    
    
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
    
    MkBomb : function(){
        //Add bombs
		var bomb = new cc.Sprite(res.bomba_png);
        var place = this.random(270,680)
        var move = cc.moveTo(this.random(2,5), place, 60);
        var rtcBomb = bomba.getBoundingBox();

        bomb.setPosition(place, 790);
        this.addChild(bomb, 1)   
		bomba.runAction(move);
		this.bomba.push(bomb);
        
        
	},

    
    MkCarrot : function(){
        //add carrots
		var carrot = new cc.Sprite(res.carrot_png);
        var place = this.random(270,690);
        var move = cc.moveTo(this.random(2,5), place, 70);
		
        carrot.setPosition(place, 790);
        this.addChild(carrot, 1);
        carrot.runAction(move);
        this.carrots.push(carrot);		
	},


        return true;
    },
    
    //carrot movement
    var carrot = cc.Sprite.extend({
    	
    ctor: function(y){
    	
        this._super(res.carrot_png);
        this.scheduleUpdate();
        this.attr({
            y: y
        });
        return true;
    },
    
    update: function(dt) {
    	
        this.onUpdate();
        this.runAction(cc.moveBy(0.5, cc.p(0, -getRandomArbitrary(1, 10))));
        
        if(this.y <= 0){
        	
            this.removeFromParent(true);
        }
    },
    
    // bomb movement
    var bomb = cc.Sprite.extend({
    	
    ctor: function(y){
    	
        this._super(res.bomba_png);
        this.scheduleUpdate();
        this.attr({
            y: y
        });
        return true;
    },
    update: function(dt) {
    	
        this.onUpdate();
        this.runAction(cc.moveBy(0.5, cc.p(0, -getRandomArbitrary(1, 10))));
        
        if(this.y <= 0){
        	
            manager.addPoint(1);
            this.removeFromParent(true);
            this.onBoom();
        }
    },
    
    //adds the point effect
    point : function(x, y){
    	
        var poi = new cc.ParticleSystem(res.czanahora_plist);
        point.setDuration(0.1);
        point.setScale(0.7);
        point.setTexture(cc.textureCache.addImage(res.zanahoria_png));
        point.setPosition(x, y);
        this.addChild(poi,3);
    
    //adds the explotion effect
    explosion : function(x, y){
        var exp = new cc.ParticleSystem(res.explosion_plist);
        explosion.setDuration(0.1);
        explosion.setScale(0.44);
        explosion.setTexture(cc.textureCache.addImage(res.explosion_png));
        explosiom.setPosition(x, y);
        this.addChild(exp,3);
    },
    
    
    
    colissions : function (){
     
    var place = this.sprConejo.getBoundingBox();
      
    //collision with bombs
    for(var i = 0 ; i < this.bomb.length; i++){
    	
          var place2 = this.bomb[i].getBoundingBox();
          
          if(place.x < place2.x + place2.width && place.x + place.width > place2.x && 
            place.y < place2.y + place2.height &&place.y + place.height > place2.y){
            	
            this.explosion(this.bomb[i].getPositionX(), this.bomb[i].getPositionY());

  
            }
            this.removeChild(this.bomb[i]);
            this.bomb.splice(i,1);
         }

	//collisions with carrots
	for(var i = 0 ; i < this.bomb.length; i++){
	    var place2 = this.carrots[i].getBoundingBox();
	    if(place.x < place2.x + place2.width && place.x + place.width > place2.x && 
	        place.y < place2.y + place2.height &&place.y + place.height > place2.y){
	    
	    this.point(this.carrots[i].getPositionX(), this.carrots[i].getPositionY());    	
	        	
	    this.removeChild(this.carrots[i]);
            this.carrots.splice(i,1);
            points++
		
      }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


