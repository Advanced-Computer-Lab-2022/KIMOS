import React, { Component } from 'react';
import ReviewComment from './reviewComment';
import TextField from '@mui/material/TextField';
import {PieChart, Pie, ResponsiveContainer, Tooltip} from 'recharts'
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {showAlert} from '../redux/actions';
import {connect} from 'react-redux';

import axios from 'axios';



class instructorCourse extends Component {

    state = {
        course:{},
        currentSubtitle:{videos:[{}]},
        currentSIndex:0,
        currentSubtitleVideo:0,
        displayedStartDate:new Date(),
        displayedEndDate:new Date(),
        discountFlag: false,
        updated:false
    }
    componentDidMount(){

        this.setState({course:this.props.course, currentSubtitle:this.props.course.subtitles[0]})
        if(!this.props.course.video){
            var course = this.props.course;
            course.subtitles.forEach((subtitle,index)=>{
                if(!subtitle.video){
                    course.subtitles[index].video = {link:"",description:""};
                }
            })

            this.setState({course:course})
        }
        if(this.props.course.discount.duration && this.props.course.discount.duration.startDate){
            this.setState({displayedStartDate: this.props.course.discount.duration.startDate})
        }
        if(this.props.course.discount.duration && this.props.course.discount.duration.endDate){
            this.setState({displayedEndDate: this.props.course.discount.duration.endDate})

        }
        
    }

    updateSubVideoDesc = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.videos[this.state.currentSubtitleVideo].description = e.target.value;
        this.updateAnySub(subtitle);

    }
    updateSubVideoLink = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.videos[this.state.currentSubtitleVideo].link = e.target.value;
        this.updateAnySub(subtitle);
        
    }
    
    updateSubHours = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.hours = e.target.value;

        this.updateAnySub(subtitle);

    }
    updateSubTitle = (e)=>{
        var subtitle = {...this.state.currentSubtitle};
        subtitle.title = e.target.value;
        this.updateAnySub(subtitle);
    }
    updateAnySub = (newSubtitle)=>{
        var course = {...this.state.course};
        course.subtitles[this.state.currentSIndex] = newSubtitle;

        this.setState({updated:true,currentSubtitle:newSubtitle, course: course})

    }
    updatePreviewLink = (e)=>{
        var course = {...this.state.course};
        course.preview = e.target.value;
        this.setState({updated:true, course:course});
    }
    subtitleComp = () =>{
        var subtitle = this.state.currentSubtitle;

        return(
            <div className='subtitle' style={{ width:'100%'}}>
                <div className='subtitle__header'>
                    
                    <TextField id={subtitle.title + '1'} onChange={this.updateSubTitle} value={subtitle.title} label="Subtitle Title" variant="outlined" />

                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__value' style={{display:'flex',alignItems:'center'}}>
                        <TextField id={this.state.course.title+'1'} value={subtitle.hours} label="Subtitles Hour(s)" variant="outlined" readOnly/>
                        <div style={{color:'grey', marginLeft:'5px'}}>
                            Hour(s)
                        </div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', cursor:'pointer'}} onClick={()=>{this.createExam('subtitle')}} >
                        <PostAddIcon style={{cursor:'pointer',fontSize:'40px', fontWeight:'bolder', color:'var(--primary-color)'}}/>
                        <div style={{fontWeight:'lighter', fontSize:'20px'}}>Create Quiz</div>
                    </div>
                </div>



                <div className='subtitles-display' style={{ width:'100%'}}>
                    <VideoCallIcon onClick={this.addVideo} style={{cursor:'pointer',fontSize:'40px', fontWeight:'bolder', color:'var(--primary-color)'}}/> 

                    {this.displayVideos()}
                </div>
                <div className='subtitle__info'>
                    <div className='subtitle__info__key'>
                        <TextField id={this.state.course.title+'0'} onChange={this.updateSubVideoLink} value={subtitle.videos[this.state.currentSubtitleVideo].link} label="Video URL" variant="outlined" />
                    </div>
                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__key' style={{width:'80%'}}>
                        <TextField id={this.state.course.title+'2'} onChange={this.updateSubVideoDesc} value={subtitle.videos[this.state.currentSubtitleVideo].description} label="Video Description" variant="outlined" multiline rows={3} fullWidth />
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
        this.setState({updated:false, currentSubtitle:newSubtitle,currentSIndex:currentSIndex, currentSubtitleVideo:0});
    }
    addVideo = ()=>{
        var newVideosIndex = (this.state.course.subtitles[this.state.currentSIndex].videos).length;
        var newVideo = {link:'',description:'', hours:0.9};
        var currentVids = [...this.state.course.subtitles[this.state.currentSIndex].videos];
        currentVids.push(newVideo);
        var newSubtitle = {...this.state.course.subtitles[this.state.currentSIndex]};
        newSubtitle.videos = currentVids;
        var newCourse = {...this.state.course};
        newCourse.subtitles[this.state.currentSIndex] = newSubtitle;
        this.setState({course:newCourse,currentSubtitle:newSubtitle ,currentSubtitleVideo:newVideosIndex}, ()=>{
            console.log(newCourse);
        })
    }
    addSubtitle = ()=>{

        var newSubIndex = (this.state.course.subtitles).length;
        var newSubtitle = {
            title:'',
            hours:0,
            preview:'',
            videos:[{
                link:'',
                description:'',
                hours:0.9
            }]
        }
        var currentSubs = [...this.state.course.subtitles];
        currentSubs.push(newSubtitle);
        var newCourse = {...this.state.course};
        newCourse.subtitles = currentSubs;
        this.setState({course:newCourse,currentSubtitle:newSubtitle ,currentSIndex:newSubIndex, updated:true,  currentSubtitleVideo:0})
    }

    changeVideo = (index)=>{this.setState({currentSubtitleVideo: index})}
    displayVideos = ()=>{
        if(this.state.course && this.state.course.subtitles && this.state.course.subtitles[this.state.currentSIndex].videos ){

            var vids = this.state.course && this.state.course.subtitles && this.state.course.subtitles[this.state.currentSIndex].videos 
            return vids&&vids.map((video, index)=>{
    
                 return(
                     <div id={index} className= {`subtitleD ${this.state.currentSubtitleVideo === index? 'selected-subtitle':''}`} onClick={() => {this.changeVideo(index)}}>
                        <VideocamIcon />{'Video '+(index+1)}
                     </div>
                 )
             })
        }
     }
    displaySubtitles = ()=>{
        return this.state.course.subtitles&&this.state.course.subtitles.map((subtitle, index)=>{

             return(
                 <div id={index} className= {`subtitleD ${this.state.currentSIndex === index? 'selected-subtitle':''}`} onClick={() => {this.changeSubtitle(index)}}>
                    {true? 'Subtitle'+(index+1):subtitle.title}
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
        console.log(this.state.course)
        var toBeSubmitted = {}
        toBeSubmitted.discountFlag = this.state.discountFlag;
        toBeSubmitted.courseId = this.state.course['_id'];
        toBeSubmitted.course = this.state.course;
        if(this.state.discountFlag){

            if(this.state.course.discount.amount > 0){

                toBeSubmitted.course.discount.duration = {};
                toBeSubmitted.course.discount.duration.startDate = this.state.displayedStartDate;
                toBeSubmitted.course.discount.duration.endDate = this.state.displayedEndDate;
            }

        }




        this.submitNewCourse(toBeSubmitted)


    }

    

    submitNewCourse = async (course) => {
        try {
          const res = await axios.put('http://localhost:5000/courses?courseId='+ this.state.course['_id'],course, {
            headers: {  }
          });
          console.log(res);
        if(res.data.success){
            this.props.showAlert({shown:true, message:'Updated your Course',severity:'success'})

            this.props.onClose()
        }
        else
          this.props.showAlert({shown:true, message:'Couldnt Update your Course',severity:'error'})

        
        } catch (e) {

          this.props.showAlert({shown:true, message:'Couldnt Update your Course',severity:'error'})


        }
      };

    updateDiscount = (e)=>{
        var course = {...this.state.course};
        course.discount.amount = e.target.value;
        this.setState({updated:true, course:course, discountFlag:true});
    }
    setStartDate = (newValue)=>{
        console.log(newValue);
        // var course = {...this.state.course};
        // course.discount.startDate = newValue;
        this.setState({updated:true, discountFlag:true, displayedStartDate:newValue});
    };

    setEndDate = (newValue)=>{
        // var course = {...this.state.course};
        // course.discount.endDate = newValue;
        this.setState({updated:true, discountFlag:true, displayedEndDate:newValue});

    };
    createExam = (type)=>{
        if(type === 'course'){
            const courseId = this.props.course['_id'];
            window.location.href = '/instructor/createQuiz?courseId='+courseId;
        }
        else{
            const courseId = this.props.course['_id'];
            const subtitleId = this.state.currentSubtitle['_id'];
            console.log(courseId);
            console.log(subtitleId);
            window.location.href = '/instructor/createQuiz?courseId='+courseId+'&subtitleId='+subtitleId;
        }
    }



    displayDate = ()=>{


        if(this.state.course.discount && this.state.course.discount.amount > 0)
        return(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='date-picker'>
                    <DatePicker
                    label="Start Date"
                    value={this.state.displayedStartDate}
                    onChange={(newValue) => {
                        // setValue(newValue);

                        this.setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <div className='date-picker__sep'/>
                    <DatePicker

                    label="Ending Date"
                    value={this.state.displayedEndDate}

                    onChange={(newValue) => {
                        // setValue(newValue);
                        this.setEndDate(newValue);


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
                    <div>
                        <div className='instructorCourse-drawer__options__option__sub-header'>
                            Course Preview URL
                        </div>       
                        <div className='instructorCourse-drawer__options__option__sub-header' style={{marginBottom:'10px',marginTop:'10px'}}>
                            <TextField onChange={this.updatePreviewLink} value={course.preview} label="Videl URL" variant="outlined" />
                            <div style={{display:'flex', alignItems:'center', cursor:'pointer'}} onClick={()=>{this.createExam('course')}} >
                                <PostAddIcon style={{cursor:'pointer',fontSize:'40px', fontWeight:'bolder', color:'var(--primary-color)'}}/>
                                <div style={{fontWeight:'lighter', fontSize:'20px'}}>Create Final Exam</div>
                            </div>
                        </div>   
                                    
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

                        </div>      
                        <div className='subtitles-display'>
                            <AddToPhotosIcon onClick={this.addSubtitle} style={{cursor:'pointer',fontSize:'40px', fontWeight:'bolder', color:'var(--primary-color)'}}/> 

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

export default connect(null, {showAlert})(instructorCourse);

