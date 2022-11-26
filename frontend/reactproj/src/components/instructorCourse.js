import React, { Component } from 'react';
import ReviewComment from './reviewComment';
import TextField from '@mui/material/TextField';
import {PieChart, Pie, ResponsiveContainer, Tooltip} from 'recharts'
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Box from '@mui/material/Box';

class instructorCourse extends Component {

    state = {
        course:{},
        currentSubtitle:{video:{}},
        currentSIndex:0,
        updated:false
    }
    componentDidMount(){
        this.setState({course:this.props.course, currentSubtitle:this.props.course.subtitles[0]})
        
    }

    updateSubVideoDesc = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.video.description = e.target.value;
        this.setState({updated:true, currentSubtitle:subtitle});
    }
    updateSubVideoLink = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.video.link = e.target.value;
        this.setState({updated:true, currentSubtitle:subtitle});
    }
    
    updateSubHours = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.hours = e.target.value;
        this.setState({updated:true, currentSubtitle:subtitle});
    }
    updatePreviewLink = (e)=>{
        var course = {...this.state.course};
        course.preview = e.target.value;
        this.setState({updated:true, course:course});
    }
    subtitleComp = () =>{
        var subtitle = this.state.currentSubtitle;

        return(
            <div className='subtitle'>
                <div className='subtitle__header'>
                    {subtitle.title}
                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__value' style={{display:'flex',alignItems:'center'}}>
                        <TextField id={this.state.course.title+'1'} onChange={this.updateSubHours} value={subtitle.hours} label="Subtitles Hour(s)" variant="outlined" />
                        <div style={{color:'grey', marginLeft:'5px'}}>
                            Hour(s)
                        </div>
                    </div>
                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__key'>
                        <TextField id={this.state.course.title+'0'} onChange={this.updateSubVideoLink} value={subtitle.video.link} label="Videl URL" variant="outlined" />
                    </div>
                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__key' style={{width:'100%'}}>
                        <TextField id={this.state.course.title+'2'} onChange={this.updateSubVideoDesc} value={subtitle.video.description} label="Videl Description" variant="outlined" multiline rows={3} fullWidth />
                    </div>
                </div>
            </div>
        )
    }
    getSubtitles = ()=>{
        return this.subtitleComp(this.props.course.subtitles[this.state.currentSIndex]);
    }
    changeSubtitle = (index)=>{
        var newSubtitle = this.state.course.subtitles[index] ? this.state.course.subtitles[index]: this.props.course.subtitles[0];
        var currentSIndex = this.state.course.subtitles[index] ? index : 0;
        this.setState({updated:false, currentSubtitle:newSubtitle,currentSIndex:currentSIndex});
    }
    addSubtitle = ()=>{

        var newSubIndex = (this.state.course.subtitles).length;
        var newSubtitle = {
            title:'',
            hours:0,
            preview:'',
            video:{
                link:'',
                description:''
            }
        }
        var currentSubs = [...this.state.course.subtitles];
        currentSubs.push(newSubtitle);
        var newCourse = {...this.state.course};
        newCourse.subtitles = currentSubs;
        // this.changeSubtitle(newSubIndex);
        this.setState({course:newCourse,currentSubtitle:newSubtitle ,currentSIndex:newSubIndex})
    }
    displaySubtitles = ()=>{
        return this.state.course.subtitles&&this.state.course.subtitles.map((subtitle, index)=>{

             return(
                 <div id={index} className= {`subtitleD ${this.state.currentSIndex === index? 'selected-subtitle':''}`} onClick={() => {this.changeSubtitle(index)}}>
                     Subtitle {index+1}
                 </div>
             )
         })
     }
    
    generateGraphData = ()=>{


        
    }
    confirmChanges = ()=>{
        //update the current subtitle
        //update the course promotion with date for sure
        //update the course preview 
        // console.log(this.currentSubtitle);
        // console.log(this.state.course.discount);
        // console.log(this.state.course.preview);
        console.log(this.state.course);

    }
    updateDiscount = (e)=>{
        var course = {...this.state.course};
        course.discount.amount = e.target.value;
        this.setState({updated:true, course:course});
    }
    displayDate = ()=>{


        if(this.state.course.discount && this.state.course.discount.amount > 0)
        return(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='date-picker'>
                    <DatePicker
                    label="Start Date"
                    // value={value}
                    onChange={(newValue) => {
                        // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <div className='date-picker__sep'/>
                    <DatePicker

                    label="Ending Date"
                    // value={value}
                    onChange={(newValue) => {
                        // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </div>

          </LocalizationProvider>
        )
        else
            return <div></div>
    }
    render() {
        var course = this.state.course;
        const data01 = [
            {
              "name": "1 Star",
              "value": 12
            },
            {
              "name": "2 Stars",
              "value": 4
            },
            {
              "name": "3 Stars",
              "value": 40
            },
            {
              "name": "4 StarD",
              "value": 10
            },
            {
              "name": "5 Stars",
              "value": 102
            }
          ];
         
        return (
            <div className='instructorCourse-drawer'>
                <div className='instructorCourse-drawer__left'>
                <div className='instructorCourse-drawer__header'>
                    {course.title}
                </div>
                <div className='instructorCourse-drawer__options'>

                    <div className='instructorCourse-drawer__options__option'>
                        <div className='instructorCourse-drawer__options__option__sub-header'>
                            Course Preview URL
                        </div>       
                        <div className='instructorCourse-drawer__options__option__sub-header' style={{marginBottom:'10px',marginTop:'10px'}}>
                            <TextField onChange={this.updatePreviewLink} value={course.preview} label="Videl URL" variant="outlined" />
                        </div>
                    </div>
                    <div className='instructorCourse-drawer__options__option'>
                        <div className='instructorCourse-drawer__options__option__sub-header'>
                            Course Promotion
                        </div>       
                        <div className='instructorCourse-drawer__options__option__sub-header' style={{marginBottom:'10px',marginTop:'10px'}}>
                            <div style={{display:'flex', alignItems:'center',}}>
                                <TextField onChange={this.updateDiscount} value={this.state.course.discount ?this.state.course.discount.amount:0} label="Discount" variant="outlined" />
                                <div style={{color:'grey', marginLeft:'5px'}}>%</div>
                            </div>
                            {this.displayDate()}

                        </div>
                    </div>
                    <div className='instructorCourse-drawer__options__option'>
                        <div className='instructorCourse-drawer__options__option__sub-header'>
                            
                            <div>
                                Subtitle(s)
                            </div>
                            <div>
                                <SecondaryBtn btnText='Add Subtitle' function={this.addSubtitle}/>
                            </div>
                        </div>      
                        <div className='subtitles-display'>
                            {this.displaySubtitles()} 
                        </div>
 
                        <div className='instructorCourse-drawer__options__option__sub-header'>
                            {this.getSubtitles()}
                        </div>
                    </div>

                </div>

                    {this.state.updated && 

                        <div  className='save-btn' >
                            <PrimaryBtn btnText='Save Changes' function={this.confirmChanges}/>
                        </div>
                    }
                </div>

                <div className='instructorCourse-drawer__ratingsAndReviews'>
                    <div className='instructorCourse-drawer__ratingsAndReviews__header'>
                       Reviews
                    </div>
                    <div>
                    <ResponsiveContainer width='100%' height={300} >
                        <PieChart style={{background:'var(--cool-grey)',borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Pie label={true} labelLine={true} data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="var(--primary-color)" />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
  
                    </div>
                    <div className='instructorCourse-drawer__ratingsAndReviews__reviews'>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={5} comment='It Does not Needs more exercises. Very Cool.'/>
                        <ReviewComment username='Eren' rating={5} comment='It Does not Needs more exercises. Very Cool.'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={5} comment='It Does not Needs more exercises. Very Cool.'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={3} comment='Needs more exercises'/>
                        <ReviewComment username='Eren' rating={5} comment='It Does not Needs more exercises. Very Cool.'/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default instructorCourse;