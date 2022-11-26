import React, { Component } from 'react'
import SecondaryBtn from './buttons/secondaryBtn';
import PrimaryBtn from './buttons/primaryBtn';
import Button from '@mui/material/Button';

export default class Contracts extends Component {
  render() {
    return (
        <div className='contract'>
        <div className='contract__title'>Contract</div>
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
                    <Button className='primary-btn' variant="outlined" color="error">
                        Reject
                    </Button>
                    <div className='date-picker__sep'/>

                    <Button className='primary-btn' variant="contained" color="success">
                        Accept
                    </Button>
                </div>
            </div>


        
        </div>

    </div>
    )
  }
}
