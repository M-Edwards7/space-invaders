import Enemy from "./enemy.js";
import { movingDirection } from "./Movement.js";
export default class EnemyController {
    enemyMap = [
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1]
    ];
    enemyRows = [];
    currentDirection = movingDirection.right;
    xVelocity = 0;
    yVelocity = 0
    defaultXVelocity = 2;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    movedownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;


    constructor(canvas, enemyBullet, playerBullet) {
        this.playerBullet = playerBullet;
        this.canvas = canvas;
        this.enemyBullet = enemyBullet;
        this.createEnemies();
    }
    draw(ctx) {
        this.decreamentMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection()
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();

    }
    collisionDetection() {
        this.enemyRows.forEach((enemyRow) => {
            enemyRow.forEach((enemy, index) => {
                if (this.playerBullet.collideWith(enemy)) {
                    // remove enemy
                    enemyRow.splice(index, 1)
                }
            });
        })
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0)
    }
    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length)
            const enemy = allEnemies[enemyIndex];
            this.enemyBullet.shoot(enemy.x, enemy.y, -3)

        }
    }
    resetMoveDownTimer() {
        if (this.movedownTimer <= 0) {
            this.movedownTimer = this.moveDownTimerDefault
        }
    }
    decreamentMoveDownTimer() {
        if (
            this.currentDirection === movingDirection.downLeft ||
            this.currentDirection === movingDirection.downRight
        ) {
            this.movedownTimer--
        }
    }
    updateVelocityAndDirection() {
        for (const enemyRow of this.enemyRows) {
            if (this.currentDirection == movingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1]
                if (rightMostEnemy.x + rightMostEnemy.width > this.canvas.width) {
                    this.currentDirection = movingDirection.downLeft;
                    // exit for loop
                    break;
                }
            } else if (this.currentDirection === movingDirection.downLeft) {
                if (this.moveDown(movingDirection.left)) break;
            } else if (this.currentDirection === movingDirection.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = movingDirection.downRight;
                    break;
                }
            } else if (this.currentDirection === movingDirection.downRight) {
                if (this.moveDown(movingDirection.right)) break;

            }

        }
    }
    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.movedownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }
    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
            enemy.draw(ctx)
        })
    }
    createEnemies() {
        this.enemyMap.forEach((row, index) => {
            this.enemyRows[index] = [];
            row.forEach((num, enemyIndex) => {
                if (num > 0) {
                    this.enemyRows[index].push(
                        new Enemy(enemyIndex * 50, index * 35, num)
                    )
                }
            })
        })
    }
    collideWith(sprite){
        return this.enemyRows.flat().some(
            (enemy) => {
                enemy.collideWith(sprite)
        })
    }
}