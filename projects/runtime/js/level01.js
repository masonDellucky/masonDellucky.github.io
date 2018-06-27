var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'box',x:100,y:200}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
         for (var i = 0; i < levelData.gameItems.length; i++) {
            if (levelData.gameItems[i].type === "sawblade") {
                createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
        }
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            myObstacle.rotationalVelocity = 200;
            myObstacle.onProjectileCollision = function() {
                myObstacle.fadeOut();
                game.increaseScore(100);
                game.changeIntegrity(20);
            }
        }
        function createGameReward(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 0;
            var myReward = game.createObstacle(hitZoneSize, damageFromObstacle);
            myReward.x = x;
            myReward.y = y - 50;
            game.addGameItem(myReward);
            var rewardImage = draw.bitmap('img/reward.png');
            myReward.addChild(rewardImage);
            rewardImage.x = -50;
            rewardImage.y = -55;
            myReward.onPlayerCollision = function() {
                myReward.fadeOut();
                game.increaseScore(7392);
                game.changeIntegrity(100);
            }
        }  
        var enemy =  game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = 700;
        enemy.y = groundY-50;
        game.addGameItem(enemy);
        enemy.rotationalVelocity = 300;
        enemy.velocityX = -1;
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
        };
        enemy.onProjectileCollision = function() {
            enemy.fadeOut();
            game.increaseScore(111);
        }
       
        //createGameReward(canvas.width(), groundY-50);
        createGameReward(600, (groundY-50));
        createSawBlade(1000, (groundY-100));
        createSawBlade(1150, (groundY-30));
        createSawBlade(1300, (groundY-100));
        createSawBlade(1450, (groundY-100));
        createSawBlade(1600, (groundY-30));
        createSawBlade(1750, (groundY-100));
        createSawBlade(1800, (groundY-30));
        createSawBlade(1950, (groundY-100));
        createSawBlade(2100, (groundY-30));
        createSawBlade(2250, (groundY-100));
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}