document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const dino = document.querySelector('.dino');
  const alert = document.querySelector('#alert');
  let isJumping = false;
  let gravity = 0.9;
  let position = 0;
  let isGameOver = false;

  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }
  document.addEventListener('keyup', control);

  function jump() {
    let count = 0;
    let timerId = setInterval(function() {
      // move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function() {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position *= gravity;
          dino.style.bottom = position + 'px';
        }, 20)
      }
      // move up
      count++;
      position += 30;
      position *= gravity;
      dino.style.bottom = position + 'px';
    }, 20);
  }

  function generateObstacle() {
    const randomTime = Math.random() * 4000;
    let obstablePosition = 1000;
    const obstacle = document.createElement('div');
    if (!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstablePosition + 'px';

    let timerId = setInterval(function() {
      if (
        obstablePosition > 0 &&
        obstablePosition < 60 &&
        position < 60
      ) {
        clearInterval(timerId);
        alert.innerHTML = 'Game Over';
        isGameOver = true;
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }
      obstablePosition -= 10;
      obstacle.style.left = obstablePosition + 'px';
    }, 20);

    if (!isGameOver) setTimeout(generateObstacle, randomTime);
  }
  generateObstacle();
});
