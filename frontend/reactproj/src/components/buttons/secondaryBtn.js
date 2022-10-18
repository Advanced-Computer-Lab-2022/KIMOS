import React, { Component } from 'react'
import Button from '@mui/material/Button';


export default class secondaryBtn extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.function}
                variant="contained"
                size={this.props.btnSize}
                className="secondary-btn">
          {this.props.btnText || "None"}
        </Button>
      </div>
    )
  }
}

