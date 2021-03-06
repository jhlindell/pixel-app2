import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendSupportEmail } from '../../actions/socketActions';

class CustomerSupport extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      emailSent: false,
      errors: {
        name: '',
        email: '',
        message: ''
      }
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit= (event) => {
    event.preventDefault();
    let valid = this.validate();
    if(valid){
      let name = this.state.name;
      let email = this.state.email.toLowerCase();
      let message = this.state.message;
      this.props.sendSupportEmail(name, email, message);
      this.props.history.push('/');
    }
  }

  clearForm(){
    this.setState({name: '', email: '', message: '', emailSent: true});
  }

  render(){
    const componentStyle = {
      display: 'flex',
      margin: 'auto',
    };

    const cardStyle = {
      width: '400px',
      display: 'flex',
      textAlign: 'center',
    };

    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    };

    const errorStyle = {
      color: 'red',
    };

    return (
      <div style={componentStyle}>
        {!this.state.emailSent && <div className="card" style={cardStyle}>
          <form onSubmit={this.handleFormSubmit}>
            <div className="card-header">
              <h3>Contact Us</h3>
            </div>
            <div className="card-block" style={formStyle}>
              <label className="mt-2">Your Name</label>
              <input name="name" type="text" placeholder="Name" onChange={(e)=> this.handleInputChange(e)} value={this.state.name} />
              {this.state.errors.name && <div style={errorStyle}>{this.state.errors.name}</div>}
              <label className="mt-2">Your Email Address</label>
              <input name="email" type="text" placeholder="Email" onChange={(e)=> this.handleInputChange(e)} value={this.state.email} />
              {this.state.errors.email && <div style={errorStyle}>{this.state.errors.email}</div>}
              <label className="mt-2">Your Message</label>
              <textarea name="message" rows='5' placeholder="Type your message here" onChange={(e)=> this.handleInputChange(e)} value={this.state.message} />
              {this.state.errors.message && <div style={errorStyle}>{this.state.errors.message}</div>}
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Send Email</button>
            </div>
          </form>
        </div>}
        {this.state.emailSent && <div className="card" style={{padding: '10px'}}>
          <h2>Email Sent</h2>
        </div>}
      </div>
    );
  }

  validate() {
    this.clearErrors();
    const errors = {};
    let isValid = true;

    if(!this.state.name){
      errors.name = 'Please enter your name';
      isValid = false;
    }

    if(!this.state.email) {
      errors.email = 'Please enter your email';
      isValid = false;
    }

    if(!this.state.message) {
      errors.message = 'You must enter a message';
      isValid = false;
    }

    this.setState({errors: errors});
    return isValid;
  }

  clearErrors(){
    this.setState({ errors: { name: '', email: '', message: ''}});
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ sendSupportEmail }, dispatch);
}

export default connect(null, mapDispatchToProps)(CustomerSupport);
