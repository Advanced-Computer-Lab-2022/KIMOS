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
// const axios = require('axios');

// var Navigation = require('react-router').Navigation;

class navbar extends Component {

 


    state = {
        searchContent:'',
        loading:false,
        courses:[]
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
                <input className="search-bar__input" type="text" placeholder="Explore our courses" id="searchContent" value={this.state.searchContent} onChange={(e)=>this.changeInput(e)}/>
                <form className="search-bar__btn">
                    <SearchIcon fontSize="large" onClick={this.enterSearch} />
                </form>
            </div>
        )
    }
    changeUserType = (e)=>{

        this.props.setUserType(e.target.value);
    }
    logOut = ()=>{
        this.props.setUser({username:"",userType:""})
    }
    actions = [
        { icon: <Person2Icon />, name: 'Profile', function: ()=>{ window.location.href = '/user/profile'} },
        { icon: <LogoutIcon />, name: 'Logout',  function: ()=>{ window.location.href = '/login'} },

      ];

      
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
                    {this.props.user.username ===''&&<SecondaryButton function={this.exampleFunction} btnSize="medium" btnText="Sign Up"/>}
                    <ThemeSwitcher />

                    <CountrySelector />
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
