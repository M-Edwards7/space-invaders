export default class Player {

    rightPressed = false;
    leftPressed = false;
    shootPressed = false


    constructor(canvas, velocity, bullet) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bullet = bullet;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height + 390;
        this.width = 50;
        this.height = 48;

        this.image = new Image();
        this.image.src = "/images/xwing2.png"

        document.addEventListener("keydown", this.keydown)
        document.addEventListener("keyup", this.keyup)
    }
    draw(ctx) {
        if (this.shootPressed) {
            this.bullet.shoot(this.x + this.width / 2, this.y, 4, 10)
        }
        this.move();
        this.boundries();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    boundries() {
        // left
        if (this.x < 0) this.x = 0;
        // right
        if (this.x > this.canvas.width - this.width) this.x = this.canvas.width - this.width;
    }
    move() {
        if (this.rightPressed) {
            this.x += this.velocity
        } else if (this.leftPressed) {
            this.x += -this.velocity
        }
    }
    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = true
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true
        }
        if (event.code == "Space") {
            this.shootPressed = true
        }
    }
    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false
        }
        if (event.code == "Space") {
            this.shootPressed = false
        }
    }
}