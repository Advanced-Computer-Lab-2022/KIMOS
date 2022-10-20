import React, { Component } from 'react';
import PrimaryButton from './buttons/primaryBtn';
import SecondaryButton from './buttons/secondaryBtn';
class navbar extends Component {
    goHome = ()=>{
        window.location.href = '/'
    }
    render() {
        return (
            <div className="navbar">
                <div className="title" onClick={this.goHome}>
                    KIMOS
                </div>

                <div className="options">
                    <div className="option">Option 1</div>
                    <div className="option">Option 1</div>
                    <div className="option">Option 1</div>
                </div>

                <div className="user-options">
                    <PrimaryButton function={this.exampleFunction} btnSize="medium" btnText="Log In"/>
                    <SecondaryButton function={this.exampleFunction} btnSize="medium" btnText="Sign Up"/>
                </div>

            </div>
        );
    }
}

export default navbar;