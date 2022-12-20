import React, { Component } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideocamIcon from '@mui/icons-material/Videocam';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SummarizeIcon from '@mui/icons-material/Summarize';


import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import TextField from '@mui/material/TextField';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 95deg,rgb(216, 6, 33) 0%,rgb(225, 6, 33) 30%,rgb(70, 0, 10) 100%)',

    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        'green'
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
    'linear-gradient( 95deg,rgb(216, 6, 33) 0%,rgb(225, 6, 33) 30%,rgb(70, 0, 10) 100%)',

    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background:
    'green'


  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <InfoIcon />,
    2: <AutoStoriesIcon />,
    3: <SummarizeIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default class NewCreateCourse extends Component {

    state = {
        pageName:'Course Info',
        currentStep: 0,
        currentSubtitleIndex:0,
        currentSubtitleVideo:0,
        currentSubtitle: {
            title:'',
            hours:0,
            preview:'',
            videos:[{
                link:'',
                description:''
            }]
        },
        course :{
            title: '',
            subtitles: [{

                    title:'',
                    hours:0,
                    preview:'',
                    videos:[{
                        link:'',
                        description:''
                    }]

            }],
            price: '',
            summary: '',
            rating: 0,
            totalHours: '',
            discount: '',
            subject: '',
            instructor: 'instructor_id',
            exercises: []
        }
    }
    steps = [
        'Course Info',
        'Subtitles',
        'Final Info',
      ];

    handleBack = ()=>{
        this.setState({currentStep: this.state.currentStep - 1 < 0 ? 0 : this.state.currentStep - 1 })
    }
    handleNext = ()=>{
        this.setState({currentStep: this.state.currentStep + 1 >2 ? 2 : this.state.currentStep + 1 })
    }


    getContent = ()=>{
        if(this.state.currentStep === 0){
            return this.courseInfo();
        }
        if(this.state.currentStep === 1){
            return this.subtitlesInfo();
        }
        if(this.state.currentStep === 2){
            return this.lastInfo();
        }
    }
    courseInfo = ()=>{
        return <div className="addCourse__content__page-1">
            <div className='page-name'>Course Info</div>

            <TextField sx={{width:'50%'}} id="outlined-basic" label="Course Name" variant="outlined" />
            <FormControl sx={{width:'30%', marginLeft:'20px'}}>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={20}
                label="Subject"
                onChange={this.handleChange}
                >
                <MenuItem value={10}>Computer</MenuItem>
                <MenuItem value={20}>Math</MenuItem>
                <MenuItem value={30}>IDK</MenuItem>
                </Select>
            </FormControl>
        </div>
    }

    lastInfo = ()=>{
        return <div className="addCourse__content__page-2">
            <div className='page-name'>Course Summary & Price</div>

            <TextField sx={{width:'50%'}} id="outlined-basic" label="Course Summary" variant="outlined" multiline rows={6}/>
            <div style={{width:'50%'}}>
                <TextField type="number" sx={{width:'30%', marginTop:'10px'}} id="outlined-basic" label="Price" variant="outlined" />
            
            </div>


        </div>
    }
    addVideo = ()=>{
        var newVideosIndex = (this.state.course.subtitles[this.state.currentSubtitleIndex].videos).length;
        var newVideo = {link:'',description:''};
        var currentVids = [...this.state.course.subtitles[this.state.currentSubtitleIndex].videos];
        currentVids.push(newVideo);
        var newSubtitle = {...this.state.course.subtitles[this.state.currentSubtitleIndex]};
        newSubtitle.videos = currentVids;
        var newCourse = {...this.state.course};
        newCourse.subtitles[this.state.currentSubtitleIndex] = newSubtitle;
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
                description:''
            }]
        }
        var currentSubs = [...this.state.course.subtitles];
        currentSubs.push(newSubtitle);
        var newCourse = {...this.state.course};
        newCourse.subtitles = currentSubs;
        // this.changeSubtitle(newSubIndex);
        this.setState({course:newCourse,currentSubtitle:newSubtitle ,currentSubtitleIndex:newSubIndex,  currentSubtitleVideo:0})
    }
    subtitlesInfo = ()=>{
        return(
            <div style={{position:'relative', width:'50%', border: '1px solid grey', padding:'20px', borderRadius:'10px',paddingTop:'70px',}}>
                <div className='page-name-subtitle' >Course Subtitle(s)</div>

                <div className='subtitles-display' >
                    {this.displaySubtitles()} 
                </div>

                <div className='instructorCourse-drawer__options__option__sub-header'>
                    {this.getSubtitles()}
                </div>
                <div style={{width:'100%', color:'var(--primary-color)', display:'flex', justifyContent:'flex-end', alignItems:'center',padding:'10px'}}>
                    Subtitle
                    <AddIcon onClick={this.addSubtitle} style={{cursor:'pointer',fontSize:'40px', fontWeight:'bolder'}}/> 
                </div>
            </div>
        )
    }
    getSubtitles = ()=>{
        return this.subtitleComp();
    }
    changeSubtitle = (index)=>{
        var newSubtitle = this.state.course.subtitles[index] ? this.state.course.subtitles[index]: this.props.course.subtitles[0];
        var currentSubtitleIndex = this.state.course.subtitles[index] ? index : 0;
        this.setState({updated:false, currentSubtitle:newSubtitle,currentSubtitleIndex:currentSubtitleIndex, currentSubtitleVideo:0});
    }
    displaySubtitles = ()=>{
        return this.state.course.subtitles&&this.state.course.subtitles.map((subtitle, index)=>{

             return(
                 <div id={index} className= {`subtitleD ${this.state.currentSubtitleIndex === index? 'selected-subtitle':''}`} onClick={() => {this.changeSubtitle(index)}}>
                    <LibraryBooksIcon/> {'Subtitle '+(index+1)}
                 </div>
             )
         })
     }
     //currentSubtitleVideo
     changeVideo = (newIndex)=>{
        this.setState({currentSubtitleVideo:newIndex});
     }
     displayVideos = ()=>{
        var vids = this.state.course.subtitles[this.state.currentSubtitleIndex].videos;
        return vids&&vids.map((video, index)=>{

             return(
                 <div id={index} className= {`subtitleD ${this.state.currentSubtitleVideo === index? 'selected-subtitle':''}`} onClick={() => {this.changeVideo(index)}}>
                    <VideocamIcon />{'Video '+(index+1)}
                 </div>
             )
         })
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
        course.subtitles[this.state.currentSubtitleIndex] = newSubtitle;

        this.setState({currentSubtitle:newSubtitle, course: course})

    }
    subtitleComp = () =>{
        var subtitle = this.state.currentSubtitle;

        return(
            <div className='subtitle' style={{width:'100%'}}>
                <div className='subtitle__header'>
                    
                    <TextField id={subtitle.title + '1'} onChange={this.updateSubTitle} value={subtitle.title} label="Subtitle Title" variant="outlined" />

                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__value' style={{display:'flex',alignItems:'center'}}>
                        <TextField id={this.state.course.title+'1'} onChange={this.updateSubHours} value={subtitle.hours} label="Subtitles Hour(s)" variant="outlined" />
                        <div style={{color:'grey', marginLeft:'5px'}}>
                            Hour(s)
                        </div>
                    </div>
                </div>
                <div className='subtitles-display' >
                    {this.displayVideos()} 
                </div>
                <div className='subtitle__info'>
                    <div className='subtitle__info__key'>
                        <TextField id={this.state.course.title+'0'} onChange={this.updateSubVideoLink} value={subtitle.videos[this.state.currentSubtitleVideo].link} label="Video URL" variant="outlined" />
                    </div>
                    <div style={{width:'100%', color:'var(--primary-color)', display:'flex', justifyContent:'flex-end', alignItems:'center',padding:'10px'}}>
                        <div style={{fontWeight:'lighter'}}>Video</div>
                        <VideoCallIcon onClick={this.addVideo} style={{cursor:'pointer',fontSize:'40px', fontWeight:'bolder'}}/> 
                    </div>
                </div>

                <div className='subtitle__info'>
                    <div className='subtitle__info__key' style={{width:'100%'}}>
                        <TextField id={this.state.course.title+'2'} onChange={this.updateSubVideoDesc} value={subtitle.videos[this.state.currentSubtitleVideo].description} label="Video Description" variant="outlined" multiline rows={3} fullWidth />
                    </div>
                </div>

            </div>
        )
    }
  render() {
    return (
      <div className='addCourse'>
        <Stepper  alternativeLabel activeStep={this.state.currentStep} connector={<ColorlibConnector />}>
            {this.steps.map((label) => (
            <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>

        <div className='addCourse__content'>
                {this.getContent()}
        </div>

        <div className='addCourse__footer'>
            <div className='addCourse__footer__btns'>
                <SecondaryBtn function={this.handleBack} btnText="Back"/>
                <PrimaryBtn function={this.handleNext} btnText={this.state.currentStep === 2? 'Add Course':'Next'}/>
            </div>
        </div>
      </div>
    )
  }
}
