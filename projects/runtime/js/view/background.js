var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    var shape = draw.bitmap('img/piccolo-oof.jpg');
    var tree;
    var buildings = [];
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            //background.addChild(shape);
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i=0;i<100;i++) {
                circle = draw.circle(7,'yellow','yellow',2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            var moon = draw.bitmap('img/moon.png');
            moon.x = canvas.width/2;
            moon.y = 25;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            var building;
            for(var i=0;i<100;++i) {
                var buildingHeight = 300 * Math.random();
                building = draw.rect((100*Math.random()),buildingHeight,'Grey','Black',1);
                building.x = 200*i*Math.random();
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            var treePos = ground.y - 250;
            tree = draw.bitmap('img/tree.png');
            tree.x = canvas.width;
            tree.y = treePos;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 2;
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for(var i = 0; i < 500; i++) {
              buildings[i].x = buildings[i].x - 1;
             
              if(buildings[i].x < -200) {
                  buildings[i].x = canvasWidth;
              }
            }
            
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
