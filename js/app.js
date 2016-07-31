// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var random = Math.random() * 100;
    this.x += random * dt;
    if (this.x > 500){
        this.x = 0;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.collisions = function(){
    if(this.x > (player.x - 70) && (this.x - 70) < player.x && (this.y + 10) === player.y) {
        console.log("A bug ate you, start over!");
        player.reset();
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    // Starting point of game
    this.x = 200;
    this.y = 390;
}

Player.prototype.update = function() {
    // moves around
    if(this.y === -10){
        //TODO: make into an alert
        console.log("You made it through! Congratulations!");
        player.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 390;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(60); //80 height difference
var bug2 = new Enemy(140);
var bug3 = new Enemy(220);

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
