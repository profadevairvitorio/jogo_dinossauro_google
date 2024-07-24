let score = 0;
let jumpCount = 0;
let obstaclesPassed = 0;

function createObstacle(type) {
    const obstacle = document.createElement('div');
    obstacle.classList.add(type);
    obstacle.style.right = '-50px';
    obstacle.style.bottom = '0';
    document.querySelector('.game-container').appendChild(obstacle);

    const animationName = type === 'cactus' ? 'moveCactus' : 'moveBird';
    obstacle.style.animation = `${animationName} 1.5s linear infinite`;

    setTimeout(() => {
        obstacle.remove();
        if (obstaclesPassed > 0) {
            score++;
            updateScore();
            obstaclesPassed--;
        }
    }, 1500);
}

function updateScore() {
    document.querySelector('.score').textContent = `Score: ${score}`;
}

function handleJump(event) {
    if (event.code === 'Space') {
        const dino = document.querySelector('.dino');
        if (jumpCount < 2) {
            dino.classList.add('jump');
            jumpCount++;
            setTimeout(() => {
                dino.classList.remove('jump');
                jumpCount--;
            }, 500);
        }
    }
}

function checkCollision() {
    const dino = document.querySelector('.dino');
    const obstacles = document.querySelectorAll('.cactus, .bird');

    obstacles.forEach(obstacle => {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (dinoRect.left < obstacleRect.right &&
            dinoRect.right > obstacleRect.left &&
            dinoRect.bottom > obstacleRect.top &&
            dinoRect.top < obstacleRect.bottom) {
            alert(`Game Over! Sua pontuação: ${score}`);
            location.reload();
        }
    });
}

document.addEventListener('keydown', handleJump);
document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('score');
    document.querySelector('.game-container').appendChild(scoreDisplay);

    setInterval(() => {
        const obstacleType = Math.random() < 0.5 ? 'cactus' : 'bird';
        createObstacle(obstacleType);
        obstaclesPassed++;
    }, 2000);

    setInterval(checkCollision, 100);
});
