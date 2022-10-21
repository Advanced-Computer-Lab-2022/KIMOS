import React, { Component } from 'react';
import PrimaryButton from './buttons/primaryBtn';


class admin extends Component {
    render() {
        function addAdmin(){

        }
        function addInstructor(){

        }
        function addCorporateTrainee(){

        }
        return (
            <div className = "display-content">
                <div className = "tmp-content">
                        <PrimaryButton function={addAdmin} btnSize="large" btnText="Add Admin"/>
                        <PrimaryButton function={addInstructor} btnSize="medium" btnText="Add Instructor"/>
                        <PrimaryButton function={addCorporateTrainee} btnSize="400 px" btnText="Add Corporate Trainee"/>
                </div>
            </div>
        );
    }
}

export default admin;