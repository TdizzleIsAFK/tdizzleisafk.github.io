const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let submarineY = canvas.height / 2;
    const gravity = 0.5;
    let velocity = 0;

    function drawSubmarine() {
        const submarineImg = new Image();
        submarineImg.src = 'img/gameSub.png';
        ctx.drawImage(submarineImg, 50, submarineY);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSubmarine();

        velocity += gravity;
        submarineY += velocity;

        if (submarineY > canvas.height) submarineY = canvas.height;
        if (submarineY < 0) submarineY = 0;

        requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            velocity = -10;
        }
    });

    gameLoop();