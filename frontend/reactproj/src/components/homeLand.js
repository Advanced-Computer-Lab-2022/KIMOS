import React, { Component } from 'react';
import student1 from '../assets/student1.png';
import student2 from '../assets/student2.png';
import student3 from '../assets/student3.png';
import PrimaryBtn from './buttons/primaryBtn';
import Rating from '@mui/material/Rating';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import reactCourse from '../assets/react.png';
import dataScienceCourse from '../assets/dataScience.png';
import fullStackCourse from '../assets/fullStack.png';
import pythonCourse from '../assets/python.png';
import aiCourse from '../assets/ai.png';
import javaCourse from '../assets/java.png';

import {Container,AppBar,Grow,Grid} from '@mui/material';

class homeLand extends Component {
    render() {
        const slideLeft=()=>{
            var slider=document.getElementById('slider');
            slider.scrollLeft-=265;
        }

        const slideRight=()=>{
            var slider=document.getElementById('slider');
            slider.scrollLeft+=265;
        }
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

                <div className='homeland__section section_2'>
                    <h1 style={{fontSize:30}}>Most Popular Courses</h1>
                    
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",columnGap:5}}>
                        <div className="arrowLeft" onClick={slideLeft}>
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                        </div> 

                    <Grow in>
                        <Container>
                            <AppBar className="appBarX" position="static" color="inherit">

                                <div id="slider" className="homeland__section section_2__allPopular">
                                
                                    <div className="homeland__section section_2__allPopular__popularDiv" >
                                        <div class="hovering">
                                            <img className="homeland__section section_2__allPopular__popularDiv__image" src={reactCourse}/>
                                        </div>
                                        <label className="homeland__section section_2__allPopular__popularDiv__title">React The Complete Guide (incl Hooks, React Router, Redux)</label>
                                        <label className="homeland__section section_2__allPopular__popularDiv__instructor">Dr. Mervat Abo Elkeir</label>
                                        <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <label className="homeland__section section_2__allPopular__popularDiv__price">250 $</label>
                                    </div>
                

                                    <div className="homeland__section section_2__allPopular__popularDiv" >
                                        <div class="hovering">
                                            <img className="homeland__section section_2__allPopular__popularDiv__image" src={dataScienceCourse}/>
                                        </div>
                                        <label className="homeland__section section_2__allPopular__popularDiv__title">React The Complete Guide (incl Hooks, React Router, Redux)</label>
                                        <label className="homeland__section section_2__allPopular__popularDiv__instructor">Dr. Mervat Abo Elkeir</label>
                                        <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <label className="homeland__section section_2__allPopular__popularDiv__price">250 $</label>
                                    </div>

                                    <div className="homeland__section section_2__allPopular__popularDiv" >
                                        <div class="hovering">
                                            <img className="homeland__section section_2__allPopular__popularDiv__image" src={fullStackCourse}/>
                                        </div>
                                        <label className="homeland__section section_2__allPopular__popularDiv__title">React The Complete Guide (incl Hooks, React Router, Redux)</label>
                                        <label className="homeland__section section_2__allPopular__popularDiv__instructor">Dr. Mervat Abo Elkeir</label>
                                        <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <label className="homeland__section section_2__allPopular__popularDiv__price">250 $</label>
                                    </div>

                                    <div className="homeland__section section_2__allPopular__popularDiv" >
                                        <div class="hovering">
                                            <img className="homeland__section section_2__allPopular__popularDiv__image" src={pythonCourse}/>
                                        </div>
                                        <label className="homeland__section section_2__allPopular__popularDiv__title">React The Complete Guide (incl Hooks, React Router, Redux)</label>
                                        <label className="homeland__section section_2__allPopular__popularDiv__instructor">Dr. Mervat Abo Elkeir</label>
                                        <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <label className="homeland__section section_2__allPopular__popularDiv__price">250 $</label>
                                    </div>

                                    <div className="homeland__section section_2__allPopular__popularDiv" >
                                        <div class="hovering">
                                            <img className="homeland__section section_2__allPopular__popularDiv__image" src={aiCourse}/>
                                        </div>
                                        <label className="homeland__section section_2__allPopular__popularDiv__title">React The Complete Guide (incl Hooks, React Router, Redux)</label>
                                        <label className="homeland__section section_2__allPopular__popularDiv__instructor">Dr. Mervat Abo Elkeir</label>
                                        <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <label className="homeland__section section_2__allPopular__popularDiv__price">250 $</label>
                                    </div>

                                    <div className="homeland__section section_2__allPopular__popularDiv" >
                                        <div class="hovering">
                                            <img className="homeland__section section_2__allPopular__popularDiv__image" src={javaCourse}/>
                                        </div>
                                        <label className="homeland__section section_2__allPopular__popularDiv__title">React The Complete Guide (incl Hooks, React Router, Redux)</label>
                                        <label className="homeland__section section_2__allPopular__popularDiv__instructor">Dr. Mervat Abo Elkeir</label>
                                        <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <label className="homeland__section section_2__allPopular__popularDiv__price">250 $</label>
                                    </div>
                                </div>

                            </AppBar>
                        </Container>
                    </Grow>

                        <div className="arrowRight" onClick={slideRight}>
                            <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        </div>
                        
                    </div>

                </div>

                {/*<div className='footer'>footer</div>*/}


            </div>
        );
    }
}

export default homeLand;