const { GRID_SIZE } = require('./constants');

module.exports = {
    createGameState,
    gameLoop,
}

function createGameState() {
    return {
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
            ],
        },
        trash: {
            x: 7,
            y: 7,
        },
        gridsize: GRID_SIZE,
    };
}

function gameLoop(state) {
    if (!state) {
        return;
    }    
    const playerOne = state.player;

    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
        return 2;
    }

    if (state.trash.x === playerOne.pos.x && state.trash.y === playerOne.pos.y) {
        //ADDING SCORE WILL GO HERE
        randomTrash();
    }

    if (playerOne.vel.x || playerOne.vel.y) {
        playerOne.truck.push({ ...playerOne.pos });
        playerOne.truck.shift();
    }
    return false;
}

function randomTrash(state) {
    trash = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    }
    for (let cell of state.player.truck) {
        if (cell.x === trash.x && cell.y === trash.y) {
            return randomTrash(state);
        }
    }
    state.trash = trash;
}