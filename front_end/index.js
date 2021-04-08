const BG_COLOUR = '#231f20';
const TRUCK_COLOUR = '#c2c2c2'
const TRASH_COLOUR = '#e66916';

const socket = io('http://localhost:3000');

socket.on('init', handleInit);

const gameScreen = document.getElementById('gameScreen');

let canvas, ctx;

const gameState = {
    player: {
        pos: {
            x: 3,
            y: 10,
        },
        vel: {
            x: 1,
            y: 0,
        },
        truck: [
            {x: 1, y: 10},
            {x: 2, y: 10},
            {x: 3, y: 10},
        ],
    },
    trash: {
        x: 7,
        y: 7,
    },
    gridsize: 20,
};

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
}

function keydown(e) {
    console.log(e.keyCode);
}

init();

function paintGame(state) {
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const trash = state.trash;
    const gridsize = state.gridsize;
    const size = canvas.width / gridsize;

    ctx.fillStyle = TRASH_COLOUR;
    ctx.fillRect(trash.x * size, trash.y * size, size, size);

    paintPlayer(state.player, size, TRUCK_COLOUR);
}

function paintPlayer(playerState, size, colour) {
    const truck = playerState.truck;

    ctx.fillStyle = TRUCK_COLOUR;
    for (let cell of truck) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
}

paintGame(gameState);

function handleInit(msg) {
    console.log(msg);
}
