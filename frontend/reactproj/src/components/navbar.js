import React, { Component } from 'react';
import PrimaryButton from './buttons/primaryBtn';
import SecondaryButton from './buttons/secondaryBtn';
import SearchIcon from '@mui/icons-material/Search';
import CountrySelector from './countrySelector';
import ThemeSwitcher from './themeSwitcher';
import { setCourses, setUserType, setUser } from '../redux/actions/index';
import {connect} from 'react-redux';
import ColorRangePicker from './colorRangePicker';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import cccLogo from '../assets/cccLogo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';

import axios from 'axios';


// var Navigation = require('react-router').Navigation;

class navbar extends Component {

 


    state = {
        searchContent:'',
        loading:false,
        courses:[], 
        showNot:false
    }
    changeInput = (event)=>{
        this.setState({[event.target.id]:event.target.value})
    }


    enterSearch = ()=>{
        //write the end point to get the results
        // this.addCourses();
        // window.location.href = '/courses'
        window.location.href = ('/courses/search?q='+ this.state.searchContent+'&page=1');
    }
    goHome = ()=>{
        window.location.href = '/'
    }
    searchBar = ()=>{
        return(
            <div className="search-bar">
                <CountrySelector />
                <input className="search-bar__input" type="text" placeholder="Explore our courses" id="searchContent" value={this.state.searchContent} onChange={(e)=>this.changeInput(e)}/>
                <form className="search-bar__btn">
                    <SearchIcon fontSize="large" onClick={this.enterSearch} />
                </form>
            </div>
        )
    }

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
    actions = [
        { icon: <Person2Icon />, name: 'Profile', function: ()=>{ window.location.href = '/'+this.props.user.userType+'/profile'} },
        { icon: <LogoutIcon />, name: 'Logout',  function: ()=>{ this.handleLogout()} },

      ];

    handleClose = ()=>{
        console.log('closing')
        this.setState({showNot: false})
    }
    handleOpen = ()=>{
        console.log('opened')
        this.setState({showNot: true})
    }
    getNotifications = ()=>{
        const mssgs = ["Open your mail please", "Your Refund Request is approved", "Your Refund Request is approved", "Your Refund Request is approved", "Your Refund Request is approved", "Your Refund Request is approved"];
        var nots = []
        var types = ['info','succ','err'];
        mssgs.forEach((mssg, index)=>{
            var obj = {};
            obj['type'] = types[index%3]
            obj['mssg'] = mssg;
            nots.push(obj);
        })

        return (
            <Dialog 
            maxWidth = 'sm'
            PaperProps={{ sx: { overFlow:'hidden',borderRadius:'10px', position:'absolute',right:'0',top:'0',width: "20%", height: "50%", marginTop:'50px', marginRight:'90px' } }}
            onClose={this.handleClose} open={this.state.showNot} className='nots-dialog'>
                <div className="nots-dialog__in">
                
                    <DialogTitle>Notification(s)</DialogTitle>
                    <List sx={{ pt: 0,  paddingLeft:'10px', paddingRight:'10px', paddingTop:'10px' }}>
                    {nots.map((notItem,index) => {
                        var color = '#1DA1F2';
                        var icon =  <InfoIcon />
                        if(notItem.type ==='succ') {color = '#006400'; icon = <CheckCircleIcon />}
                        if(notItem.type === 'err') {color = 'var(--primary-color)'; icon = <ErrorIcon/>};

                        return (
                        <ListItem className="not-item" >
                        <ListItemButton  key={index}>
                            <ListItemAvatar sx={{color:color}}>
                            <Avatar sx={{color:'white', background:color}}>
                                {icon}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={notItem.mssg} />
                        </ListItemButton>
                        </ListItem>
                        )
                        })}
            
                    
                    </List>    
                </div>

            </Dialog>
        )
    }
      
    render() {
        return (
            <div className="navbar">
                <div className="title" onClick={this.goHome} style={{display:'flex', alignItems:'center'}}>
                    <img src={cccLogo} alt="KIMOS" width="200" height="80"/>
                </div>

                <div className="options">
                    {this.searchBar()}
                </div>

                <div className="user-options">
                    

                    {this.props.user.username ===''&&<PrimaryButton function={()=>{window.location.href = '/login'}} btnSize="medium" btnText="Log In"/>}
                    {this.props.user.username ===''&&<SecondaryButton function={()=>{window.location.href = '/signUp'}} btnSize="medium" btnText="Sign Up"/>}
                    <ThemeSwitcher />

                    {this.props.user.username !=='' && <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        onClick={this.handleOpen}
                    >
                        <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                        </Badge>

                    </IconButton>}
                    {this.props.user.username !=='' && <div className="notifications">
                        {this.getNotifications()}
                    </div>}
                    {this.props.user.username !==''&& this.props.user.userType+'/'+this.props.user.username}
                    {this.props.user.username !==''&& <div style={{position:'relative', height:'100px',width:'80px' }}>
                        <SpeedDial
                        ariaLabel="User Options"
                        direction={"down"}
                        sx ={{position:'absolute', top:'100%', left:'50%', transform:'translate(-50%,-50%)'}}
                        icon={<Person2Icon />}
                        >
                            {this.actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.function}
                            />
                            ))}
                        </SpeedDial>
                    </div>}



                </div>

            </div>
        );
    }
}




const mapStateToProps = (state) =>{
   
    return {
        courses: state.courses,
        uesrType: state.userType,
        user: state.user
    };
  }
  
  
export default connect(mapStateToProps, {setUser:setUser,setCourses:setCourses, setUserType:setUserType})(navbar)
  

//<ColorRangePicker/>
