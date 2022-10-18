import React, { Component } from 'react';
import PrimaryButton from './components/buttons/primaryBtn';
import SecondaryButton from './components/buttons/secondaryBtn';
class App extends Component {
  exampleFunction = ()=>{
    alert("Seweeyyy");
  }
  render() {
    return (
      <div className="main-content">
          <PrimaryButton function={this.exampleFunction} btnSize="medium" btnText="Primary"/>
          <SecondaryButton function={this.exampleFunction} btnSize="medium" btnText="Secondary"/>
      </div>
    );
  }
}

export default App;