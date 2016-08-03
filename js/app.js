// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.width = 70;
    this.height = 10;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // TODO: change the last multiplier based on level (increse speed)
    //velocity ensures a radom speed every time update is called
    var velocity = this.speed * dt * (Math.random() * 50);
    this.x += velocity;
    if (this.x > 500){
        this.x = 0;
        this.y = this.newLocation();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Detects if a player is within a certain distance for the bug
//The player is reset if it is touching any bug.
Enemy.prototype.collisions = function(){
    if(this.x > (player.x - this.width) && (this.x - this.width) < player.x && (this.y + this.height) === player.y) {
        console.log("A bug ate you, start over!");
        player.highScore = player.setHighScore();
        player.score = 0;
        player.reset();
    }
}

// This method randomly selects a new row for the enemy to appear
// in once they're gone through the screen and reappear
//The possible options are found inside rowLocations array
Enemy.prototype.newLocation = function(){
    var rowLocations = [60, 140, 220];
    var random = rowLocations[Math.floor(Math.random() * rowLocations.length)];
    return random;
}

// ---------------------------PLAYER CLASS----------------------------------------------------------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 390;
    this.score = 0;
    this.highScore = 0;
}

Player.prototype.update = function() {
    if(this.y === -10){
        //TODO: make into an alert
        console.log("You made it through! Congratulations!");
        this.addScore();
        player.reset();
    }
}
//Renders the player sprite on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px serif";
    ctx.fillText(("Score: " + this.score), 10, 100);
    ctx.fillText(("High Score: " + this.highScore), 200, 100);
}

//Based on player input, moves the sprite around the screen within the bounds set
Player.prototype.handleInput = function(input) {
    switch (input) {
        case "left":
            if(this.x > 0) {
                this.x -= 100;
            }
            break;
        case "up":
            if(this.y > 50) {
                this.y -= 80;
            }
            break;
        case "right":
            if(this.x < 400) {
                this.x += 100;
            }
            break;
        case "down":
            if(this.y < 380) {
                this.y += 80;
            }
            break;
    }
    //handles movement
}

//Resets the player to the starting position
//Use when the player dies by touching a bug or
//when the player reaches the water
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
}

Player.prototype.addScore = function() {
    this.score+= 10;
}

Player.prototype.setHighScore = function() {
    if(this.score > this.highScore){
        this.highScore = this.score;
    }
    return this.highScore;
}

// ---------------------------Start of game----------------------------------------------------------------

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//The game starts with one bug on each row and a random speed
var bug1 = new Enemy(60, (Math.random() * 10));
var bug2 = new Enemy(140, (Math.random() * 10));
var bug3 = new Enemy(220, (Math.random() * 10));

var allEnemies = [bug1, bug2, bug3];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
