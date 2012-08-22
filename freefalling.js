if (!window.lib) { window.lib = {}; }

var p; // shortcut to reference prototypes

// stage content:
(lib.freefalling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);


	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(Tween.get(this).wait(0).call(this.frame_0).wait(36));

	// score
	this.score_txt = new Text("", "25px Zapfino", "#333333");
	this.score_txt.textBaseline = "top";
	this.score_txt.lineHeight = 27;
	this.score_txt.lineWidth = 132;
	this.score_txt.setTransform(845,9.3);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.score_txt}]}).wait(36));

	// background
	this.instance = new lib.watermelon_bgjpegcopy();
	this.instance.setTransform(0,0,0.781,0.813);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance}]}).wait(36));

}).prototype = p = new MovieClip();

p.constructor = lib.freefalling;
p.nominalBounds = new Rectangle(0,0,1000,650);


// symbols:
(lib.Tween23 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.dog();
	this.instance.setTransform(-57.4,-51.4);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween23;
p.nominalBounds = new Rectangle(-57.4,-51.4,115,103);

(lib.Tween22 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.dog();
	this.instance.setTransform(-57.4,-51.4);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween22;
p.nominalBounds = new Rectangle(-57.4,-51.4,115,103);

(lib.Tween21 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.girl();
	this.instance.setTransform(-65.9,-102.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween21;
p.nominalBounds = new Rectangle(-65.9,-102.9,132,206);

(lib.Tween20 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.girl();
	this.instance.setTransform(-65.9,-102.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween20;
p.nominalBounds = new Rectangle(-65.9,-102.9,132,206);

(lib.Tween19 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.parachute();
	this.instance.setTransform(0.1,0,1.064,1.217,0,0,0,124.5,148);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween19;
p.nominalBounds = new Rectangle(-132.4,-180,265,360.2);

(lib.Tween18 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.parachute();
	this.instance.setTransform(0.1,0,1.064,1.217,0,0,0,124.5,148);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween18;
p.nominalBounds = new Rectangle(-132.4,-180,265,360.2);

(lib.Tween17 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.watermelon_trans();
	this.instance.setTransform(-43.9,-37.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween17;
p.nominalBounds = new Rectangle(-43.9,-37.9,88,76);

(lib.Tween16 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.watermelon_trans();
	this.instance.setTransform(-43.9,-37.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween16;
p.nominalBounds = new Rectangle(-43.9,-37.9,88,76);

(lib.Tween15 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.mihai_image();
	this.instance.setTransform(-83.9,-107.9);

	this.shape = new Shape();
	this.shape.graphics.f("#0066cc").p("AB7h5QgzgyhIAAQhGAAgzAyQgyAzAABGQAABIAyAzQAzAyBGAAQBIAAAzgyQAygzAAhIQAAhGgygz").f();
	this.shape.setTransform(18.4,18.4);

	this.addChild(this.shape,this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween15;
p.nominalBounds = new Rectangle(-83.9,-107.9,168,216);

(lib.Tween14 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.mihai_image();
	this.instance.setTransform(-83.9,-107.9);

	this.shape = new Shape();
	this.shape.graphics.f("#0066cc").p("AAAirQhGAAgzAyQgyAzAABGQAABIAyAzQAzAyBGAAQBIAAAzgyQAygzAAhIQAAhGgygzQgzgyhIAA").f();
	this.shape.setTransform(18.4,18.4);

	this.addChild(this.shape,this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween14;
p.nominalBounds = new Rectangle(-83.9,-107.9,168,216);

(lib.Tween13 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.kevin_img();
	this.instance.setTransform(-68.4,-105.4);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween13;
p.nominalBounds = new Rectangle(-68.4,-105.4,137,211);

(lib.Tween12 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.kevin_img();
	this.instance.setTransform(-68.4,-105.4);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween12;
p.nominalBounds = new Rectangle(-68.4,-105.4,137,211);

(lib.Tween11 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.thumbs();
	this.instance.setTransform(0,0.2,0.256,0.288,0,-24.4,155.6,175.1,161.8);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween11;
p.nominalBounds = new Rectangle(-60,-60.8,120.1,121.8);

(lib.Tween10 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.thumbs();
	this.instance.setTransform(0,0.2,0.256,0.288,0,-24.4,155.6,175.1,161.8);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween10;
p.nominalBounds = new Rectangle(-60,-60.8,120.1,121.8);

(lib.Tween9 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.thumbs();
	this.instance.setTransform(0.1,0.1,0.28,0.288,30,0,0,175.1,161.5);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween9;
p.nominalBounds = new Rectangle(-65.7,-64.7,131.5,129.6);

(lib.Tween8 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.thumbs();
	this.instance.setTransform(0.1,0.1,0.28,0.288,30,0,0,175.1,161.5);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween8;
p.nominalBounds = new Rectangle(-65.7,-64.7,131.5,129.6);

(lib.Tween7 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.terry_image();
	this.instance.setTransform(-64.9,-99.9,1.477,1.481);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween7;
p.nominalBounds = new Rectangle(-64.9,-99.9,130,200);

(lib.Tween6 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.terry_image();
	this.instance.setTransform(-64.9,-99.9,1.477,1.481);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween6;
p.nominalBounds = new Rectangle(-64.9,-99.9,130,200);

(lib.terryanim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// righthand
	this.instance = new lib.Tween10("synched",0);
	this.instance.setTransform(143,182);

	this.timeline.addTween(Tween.get(this.instance).to({rotation:45},7).to({scaleX:1,scaleY:1,rotation:14.9,x:155.8,y:181.9},8).to({scaleX:1.59,scaleY:1.65,rotation:-3.2,x:160.4,y:154},8).to({scaleX:0.9,scaleY:0.88,rotation:6.9,x:144.1,y:185.4},6).wait(1));

	// lefthand
	this.instance_1 = new lib.Tween8("synched",0);
	this.instance_1.setTransform(-4.7,173);

	this.timeline.addTween(Tween.get(this.instance_1).to({scaleX:1.51,scaleY:1.43,rotation:-64,x:-39.5,y:210},11).to({scaleX:1.06,scaleY:1.05,rotation:-7.8,x:8.9,y:177.7},7).to({scaleX:1.01,scaleY:1,rotation:-30.4,x:-13.3,y:200.4},11).wait(1));

	// terry
	this.instance_2 = new lib.Tween6("synched",0);
	this.instance_2.setTransform(65,100);

	this.timeline.addTween(Tween.get(this.instance_2).to({rotation:15},8).to({rotation:-13.5},9).to({rotation:-13.5},5).to({rotation:1.3},7).wait(1));

	// parachute
	this.instance_3 = new lib.Tween18("synched",0);
	this.instance_3.setTransform(48.6,-50.9);

	this.timeline.addTween(Tween.get(this.instance_3).to({rotation:10.7,x:69.6,y:-51.8},7).to({rotation:-13.8,x:32.6,y:-50.8},8).to({rotation:16.2,x:78.1},7).to({rotation:-6.6,x:38.1},7).wait(1));

	// watermelon
	this.instance_4 = new lib.melon_tummy();
	this.instance_4.setTransform(75,247,1.275,1.361,0,0,0,65.5,66.5);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_4}]}).wait(30));

}).prototype = p = new MovieClip();

p.constructor = lib.terryanim;
p.nominalBounds = new Rectangle(-83.9,-231,287,568.6);

(lib.watermelon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);


	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(Tween.get(this).wait(0).call(this.frame_0).wait(1).call(this.frame_1).wait(3));

	// states
	this.instance = new lib.kevinanim();
	this.instance.setTransform(136.8,134.7,1,1,0,0,0,66.3,108.2);

	this.instance_1 = new lib.mihaianim();
	this.instance_1.setTransform(136.8,138.4,1,1,0,0,0,66.3,104.4);

	this.instance_2 = new lib.terryanim();
	this.instance_2.setTransform(136.8,121.4,1,1,0,0,0,66.3,121.4);

	this.timeline.addTween(Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	// watermelon
	this.instance_3 = new lib.watermelonanim();
	this.instance_3.setTransform(32,32,1,1,0,0,0,9,9);

	this.timeline.addTween(Tween.get(this.instance_3).to({_off:true},1).wait(3));

}).prototype = p = new MovieClip();

p.constructor = lib.watermelon;
p.nominalBounds = new Rectangle(23.1,23,88,76);

(lib.watermelonanim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// Layer 1
	this.instance = new lib.Tween16("synched",0);
	this.instance.setTransform(44,38);

	this.timeline.addTween(Tween.get(this.instance).to({rotation:180},8).wait(1));

}).prototype = p = new MovieClip();

p.constructor = lib.watermelonanim;
p.nominalBounds = new Rectangle(0,0,88,76);

(lib.Tween1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._1344946867_pumpkin();
	this.instance.setTransform(-63.9,-63.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween1;
p.nominalBounds = new Rectangle(-63.9,-63.9,128,128);

(lib.Tween2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._1344946867_pumpkin();
	this.instance.setTransform(-63.9,-63.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween2;
p.nominalBounds = new Rectangle(-63.9,-63.9,128,128);

(lib.Tween3 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._1344946867_pumpkin();
	this.instance.setTransform(-63.9,-63.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween3;
p.nominalBounds = new Rectangle(-63.9,-63.9,128,128);

(lib.Tween4 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._1344946867_pumpkin();
	this.instance.setTransform(-63.9,-63.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween4;
p.nominalBounds = new Rectangle(-63.9,-63.9,128,128);

(lib.Tween5 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib._1344946867_pumpkin();
	this.instance.setTransform(-63.9,-63.9);

	this.addChild(this.instance);
}).prototype = p = new Container();
p.constructor = lib.Tween5;
p.nominalBounds = new Rectangle(-63.9,-63.9,128,128);

(lib.mihaianim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// mihai
	this.instance = new lib.Tween14("synched",0);
	this.instance.setTransform(67,74);

	this.timeline.addTween(Tween.get(this.instance).to({rotation:-14.8,x:39},7).to({rotation:13.5,x:92.9},8).to({rotation:-16.7,x:52.2},7).to({rotation:12.7,x:76.9,y:74.1},3).to({rotation:-11.8,x:52.5,y:84},4).wait(1));

	// righthand
	this.instance_1 = new lib.Tween10("synched",0);
	this.instance_1.setTransform(143,182);

	this.timeline.addTween(Tween.get(this.instance_1).to({rotation:45},7).to({scaleX:1,scaleY:1,rotation:14.9,x:155.8,y:181.9},8).to({scaleX:1.59,scaleY:1.65,rotation:-3.2,x:160.4,y:154},8).to({scaleX:0.9,scaleY:0.88,rotation:6.9,x:144.1,y:185.4},6).wait(1));

	// lefthand
	this.instance_2 = new lib.Tween8("synched",0);
	this.instance_2.setTransform(-4.7,173);

	this.timeline.addTween(Tween.get(this.instance_2).to({scaleX:1.51,scaleY:1.43,rotation:-64,x:-39.5,y:210},11).to({scaleX:1.06,scaleY:1.05,rotation:-7.8,x:8.9,y:177.7},7).to({scaleX:1.01,scaleY:1,rotation:-30.4,x:-13.3,y:200.4},11).wait(1));

	// parachute
	this.instance_3 = new lib.Tween18("synched",0);
	this.instance_3.setTransform(78.6,-50.9);

	this.timeline.addTween(Tween.get(this.instance_3).to({rotation:10.7,x:69.6,y:-51.8},7).to({rotation:-13.8,x:77.6,y:-50.8},8).to({rotation:16.2,x:78.1},7).to({rotation:-6.6,x:28.1},7).wait(1));

	// watermelon
	this.instance_4 = new lib.melon_tummy();
	this.instance_4.setTransform(72,242,1.275,1.361,0,0,0,65.5,66.5);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_4}]}).wait(30));

}).prototype = p = new MovieClip();

p.constructor = lib.mihaianim;
p.nominalBounds = new Rectangle(-70.4,-231,281.6,563.6);

(lib.kevinanim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// righthand
	this.instance = new lib.Tween10("synched",0);
	this.instance.setTransform(143,182);

	this.timeline.addTween(Tween.get(this.instance).to({rotation:45},7).to({scaleX:1,scaleY:1,rotation:14.9,x:155.8,y:181.9},8).to({scaleX:1.59,scaleY:1.65,rotation:-3.2,x:160.4,y:154},8).to({scaleX:0.9,scaleY:0.88,rotation:6.9,x:144.1,y:185.4},6).wait(1));

	// lefthand
	this.instance_1 = new lib.Tween8("synched",0);
	this.instance_1.setTransform(-4.7,173);

	this.timeline.addTween(Tween.get(this.instance_1).to({scaleX:1.51,scaleY:1.43,rotation:-64,x:-39.5,y:210},11).to({scaleX:1.06,scaleY:1.05,rotation:-7.8,x:8.9,y:177.7},7).to({scaleX:1.01,scaleY:1,rotation:-30.4,x:-13.3,y:200.4},11).wait(1));

	// kevin
	this.instance_2 = new lib.Tween12("synched",0);
	this.instance_2.setTransform(77,79);

	this.timeline.addTween(Tween.get(this.instance_2).to({rotation:-14.8,x:49},8).to({rotation:13.5,x:100.9},8).to({rotation:-13.3,x:58.1},7).to({rotation:-4.1,x:70.7,y:90},2).to({rotation:3.9,x:79.9,y:91.7},4).wait(1));

	// parachute
	this.instance_3 = new lib.Tween18("synched",0);
	this.instance_3.setTransform(78.6,-50.9);

	this.timeline.addTween(Tween.get(this.instance_3).to({rotation:10.7,x:69.6,y:-51.8},7).to({rotation:-13.8,x:77.6,y:-50.8},8).to({rotation:16.2,x:78.1},7).to({rotation:-6.6},7).wait(1));

	// watermelon
	this.instance_4 = new lib.melon_tummy();
	this.instance_4.setTransform(62,233.1,1.275,1.361,0,0,0,65.5,66.6);

	this.timeline.addTween(Tween.get({}).to({state:[{t:this.instance_4}]}).wait(30));

}).prototype = p = new MovieClip();

p.constructor = lib.kevinanim;
p.nominalBounds = new Rectangle(-70.4,-231,281.6,554.6);

(lib._1344946867_pumpkin = function() {
	this.initialize(images._1344946867_pumpkin);
}).prototype = new Bitmap();
p.constructor = lib._1344946867_pumpkin;
p.nominalBounds = new Rectangle(0,0,128,128);

(lib.Angry = function() {
	this.initialize(images.Angry);
}).prototype = new Bitmap();
p.constructor = lib.Angry;
p.nominalBounds = new Rectangle(0,0,128,128);

(lib.bg_edit = function() {
	this.initialize(images.bg_edit);
}).prototype = new Bitmap();
p.constructor = lib.bg_edit;
p.nominalBounds = new Rectangle(0,0,1280,800);

(lib.bg = function() {
	this.initialize(images.bg);
}).prototype = new Bitmap();
p.constructor = lib.bg;
p.nominalBounds = new Rectangle(0,0,800,600);

(lib.Bitmap1 = function() {
	this.initialize(images.Bitmap1);
}).prototype = new Bitmap();
p.constructor = lib.Bitmap1;
p.nominalBounds = new Rectangle(0,0,110,140);

(lib.Bitmap2 = function() {
	this.initialize(images.Bitmap2);
}).prototype = new Bitmap();
p.constructor = lib.Bitmap2;
p.nominalBounds = new Rectangle(0,0,103,127);

(lib.Bitmap3 = function() {
	this.initialize(images.Bitmap3);
}).prototype = new Bitmap();
p.constructor = lib.Bitmap3;
p.nominalBounds = new Rectangle(0,0,91,132);

(lib.Cool = function() {
	this.initialize(images.Cool);
}).prototype = new Bitmap();
p.constructor = lib.Cool;
p.nominalBounds = new Rectangle(0,0,128,128);

(lib.dog = function() {
	this.initialize(images.dog);
}).prototype = new Bitmap();
p.constructor = lib.dog;
p.nominalBounds = new Rectangle(0,0,115,103);

(lib.girl = function() {
	this.initialize(images.girl);
}).prototype = new Bitmap();
p.constructor = lib.girl;
p.nominalBounds = new Rectangle(0,0,132,206);

(lib.kevin_img = function() {
	this.initialize(images.kevin_img);
}).prototype = new Bitmap();
p.constructor = lib.kevin_img;
p.nominalBounds = new Rectangle(0,0,137,211);

(lib.kevinhoyt = function() {
	this.initialize(images.kevinhoyt);
}).prototype = new Bitmap();
p.constructor = lib.kevinhoyt;
p.nominalBounds = new Rectangle(0,0,176,176);

(lib.melon_tummy = function() {
	this.initialize(images.melon_tummy);
}).prototype = new Bitmap();
p.constructor = lib.melon_tummy;
p.nominalBounds = new Rectangle(0,0,131,133);

(lib.mihai_corlan_twitter = function() {
	this.initialize(images.mihai_corlan_twitter);
}).prototype = new Bitmap();
p.constructor = lib.mihai_corlan_twitter;
p.nominalBounds = new Rectangle(0,0,254,232);

(lib.mihai_image = function() {
	this.initialize(images.mihai_image);
}).prototype = new Bitmap();
p.constructor = lib.mihai_image;
p.nominalBounds = new Rectangle(0,0,168,216);

(lib.parachute = function() {
	this.initialize(images.parachute);
}).prototype = new Bitmap();
p.constructor = lib.parachute;
p.nominalBounds = new Rectangle(0,0,249,296);

(lib.Pirate = function() {
	this.initialize(images.Pirate);
}).prototype = new Bitmap();
p.constructor = lib.Pirate;
p.nominalBounds = new Rectangle(0,0,128,128);

(lib.pumpkin = function() {
	this.initialize(images.pumpkin);
}).prototype = new Bitmap();
p.constructor = lib.pumpkin;
p.nominalBounds = new Rectangle(0,0,128,128);

(lib.terry_image = function() {
	this.initialize(images.terry_image);
}).prototype = new Bitmap();
p.constructor = lib.terry_image;
p.nominalBounds = new Rectangle(0,0,88,135);

(lib.terry = function() {
	this.initialize(images.terry);
}).prototype = new Bitmap();
p.constructor = lib.terry;
p.nominalBounds = new Rectangle(0,0,180,182);

(lib.thumbs = function() {
	this.initialize(images.thumbs);
}).prototype = new Bitmap();
p.constructor = lib.thumbs;
p.nominalBounds = new Rectangle(0,0,350,323);

(lib.watermelon_bg = function() {
	this.initialize(images.watermelon_bg);
}).prototype = new Bitmap();
p.constructor = lib.watermelon_bg;
p.nominalBounds = new Rectangle(0,0,1280,800);

(lib.watermelon_bgjpegcopy = function() {
	this.initialize(images.watermelon_bgjpegcopy);
}).prototype = new Bitmap();
p.constructor = lib.watermelon_bgjpegcopy;
p.nominalBounds = new Rectangle(0,0,1280,800);

(lib.watermelon_trans = function() {
	this.initialize(images.watermelon_trans);
}).prototype = new Bitmap();
p.constructor = lib.watermelon_trans;
p.nominalBounds = new Rectangle(0,0,88,76);

(lib.watermelon_transparent = function() {
	this.initialize(images.watermelon_transparent);
}).prototype = new Bitmap();
p.constructor = lib.watermelon_transparent;
p.nominalBounds = new Rectangle(0,0,117,111);

(lib.watermelon_1 = function() {
	this.initialize(images.watermelon_1);
}).prototype = new Bitmap();
p.constructor = lib.watermelon_1;
p.nominalBounds = new Rectangle(0,0,64,64);