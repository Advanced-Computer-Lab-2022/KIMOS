import React, { Component } from 'react';
import student1 from '../assets/student1.png';
import student2 from '../assets/student2.png';
import student3 from '../assets/student3.png';
import PrimaryBtn from './buttons/primaryBtn';



class homeLand extends Component {
    render() {
        return (
            <div className='homeland'>
                <div className='homeland__section section_1'>
                    <div className='homeland__section section_1__left'>

                        <div  className='homeland__section section_1__left__text t1'>Best Online Learning</div>
                        <div  className='homeland__section section_1__left__text t2'>Educational Academy</div>
                        <div  className='homeland__section section_1__left__text t3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget nisi sit amet sapien aliquam lacinia. Morbi tempor egestas lacus, ac facilisis eros posuere vitae. </div>
                        <div style={{marginTop:'1vh',display:'flex', justifyContent:'flex-end'}}>
                            <PrimaryBtn btnText="Join Us"/>
                        </div>

                    
                    </div>
                    <div className='homeland__section section_1__right'>
                    <div className='features'>
                        <div className='features__text'>Our Features!</div>
                        <ul className='ul'>
                            <li className='ul__text'>Choose from 213,000 online video courses with new additions published every month</li>
                            <li className='ul__text'>Choose from 213,000 online video courses with new additions published every month</li>
                            <li className='ul__text'>Choose from 213,000 online video courses with new additions published every month</li>
                            <li className='ul__text'>Choose from 213,000 online video courses with new additions published every month</li>

                        </ul>
                    </div>

                        <div className='images'>
                            <img src={student1} alt="" className="image"/>
                            <img src={student2} alt="" className="image"/>             
                        </div>
                    </div>

                
                </div>
                <div className='homeland__section section_2'>Section 1</div>
                <div className='footer'>footer</div>


            </div>
        );
    }
}

export default homeLand;