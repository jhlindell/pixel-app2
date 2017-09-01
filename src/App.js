import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import Palette from './components/Palette';
import ProjectBox from './components/ProjectBox';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import { bindActionCreators } from 'redux';
import './App.css';

function pixelClick(x, y, color) {
  return {
    type: 'PIXEL_CLICK',
    payload: { x, y, color }
  }
}

function updateGrid(grid){
  return {
    type: 'UPDATE_GRID',
    payload: grid
  }
}

function fetchProjects(projects){
  return {
    type: 'FETCH_PROJECTS',
    payload: projects
  }
}

function mouseDownAction(){
  return {
    type: 'MOUSE_DOWN',
    payload: true
  }
}

function mouseUpAction(){
  return {
    type: 'MOUSE_UP',
    payload: false
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.sendPixelToSocket = this.sendPixelToSocket.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseOver = this.mouseOver.bind(this);

  }

  componentDidMount() {
    this.socket = openSocket('http://localhost:7000');
    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', this.props.currentProject);
      this.socket.emit('grid', this.props.currentProject);
    });

    this.socket.on('pixel', (pixel) => {
      this.props.pixelClick(pixel.x, pixel.y, pixel.color);
    });

    this.socket.on('gridUpdated', (grid)=> {
      this.props.updateGrid(grid);
    });

    this.socket.on('sendProjectsToClient', (projects)=> {
      this.props.fetchProjects(projects);
    });

    this.socket.emit('initialize');
  }

  componentDidUpdate(prevProps){
    if(this.props.currentProject !== prevProps.currentProject){
      this.socket.emit('leaveRoom', prevProps.currentProject);
      this.socket.emit('joinRoom', this.props.currentProject);
      this.socket.emit('grid', this.props.currentProject);
    }
  }

  sendPixelToSocket(x, y, color){
    this.socket.emit('pixel', { x: x, y: y, color: color, project: this.props.currentProject});
  }

  addNewProject(){
    this.socket.emit('addNewProject');
  }

  saveProject(){
    this.socket.emit('saveProject', this.props.currentProject);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  mouseDown(){
    this.props.mouseDownAction();
  }

  mouseUp(){
    this.props.mouseUpAction();
  }

  mouseOver(x, y, color){
    if(this.props.mouseDown){
      this.sendPixelToSocket(x,y,color);
    }
  }

  render() {
    return (
      <Router history={createHistory()}>
        <div>
          <div><Route path="/" render={() => <NavBar />} /></div>
          <Row>
            <Col md="8">
              <Route path="/" render={() => <Grid
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseOver={this.mouseOver}
                sendPixel={this.sendPixelToSocket} />} />
              <Route path="/" render={() => <Palette />} />
            </Col>
            <Col md="4">
              <Route path="/" render={() => <ProjectBox
              addNewProject={this.addNewProject}
              saveProject={this.saveProject} />} />
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {currentProject: state.currentProject, mouseDown: state.mouseReducer}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pixelClick, updateGrid, fetchProjects, mouseDownAction, mouseUpAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
