import { combineReducers } from 'redux';

function gridReducer(state, action) {
  if (state === undefined) {
    let grid = [];
    for (var i = 0; i < 20; i++) {
      let row = [];
      for (var j = 0; j < 20; j++) {
        row.push('#FFF');
      }
      grid.push(row);
    }
    return grid;
  }

  switch (action.type) {
    case 'PIXEL_CLICK':
      const newGrid = state.map((row, y) => row.map((pixel, x) => {
        if (x === action.payload.x && y === action.payload.y) {
          return action.payload.color;
        }
        return pixel;
      }));
      return newGrid;

    case 'UPDATE_GRID':
      return action.payload;

    default:
      return state;
  }

}

function activeColor(state = '#000', action) {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return action.payload.nextColor;
    default:
      return state;
  }
}

function currentProject(state = 0, action) {
  switch (action.type) {
    case 'SELECT_PROJECT':
      return action.payload.id;
    default:
      return state;
  }
}

function projectsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return action.payload;
    default:
      return state;
  }
}

function mouseReducer(state = false, action) {
  switch (action.type) {
    case 'MOUSE_DOWN':
      return action.payload;
    case 'MOUSE_UP':
      return action.payload;
    default:
      return state;
  }
}

function galleryReducer(state = [], action){
  switch(action.type) {
    case 'GET_GALLERY':
      return action.payload;
    default:
      return state;
  }
}

function paletteReducer(state = true, action){
  switch(action.type) {
    case 'CHANGE_PALETTE_SHOW_STATE':
    console.log("current color state: ", state);
      return !state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  activeColor,
  gridReducer,
  currentProject,
  projectsReducer,
  mouseReducer,
  galleryReducer,
  paletteReducer
});

export default rootReducer;
