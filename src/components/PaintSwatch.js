import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  marginTop: '2px',
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  float: 'left',
  borderWidth: '2px',
  borderStyle: 'solid',
  marginLeft: '1px',
}

function updateColor(nextColor) {
  return {
    type: 'UPDATE_COLOR',
    payload: {nextColor},
  }
}

class PaintSwatch extends Component {
  render(){
    styles.backgroundColor = this.props.color;
    return (
      <div style={styles} className="paint" onClick={() => this.props.updateColor(this.props.color)}>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateColor }, dispatch)
}

export default connect(null, mapDispatchToProps)(PaintSwatch);
