import React, { Component } from 'react'
import Button from '@mui/material/Button';


export default class primaryBtn extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.function} 
                variant="contained"
                size={this.props.btnSize }
                disabled={this.props.disabled}
                className="primary-btn">
          {this.props.btnText || 'None'}
        </Button>
      </div>
    )
  }
}
