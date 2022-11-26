import React, { Component } from 'react';
import eren from '../assets/eren-yeager.png';
import erenSmiling from '../assets/eren-smiliing.png';
import Rating from '../components/rating';
import SecondaryBtn from './buttons/secondaryBtn';
import PrimaryBtn from './buttons/primaryBtn';
import TextField from '@mui/material/TextField';


class InstructorProfile extends Component {
    state = {
        editing: false,
        instructor:{
            'username':'Eren yeager',
            'bio':' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere lacus ac enim fringilla accumsan.'
        },
        new_instructor:{
            'username':'Eren yeager',
            'bio':' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere lacus ac enim fringilla accumsan.'
        }
    }
    toggleEditing = ()=>{this.setState({editing:!this.state.editing})}
    handleChange = (e)=>{
        var oldUser = {...this.state.new_instructor};
        oldUser[e.target.id] = e.target.value;
        this.setState({new_instructor: oldUser})
    }
    cancel = ()=>{
        this.setState({new_instructor: this.state.instructor})
        this.toggleEditing();
    }
    save = ()=>{
        this.setState({instructor: this.state.new_instructor})
        this.toggleEditing();
    }
    getComments = ()=>{
        return ['bad instructor','bad instructor bad instructor bad instructor','bad instructor','bad instructor','bad instructor bad instructor bad instructor bad instructor'].map((comment)=>{
            return (
                <div className='comment'>
                        <div className='comment__header'>
                            <div className='comment__header__name'>
                                Username
                            </div>
                            <div className='comment__header__rating'>
                                <Rating value={2}/>
                            </div>
                        </div>
    
                        <div className='comment__comment'>
                            {comment}
                        </div>
                </div>
            )
        })

    }
    render() {
        return (
            <div className='instructor-profile'>
                <div className='instructor-profile__header'>
                    <img src={eren} alt='profile'/> 
                    <div className='instructor-profile__header__pp'>
                        <img src={erenSmiling} alt='pp'/>
                    </div>
                </div>
                <div className='instructor-profile__data'>

                    <div className='instructor-profile__info'>
                        {!this.state.editing &&
                        <div className='instructor-profile__info__username'>
                            {this.state.instructor.username}
                        </div>}
                        {this.state.editing &&
                            <div className='instructor-profile__info__username'>
                                <TextField id='username' onChange={this.handleChange} value={this.state.new_instructor.username} label="Username" variant="outlined" />
                            </div>}
                        <div className='instructor-profile__info__rating'> 
                            <Rating value={4}/>
                        </div>
                    </div>
                    <div className='instructor-profile__data__footer'>
                            {!this.state.editing &&<div className='instructor-profile__data__bio'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere lacus ac enim fringilla accumsan.
                           </div>}
                           {this.state.editing &&<div className='instructor-profile__data__bio'>
                                
                                <TextField id='bio' style={{width:'100%', marginTop:'20px'}} multiline rows= {3} onChange={this.handleChange} value={this.state.new_instructor.bio} label="Bio" variant="outlined" />
                          
                            </div>}
                           <div className='instructor-profile__data__footer__btn'>
                                {!this.state.editing && <SecondaryBtn btnText='Edit' function={this.toggleEditing}/>}
                                {this.state.editing && 
                                    <div style={{display:'flex', 'alignItems':'center'}}>
                                        <SecondaryBtn btnText='Cancel' function={this.cancel}/>
                                        <div className='date-picker__sep'/>
                                        <PrimaryBtn btnText='Save' function={this.save}/>
                                    </div>
                                }

                           </div>
                    </div>
                </div>
                <div className='instructor-profile__content'>
                    <div className='instructor-profile__content__reviews'>
                        <div className='instructor-profile__content__reviews__header'>
                            Reviews
                        </div>
                        <div className='instructor-profile__content__reviews__comments'>
                            {this.getComments()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstructorProfile;