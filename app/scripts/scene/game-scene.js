PixiGame.GameScene = function() {
    PIXI.Graphics.call(this);
    this._sausage = null;
    this._target1 = null;
    this._target2 = null;
    this.setup();
};

PixiGame.GameScene.constructor = PixiGame.GameScene;
PixiGame.GameScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.GameScene.prototype.setup = function() {
    var throwing = false;
    if (PixiGame.mobileCheck) {


        this.displaySausage();
        this.addMotionEvent(throwing, this._sausage);
    } else {
        this.displayTargets();
    }
}
PixiGame.GameScene.prototype.addMotionEvent = function(throwing, sausage) {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('devicemotion', function(e) {
            handleEvents(e);

            // var direction = null;
            // if(e.gamma != null) {
            //   document.getElementById('info').innerHTML = e.gamma;
            // }

        });

        function handleEvents(e) {
            if (e.acceleration.x != null) {
                // document.getElementById('rotation').innerHTML = e.rotationRate.gamma + " " + e.rotationRate.beta + " " + e.rotationRate.alpha;
                if (e.accelerationIncludingGravity.x < -15) {
                    direction = null;
                    document.getElementById('info').innerHTML = e.accelerationIncludingGravity.x;

                    if (e.rotationRate.gamma < 7) {
                        // right hand
                        direction = "right";
                    } else {
                        // left hand
                        direction = "left";
                    }
                    // document.getElementById('info').innerHTML = e.accelerationIncludingGravity.x;
                    PixiGame.GameScene.prototype.throwSausage(direction, sausage);

                }
            }
        }
    }
}
PixiGame.GameScene.prototype.displaySausage = function() {
    var sausageTexture = new PIXI.Texture.fromImage('images/korv.png');
    this._sausage = new PIXI.Sprite(sausageTexture);
    this._sausage.anchor.x = 0.5;
    this._sausage.scale.x = 0.2;
    this._sausage.scale.y = this._sausage.scale.x;

    this._sausage.position.x = window.innerWidth / 2;
    this._sausage.position.y = window.innerHeight / 3;
    PixiGame.GameScene.prototype.flipSausage(this._sausage);
    // TweenLite.to(sausage, 20, {x: 300});

    this.addChild(this._sausage);
}
PixiGame.GameScene.prototype.flipSausage = function(sausage) {
    sausage.position.x = window.innerWidth / 2;
    flip = TweenMax.to(sausage, 0.3, {
        rotation: +.3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0,
        ease: Power1.easeInOut
    });
}
PixiGame.GameScene.prototype.throwSausage = function(direction, sausage) {
    socket.emit('throwsausage');
    var throwSausage = TweenMax.to(sausage.position, 0.5, {
        x: +600,
        y: +10,
        onComplete: complete
    })

    function complete() {
        // PixiGame.GameScene.prototype.flipSausage(sausage);
        sausage.position.x = window.innerWidth / 2;
        sausage.position.y = window.innerHeight / 3;
        // sausage.rotation = 0.3;

    }
}
PixiGame.GameScene.prototype.displayTargets = function() {
    var targetTexture = new PIXI.Texture.fromImage('images/target.png');
    this._target1 = new PIXI.Sprite(targetTexture);
    this._target2 = new PIXI.Sprite(targetTexture);
    this._target1.scale.x = 0.2;
    this._target1.scale.y = this._target1.scale.x;
    // this._target1.anchor.x = 0.5;
    this._target2.scale.x = this._target1.scale.x;
    this._target2.scale.y = this._target1.scale.y;
    this._target1.position.x = 200;
    this._target1.position.y = 50;
    this._target2.position.x = this._target1.position.x + 600;
    this._target2.position.y = this._target1.position.y;

    this.addChild(this._target1, this._target2);
}
PixiGame.GameScene.prototype.update = function() {}

PixiGame.GameScene.prototype.destroy = function() {
    this.removeChildren();
}
