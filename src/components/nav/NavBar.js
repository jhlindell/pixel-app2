import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../../actions/index';
import { getUserName } from '../../actions/socketActions';

const navBarStyle = {
  display: 'flex',
  height: '50px',
  width: '100%',
  backgroundColor: 'black',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0,
  margin: 0
};

class NavBar extends React.Component {
  componentWillMount(){
    if(this.props.authenticated){
      this.props.getUserName();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated && nextProps.authenticated !== this.props.authenticated){
      this.props.getUserName();
    }
  }

  renderLinks() {
    return (this.props.authenticated) ?
      <li key={'signout'}>
        <span className="navLink mr-3">{this.props.user && this.props.user.username}</span>
        <Link className="navLink"  to="/signout">Sign Out</Link>
      </li> :
      [
        <li key={'signin'}>
          <Link className="navLink"  to="/signin">Sign In</Link>
        </li>,
        <li key={'signup'}>
          <Link className="navLink" to="/signup">Sign Up</Link>
        </li>
      ];
  }

  render(){
    return (
      <ul style={navBarStyle}>
        <li key={'art'} >
          <Link to="/newProject" className="navLink">Make Art</Link>
        </li>
        <li key={'gallery'}>
          <Link to="/gallery" className="navLink"
          onClick={() => this.props.selectProject(0)}>Gallery</Link>
        </li>
        <li key={'home'}>
          <Link to="/" className="navText">Pixel Art Teams</Link>
        </li>
        <li key={'store'}>
          <Link to="/store" className="navLink">Store</Link>
        </li>
        {this.renderLinks()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated,
    token: state.auth.token, user: state.userName };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserName, selectProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
