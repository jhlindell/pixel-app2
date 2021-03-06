import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../../actions/index';
import { saveProject } from '../../actions/socketActions';

class Signout extends Component {
  componentWillMount() {
    this.props.saveProject();
    this.props.signoutUser();
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.authenticated){
      this.props.history.push('/')
    }
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signoutUser, saveProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
