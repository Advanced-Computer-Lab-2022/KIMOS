import React, { Component } from 'react';
import eren from '../assets/eren-yeager.png';
import erenSmiling from '../assets/eren-smiliing.png';
import Rating from '../components/rating';
import SecondaryBtn from './buttons/secondaryBtn';
class InstructorProfile extends Component {
    getComments = ()=>{
        return ['bad instructor','bad instructor bad instructor bad instructor','bad instructor','bad instructor','bad instructor bad instructor bad instructor bad instructor'].map((comment)=>{
            return (
                <div className='comment'>
                        <div className='comment__header'>
                            <div className='comment__header__name'>
                                Username
                            </div>
                            <div className='comment__header__rating'>
                                <Rating />
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
                        <div className='instructor-profile__info__username'>
                            Eren Yeager
                        </div>
                        <div className='instructor-profile__info__rating'> 
                            <Rating />
                        </div>
                    </div>
                    <div className='instructor-profile__data__footer'>
                           <div className='instructor-profile__data__bio'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere lacus ac enim fringilla accumsan.
                           </div>
                           <div className='instructor-profile__data__footer__btn'>
                                <SecondaryBtn btnText='Edit' />
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