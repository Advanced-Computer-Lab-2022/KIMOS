import React, { Component } from 'react'
import SecondaryBtn from './buttons/secondaryBtn';
import PrimaryBtn from './buttons/primaryBtn';
import Button from '@mui/material/Button';
import axios from 'axios';
import {showAlert} from '../redux/actions';
import {connect} from 'react-redux';

class Contracts extends Component {
    componentDidMount(){
        this.getContractStatus();
    }

    state = {
        status: false
    }

    submitRejection = async () => {
        console.log('submitting')
        try {
          const res = await axios.delete('http://localhost:5000/contracts/instructor',{
            params :{"instructorId":"638117c243cba3f0babcc3a9"}
          }, {
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
          this.setState({status: false});

          if(res.status === 200)
            this.props.showAlert({shown:true, message:res.data.message,severity:'success'})
          else
            this.props.showAlert({shown:true, message:'Couldnt Update your Info',severity:'error'})

        } catch (e) {


        }
      };


    submitAcceptance = async () => {
        try {
          const res = await axios.post('http://localhost:5000/contracts/instructor',{
            "instructorId":"638117c243cba3f0babcc3a9"
          }, {
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
          this.setState({status: true});
          if(res.status === 200)
            this.props.showAlert({shown:true, message:res.data.message,severity:'success'})
          else
            this.props.showAlert({shown:true, message:'Couldnt Update your Info',severity:'error'})

        } catch (e) {


        }
      };

    getContractStatus = async (newCountry) => {

    
        try {
          const res = await axios.get('http://localhost:5000/contracts/?userType=instructor&userId=638117c243cba3f0babcc3a9', {
            headers: { 'Access-Control-Allow-Origin': '*' }
         
          });
          console.log(res.data)
          if(res.data.accepted===true){
            this.setState({status: true});
          }
          else{
            this.setState({status: false});

          }
        } catch (e) {}
      };
  render() {
    return (
        <div className='contract'>
        <div style={{display:'flex', alignItems:'center'}}>
            <div className='contract__title'>Contract</div>
            <div className= {this.state.status? 'accepted': 'rejected' }>{this.state.status? 'Accepted':'Rejected'}</div>
            </div>
        <div className='contract__content'>

            <div className='contract__content__rights'>
                <div className='contract__content__rights__header'>Terms of Service</div>
                <ul>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item,index)=>{
                        return (
                            <li>
                                Provide consistent and seamless experiences across the Meta Company Products
                            </li>   
                        )
                    })}
                

                </ul>

            </div>
            <div className='contract__content__percentage-taken'>
                <div className='contract__content__percentage-taken__info'>
                    <div className='contract__content__percentage-taken__info__left'>
                        % Taken by the company on each video
                    </div>
                    <div className='contract__content__percentage-taken__info__amount'>
                        10
                    </div>
                </div>
                <div className='contract__content__percentage-taken__btns'>
                    <Button onClick={this.submitRejection} className='primary-btn' variant="outlined" color="error">
                        Reject
                    </Button>
                    <div className='date-picker__sep'/>

                    <Button onClick={this.submitAcceptance} className='primary-btn' variant="contained" color="success">
                        Accept
                    </Button>
                </div>
            </div>


        
        </div>

    </div>
    )
  }
}



export default connect(null, {showAlert})(Contracts);
