import { Bullet } from "./bullet.js";

export default class BulletController {
    bullets = [];
    timeTillNextBullet = 0
    constructor(canvas, maxBullets, bulletColor) {
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.bulletColor = bulletColor;

    }
    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => {
            return bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        })
        this.bullets.forEach((bullet) => bullet.draw(ctx))
        if (this.timeTillNextBullet >= 0) {
            this.timeTillNextBullet--
        }
    }
    shoot(x, y, velocity, timeTillNextBullet = 0) {
        if (this.timeTillNextBullet <= 0 && this.bullets.length < this.maxBullets) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor)
            this.bullets.push(bullet)
            this.timeTillNextBullet = timeTillNextBullet
        }
    }
    collideWith(sprite){
        const bulletThatHitIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite));
        if(bulletThatHitIndex >= 0){
            this.bullets.splice(bulletThatHitIndex, 1)
            return true;
        }
        return false;
    }
}