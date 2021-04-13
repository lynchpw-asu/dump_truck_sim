//Importing GRID_SIZE from constants.js
const { GRID_SIZE } = require('./constants');

//Exporting the following modules
module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
}

//Creates random trash for each game
function initGame() {
  const state = createGameState()
  randomTrash(state);
  return state;
}

//Creates the players and trash
function createGameState() {
  return {
    //player object
    players: [{
      //playerOne position
      pos: {
        x: 3,
        y: 10,
      },
      //playerOne velocity
      vel: {
        x: 1,
        y: 0,
      },
      //truckOne position
      truck: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
    }, {
      //playerTwo position
      pos: {
        x: 18,
        y: 10,
      },
      //playerTwo velocity
      vel: {
        x: 0,
        y: 0,
      },
      //truckTwo position
      truck: [
        {x: 20, y: 10},
        {x: 19, y: 10},
        {x: 18, y: 10},
      ],
    }],
    //position of trash
    trash: {},
    //gameWorlds grid system
    gridsize: GRID_SIZE,
  };
}

//Pushes the game forward
function gameLoop(state) {
  if (!state) {
    return;
  }

  //Define both players
  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  //Updating playerOne position
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  //Updating playerTwo position
  playerTwo.pos.x += playerTwo.vel.x;
  playerTwo.pos.y += playerTwo.vel.y;

  //Checking if playerOne is inbound
  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    return 2;
  }

  //Checking if playerTwo is inbound
  if (playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE || playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE) {
    return 1;
  }

  //Checking if playerOne has picked up trash
  if (state.trash.x === playerOne.pos.x && state.trash.y === playerOne.pos.y) {
    //This is were playerOne score will be added
    
    
    randomTrash(state);
  }

  //Checking if playerTwo has picked up trash
  if (state.trash.x === playerTwo.pos.x && state.trash.y === playerTwo.pos.y) {
    //This is were playerTwo score will be added


    randomTrash(state);
  }

  //Moving playerOne forward
  if (playerOne.vel.x || playerOne.vel.y) {
    playerOne.truck.push({ ...playerOne.pos });
    playerOne.truck.shift();
  }

  //Moving playerTwo forward
  if (playerTwo.vel.x || playerTwo.vel.y) {
    playerTwo.truck.push({ ...playerTwo.pos });
    playerTwo.truck.shift();
  }

  return false;
}

//Spawns trash to a new location
function randomTrash(state) {
  trash = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }

  //Making sure trash does not spawn on playerOne
  for (let cell of state.players[0].truck) {
    if (cell.x === trash.x && cell.y === trash.y) {
      return randomTrash(state);
    }
  }

  //Making sure trash does not spawn on playerTwo
  for (let cell of state.players[1].truck) {
    if (cell.x === trash.x && cell.y === trash.y) {
      return randomTrash(state);
    }
  }

  state.trash = trash;
}

//Spawns mutantTrash to a new location
function randomMutantTrash(state) {

}

//Takes the keypress and moves truck in correct direction
function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: { // left
      return { x: -1, y: 0 };
    }
    case 38: { // down
      return { x: 0, y: -1 };
    }
    case 39: { // right
      return { x: 1, y: 0 };
    }
    case 40: { // up
      return { x: 0, y: 1 };
    }
  }
}

//Adds 1 to the players score
function TrashScore() {

}

//Adds 2 to the players score
function mutantTrashScore() {

}