import React, { Component } from "react";
import { connect } from 'react-redux';
import { checkUserForAdd, addNewProject } from '../../actions/socketActions';
import { clearUserNameCheck, addMessageToContainer } from '../../actions/index';
import { bindActionCreators } from 'redux';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: '',
      x: '',
      y: '',
      timer: 'unlimited',
      collaborators: [],
      user_name: '',
      selectedUser: '',
      email: '',
      errors: {
        name: '',
        x: '',
        y: ''
      }
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== this.props.user){
      if(nextProps.user.result === true){
        const array = this.state.collaborators;
        array.push(nextProps.user.username);
        this.setState({ collaborators: array });
        this.props.clearUserNameCheck();
      }
      if(nextProps.user.result === false){
        this.props.addMessageToContainer("user doesn't exist");
      }
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const valid = this.validate();
    if(valid){
      this.props.addNewProject(this.state.project_name, this.state.x, this.state.y, this.state.timer, this.state.collaborators);
      this.props.history.push('/art');
    }
  }

  addUserClicked(){
    const userName = this.state.user_name.toLowerCase();
    const email = this.state.email.toLowerCase();
    this.props.checkUserForAdd(userName, email);
  }

  selectUser(username){
    this.setState({selectedUser: username});
  }

  removeUser(){
    const array = this.state.collaborators;
    array.filter((element) => element !== this.state.eleectedUser)
    this.setState({ collaborators: array });
  }

  cancel(){
    this.props.history.push('/art');
  }

  render(){
    const componentStyle = {
      display: 'flex',
      margin: 'auto',
    };

    const footerStyle = {
      display: 'flex',
      justifyContent: 'center',
    };

    const timerStyle = {
      display: 'flex',
      flexDirection: 'column',
      gridColumnStart: '2',
      gridColumnEnd: '3',
      justifySelf: 'center',
      alignSelf: 'center',
    };

    const radioStyle = {
      display: 'flex',
      flexDirection: 'row',
    };

    const headerStyle = {
      textAlign: 'center',
    };

    const cardBlockStyle = {
      display: 'grid',
      gridTemplateColumns: '200px 200px 200px',
    };

    const column1 = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      justifySelf: 'center',
      alignSelf: 'center',
      textAlign: 'center',
    };

    const column3 = {
      gridColumnStart: '3',
      justifySelf: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      overflowY: 'auto',
    };

    return (
      <div style={componentStyle}>
        <div className="card">
          <form onSubmit={this.handleFormSubmit}>
            <div className="card-header" style={headerStyle}>
              <h3>New Project</h3>
            </div>
            <div className="card-block" style={cardBlockStyle}>
              <div style={column1}>
                <div>
                  <label>Project Name</label>
                  <input name="project_name" type="text"
                    onChange={(e) => {this.handleInputChange(e)}}
                    placeholder="Project Name"
                    value={this.state.project_name}/>
                    {this.state.errors.name && <div>{this.state.errors.name}</div>}
                </div>
                <div >
                  <label className="mt-2">Canvas Width</label>
                  <input name="x" type="text"
                    onChange={(e) => {this.handleInputChange(e)}}
                    placeholder="X"
                    value={this.state.x}/>
                    {this.state.errors.x && <div>{this.state.errors.x}</div>}
                </div>
                <div >
                  <label className="mt-2">Canvas Height</label>
                  <input name="y" type="text"
                    onChange={(e) => {this.handleInputChange(e)}}
                    placeholder="Y"
                    value={this.state.y}/>
                    {this.state.errors.y && <div>{this.state.errors.y}</div>}
                </div>
              </div>
              <div style={timerStyle}>
                <h5>Project Length:</h5>
                <div style={radioStyle}>
                  <input type="radio" id="1min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="1min" className="mr-3"
                   checked={this.state.timer==="1min"}/>
                  <label htmlFor="1min">1 Minute</label>
                </div>
                <div style={radioStyle}>
                  <input type="radio" id="3min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="3min" className="mr-3"
                   checked={this.state.timer==="3min"}/>
                  <label htmlFor="3min">3 Minutes</label>
                </div>
                <div style={radioStyle}>
                  <input type="radio" id="5min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="5min" className="mr-3"
                   checked={this.state.timer==="5min"}/>
                  <label htmlFor="5min">5 minutes</label>
                </div>
                <div style={radioStyle}>
                  <input type="radio" id="15min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="15min" className="mr-3"
                   checked={this.state.timer==="15min"}/>
                  <label htmlFor="15min">15 minutes</label>
                </div>
                <div style={radioStyle}>
                  <input type="radio" id="1hour"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="1hour" className="mr-3"
                   checked={this.state.timer==="1hour"}/>
                  <label htmlFor="1hour">1 hour</label>
                </div>
                <div style={radioStyle}>
                  <input type="radio" id="1day"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="1day" className="mr-3"
                   checked={this.state.timer==="1day"}/>
                  <label htmlFor="1day">1 day</label>
                </div>
                <div style={radioStyle}>
                  <input type="radio" id="unlimited"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="unlimited" className="mr-3" checked={this.state.timer==="unlimited"}/>
                  <label htmlFor="unlimited">Unlimited</label>
                </div>
              </div>
              <div style={column3}>
                <h5>Add Collaborators:</h5>
                <ul className="list-group list-group-flush">
                  {this.state.collaborators.map(collaborator => {
                    if(collaborator !== this.props.username){
                    return <li className={"list-group-item selectedUser " + ((collaborator === this.state.selectedUser) ? "selectedUserHighlighted" : "") }
                      key={collaborator} onClick={()=> this.selectUser(collaborator)}>{collaborator}</li>}
                    return null;
                  })}
                </ul>
                <input type="text" name="user_name" value={this.state.user_name}
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="username" />
                <input type="text" name="email" value={this.state.email}
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="email" />
                <div className="btn-group mt-3" style={{fontSize: '14px'}}>
                  <button type="button" className="btn-primary"
                    onClick={()=> this.addUserClicked()}>Add User</button>
                  <button type="button" className="btn-secondary"
                    onClick={()=> this.removeUser()}>Remove</button>
                </div>
              </div>
            </div>
            <div className="card-footer" style={footerStyle}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-secondary" type="button" onClick={()=>this.cancel()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  validate(){
    this.clearErrors();
    let errors = {};
    let isValid = true;

    if(this.state.project_name === '') {
      errors.name = 'Please enter a project name';
      isValid = false;
    }

    if(this.state.x < 10 || this.state.x > 40){
      errors.x = 'X needs to be between 10 and 40';
      isValid = false;
    }

    if(this.state.y < 10 || this.state.y > 40){
      errors.y = 'Y needs to be between 10 and 40';
      isValid = false;
    }

    this.setState({ errors});
    return isValid;
  }

  clearErrors(){
    this.setState({ errors: {name: '',x: '',y: ''} });
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.userCheckReducer };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addNewProject, clearUserNameCheck, checkUserForAdd, addMessageToContainer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
