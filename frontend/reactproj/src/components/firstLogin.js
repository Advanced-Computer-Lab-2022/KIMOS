import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
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
import TextField from '@mui/material/TextField';
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PaymentPolicy from './paymentPolicy';
import { showAlert,setUser } from '../redux/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';

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

  
class SignUp extends Component {
    handleLogout = async()=>{

        try{
            const res = await axios.post("http://localhost:5000/logout");


            if(res.data.success){
                this.props.setUser({username:"",userType:""});
                window.location.href = '/login';
            }
            else{
                alert("err occurred")
            }

        }catch(e){
            console.log(e);
        }

        
    }

  handleSubmit = (event) => {


    axios.put(`http://localhost:5000/users/`,this.state.data)
    .then(res=>{
      if(res.data.success){
        this.props.showAlert({shown:true, message:'Updated your details',severity:'success'})
        this.handleLogout()
      }
      else{
        this.props.showAlert({shown:true, message:'Couldnt update your details',severity:'error'})

      }

    })
    .catch(e=>{
      this.props.showAlert({shown:true, message:'Couldnt update your details',severity:'error'})
    })
  };

    steps = this.props.user.userType !== 'corporate trainee'?['Your Info', 
             'Terms And Conditions',
            'Contract'] : ['Your Info', 
            'Terms And Conditions'];
    lastStep =  this.props.user.userType !== 'corporate trainee'? 3 : 2;
    state = {
        currentStep : 0,
        acceptedTerms:false,
        data:{
          username:'',
          email:'',
          firstName:'',
          lastName:'',
          password:''
        }
    }
    handleBack = ()=>{
        console.log(this.state);
        this.setState({currentStep: this.state.currentStep - 1 < 0 ? 0 : this.state.currentStep - 1 })
    }
    handleNext = ()=>{
        console.log(this.state);

        this.setState({currentStep: this.state.currentStep + 1 >this.lastStep ? this.lastStep : this.state.currentStep + 1 })
    }
    getPolicy = (name, list)=>{
        return (
            <div>
                <div className="signUp-container__content__policy__name">
                    <div>{name}</div>
                </div>
                <div className="signUp-container__content__policy__list">
                    <ul>
                        {list.map((item)=>{return <li>{item}</li>})}
                    </ul>
                </div>
            </div>
        )
    }
    validateInfo = ()=>{
      var flag = true;
      Object.keys(this.state.data).forEach((key)=>{
        if(this.state.data[key] === '') flag = false;
      })
      return flag;
    }
    handleChange = (e)=>{
      var data ={...this.state.data};
      data[e.target.id] = e.target.value;
      this.setState({data:data});
      console.log(data);
    }
    getContent= ()=>{
        if(this.state.currentStep === 0){
            return ( 
                <div className="signUp-container__content">
                        <div className='signUp-container__content__form'>
                            <div className='signUp-container__content__form__title'>Enter Your Details</div>
                            <div className='signUp-container__content__form__names'>
                                <TextField value={this.state.data['firstName']} onChange={this.handleChange} style={{margin:'10px'}} id="firstName" label="First Name" variant="outlined" />
                                <TextField value={this.state.data['lastName']} onChange={this.handleChange} style={{margin:'10px'}} id="lastName" label="Last Name" variant="outlined" />
                            </div>

                            <div className='signUp-container__content__form__else'>
                                <TextField value={this.state.data['email']} onChange={this.handleChange} style={{margin:'10px'}} id="email" label="Email" variant="outlined" />
                                <TextField value={this.state.data['username']} onChange={this.handleChange} style={{margin:'10px'}} id="username" label="Username" variant="outlined" />
                                <TextField value={this.state.data['password']} onChange={this.handleChange}  type="password" style={{margin:'10px'}} id="password" label="Password" variant="outlined" />   
                            </div>

                        </div>
                </div>
            )
        }

        if(this.state.currentStep === 1){
            return ( 
                <div className="signUp-container__content" style={{position:'relative'}}>
                    <div className="signUp-container__content__policy">


                        <PaymentPolicy />
                    </div>
                    <div style={{
                        position:'absolute',
                        right:0,
                        bottom:0
                    }}>
                        <FormControlLabel control={<Checkbox  checked={this.state.acceptedTerms} onChange={(v)=>{this.setState({acceptedTerms: !this.state.acceptedTerms})}}/>} label="Accept All Terms & Conditions" />
                    </div>
                </div>
            )
        }
    if(this.state.currentStep === 2){
        return (this.contract())
    }
    }
  contract = ()=>{
    return (        <div className='contract'>
    <div style={{display:'flex', alignItems:'center'}}>
        <div className='contract__title'>Contract</div>

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

        </div>


    
    </div>

</div>)
  }
  render() {
    return (
      <div className='signUp-container'>
        <Stepper  alternativeLabel activeStep={this.state.currentStep} connector={<ColorlibConnector />}>
            {this.steps.map((label) => (
            <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>


        {this.getContent()}


        <div className='addCourse__footer'>
            <div className='addCourse__footer__btns'>
                <SecondaryBtn function={this.handleBack} btnText="Back"/>
                <PrimaryBtn disabled={(this.state.currentStep === 0 && !this.validateInfo()) || (this.state.currentStep === 1&& !this.state.acceptedTerms)} function={this.state.currentStep===(this.lastStep -1) ? this.handleSubmit:this.handleNext} btnText={this.state.currentStep === this.lastStep -1? 'Accept & Save':'Next'}/>
            </div>
        </div>

      </div>
    )
  }
}




// {this.getPolicy("Website & Company Policy", [1,2,3,4])}
// {this.getPolicy("Refund Policy", [1,2,3,4])}
// {this.getPolicy("Payment Policy", [1,2,3,4])}

const mapStateToProps = (state) =>{
   
  return {
      user: state.user
  };
}

export default connect(mapStateToProps, { showAlert,setUser })(SignUp);
