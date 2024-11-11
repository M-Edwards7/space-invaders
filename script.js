import EnemyController from "./modules/enemyController.js";
import Player from "./modules/player.js";
import BulletController from "./modules/bulletController.js";

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const playerBullet = new BulletController(canvas, 10, "greenyellow")
const enemyBullet = new BulletController(canvas, 10 , "red")
const enemyController = new EnemyController(canvas, enemyBullet, playerBullet);
const player = new Player(canvas, 10, playerBullet)

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "/images/space.jpg";
let isGameOver = false;
let winner = false;

function game() {
    checkGameOver()
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayResult()
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx)
        playerBullet.draw(ctx)
        enemyBullet.draw(ctx)
        clearInterval(game)
        console.log("test")
    }
}
function checkGameOver() {
    if (isGameOver) return true;
    if (enemyBullet.collideWith(player)) {
        isGameOver = true
        console.log(isGameOver)
    }
    if(enemyController.collideWith(player)) {
        isGameOver = true;
        console.log(isGameOver)
    }
    if(enemyController.enemyRows.length === 0){
        winner = true;
        isGameOver = true;
    }
}
function displayResult() {
    if (isGameOver) {
        let text = winner ? "YOU WIN" : "GAME OVER";
        // let textOffset = winner ? 2 : 4;
        ctx.fillStyle = "white"
        ctx.font = "4rem ubuntu"
        ctx.fillText(text, canvas.width / 5, canvas.height / 2)
    }
}
setInterval(game, 1000 / 60)

// ----------------
