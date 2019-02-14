//global var
let lose = 0;
let reachRiver= 0;

// Enemies our player must avoid
var Enemy = function(y,speed) {
    this.initPosition
    this.oneStep = 101;
    this.x = -1 * this.oneStep;
    this.y = y + 60;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    allEnemies.push(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.oneStep * 5) {
        this.x += this.speed * dt;
    } else {
        this.x = -1 * this.oneStep;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//PLAYER
class Player {
    constructor() {        
        this.goRight = 101;
        this.goDown = 83;
        this.sprite = 'images/char-cat-girl.png';
        this.initialX = this.goRight * 2;
        this.initialY = (this.goDown * 5) - 25;
        this.x = this.initialX;
        this.y = this.initialY;
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update () {        
        //check for collision
        for(let enemy of allEnemies) {
            let diferenceX = this.x - enemy.x; //Consider a minimun pixel difference to make match the cordinates.
            let diferenceY = this.y - enemy.y;
            if (Math.abs(diferenceX) < 60 && Math.abs(diferenceY) < 10) { //consider a difference of 60 in X to avoid superimposing objects.
                this.resetPosition();
                lose += 1; // collision counter
            }
        }
        //check for winning
        if(this.y === -25) {
            this.resetPosition();
            reachRiver += 1;
        }
    }

    handleInput (input) { // Conditions: the direction and the players coordinates inside the screen.
        if (input === 'right' && this.x < this.goRight * 4) {
            this.x += this.goRight;
        } else if (input === 'left' && this.x > 0) {
            this.x -= this.goRight;
        } else if (input === 'up' && this.y > 0) {
            this.y -= this.goDown;
        } else if (input ==='down' && this.y < this.goDown * 4) {
            this.y += this.goDown;
        }
    }

    resetPosition () {
        this.x = this.initialX;
        this.y = this.initialY;
    }
}

const enemyPosition = {
    row: {first: 0, second: 83, third: 166},
    speed: {one: 100, two: 150, three: 200}
}


allEnemies = [];
const bug1 = new Enemy(enemyPosition.row.first, enemyPosition.speed.three);
const bug2 = new Enemy(enemyPosition.row.second, enemyPosition.speed.one);
const bug3 = new Enemy(enemyPosition.row.second, enemyPosition.speed.two);
const bug4 = new Enemy(enemyPosition.row.third, enemyPosition.speed.one);
const player = new Player ();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
