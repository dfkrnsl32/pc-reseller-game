const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 } }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let player, cursors;
let money = 50;
let moneyText;
let pcs = [];

function preload() {
    this.load.image('player', 'assets/characters/player.png');
    this.load.image('home', 'assets/background/home.png');
    this.load.image('shop', 'assets/background/shop.png');
    this.load.image('pc1', 'assets/pc_parts/pc1.png');
    this.load.image('pc2', 'assets/pc_parts/pc2.png');
    this.load.image('gpu', 'assets/pc_parts/gpu.png');
}

function create() {
    this.add.image(400, 300, 'home');
    this.add.image(600, 300, 'shop');

    player = this.physics.add.sprite(100, 500, 'player');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    moneyText = this.add.text(16, 16, 'Деньги: $' + money, { fontSize: '24px', fill: '#fff' });

    const pcData = [
        { x: 400, y: 300, type: 'pc1', reward: 100 },
        { x: 500, y: 350, type: 'pc2', reward: 150 },
        { x: 450, y: 250, type: 'gpu', reward: 200 }
    ];

    pcData.forEach(data => {
        let pc = this.physics.add.sprite(data.x, data.y, data.type);
        pc.setInteractive();
        pc.reward = data.reward;
        pc.on('pointerdown', () => {
            money += pc.reward;
            moneyText.setText('Деньги: $' + money);
        });
        pcs.push(pc);
    });
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-200);
    else if (cursors.right.isDown) player.setVelocityX(200);

    if (cursors.up.isDown) player.setVelocityY(-200);
    else if (cursors.down.isDown) player.setVelocityY(200);
}
