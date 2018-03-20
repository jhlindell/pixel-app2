import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export function changeShowMenuState() {
  return { type: 'CHANGE_MENU_SHOW_STATE' };
}

export function updateColor(nextColor) {
  return { type: 'UPDATE_COLOR', payload: {nextColor}, };
}

export function selectProject(id){
  return { type: 'SELECT_PROJECT', payload: { id } };
}

export function getCollaborators(id){
  return function(dispatch){
    axios.get(`${URL}/api/users/collaborators/${id}`)
      .then(response => {
        dispatch({ type: 'SET_COLLABORATORS', payload: response.data });
      })
      .catch(response => {
        console.log("error getting collaborators");
      })
  }
}

export function pixelClick(x, y, color) {
  return {type: 'PIXEL_CLICK', payload: { x, y, color }};
}

export function updateGrid(grid){
  return { type: 'UPDATE_GRID', payload: grid };
}

export function sendProjectsToStore(projects){
  return {type: 'FETCH_PROJECTS', payload: projects};
}

export function mouseDownAction(){
  return { type: 'MOUSE_DOWN', payload: true };
}

export function mouseUpAction(){
  return { type: 'MOUSE_UP', payload: false };
}

export function getGallery(gallery){
  return { type: 'GET_GALLERY', payload: gallery };
}

export function signUpUser({username, email, password}){
  return function(dispatch){
    axios.post(`${URL}/signup`, {username, email, password})
      .then(response => {
        if(response.data.token){
          dispatch({type: 'AUTH_USER', payload: response.data.token });
        } else {
          dispatch(authError(response.data.error));
        }
      })
      .catch((response) => {
        dispatch(authError(response));
      });
  }
}

export function authError(error) {
  return { type: 'AUTH_ERROR', payload: error };
}

export function signInUser({username, password}){
  return function(dispatch){
    axios.post(`${URL}/signin`, {username, password})
      .then(response => {
        dispatch({type: 'AUTH_USER', payload: response.data.token });
      })
      .catch((response) => {
        dispatch(authError(response));
      });
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {type: 'USER_LOGOUT'};
}

export function setUserName(userinfo){
  return {type: 'USERNAME', payload: userinfo};
}

export function userNameCheck(result, message, username){
  if(username){
    return {type: 'USERNAME_CHECK', payload: {result, message, username }};
  } else {
    return {type: 'USERNAME_CHECK', payload: {result, message }};
  }
}

export function clearUserNameCheck(){
  return {type: 'CLEAR_USERNAME_CHECK'};
}

export function galleryShow(project){
  return {type: 'GALLERY_SHOW', payload: project};
}

export function galleryTop3(top3){
  return {type: 'GALLERY_TOP_3', payload: top3};
}

export function setCollaborator(username){
  return {type: 'SET_COLLABORATOR', payload: username};
}

export function setUserRatingForProject(project_id, rating){
  return {type: 'SET_USER_RATING', payload: { project_id, rating }};
}

export function setAvgProjectRating(project_id, rating){
  return {type: 'SET_AVG_PROJECT_RATING', payload: { project_id, rating }};
}
