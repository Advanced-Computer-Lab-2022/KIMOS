import React, { Component } from 'react';
import eren from '../assets/eren-yeager.png';
import erenSmiling from '../assets/eren-smiliing.png';
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Rating from '../components/rating';
import SecondaryBtn from './buttons/secondaryBtn';
import PrimaryBtn from './buttons/primaryBtn';
import TextField from '@mui/material/TextField';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReportIcon from '@mui/icons-material/Report';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

import {connect} from 'react-redux';

import axios from 'axios';

class UserProfile extends Component {
  state = {
    editing: false,
    instructor: {
      username: '',
      email: '',
      biography: '',
      password: ''
    },
    new_instructor: {
      username: '',
      email: '',
      biography: '',
      password: ''
    }
  };
  componentDidMount() {
    this.getUserInfo();
  }
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };
  handleChange = (e) => {
    var oldUser = { ...this.state.new_instructor };
    oldUser[e.target.id] = e.target.value;
    this.setState({ new_instructor: oldUser });
  };
  cancel = () => {
    this.setState({ new_instructor: this.state.instructor });
    this.toggleEditing();
  };
  save = async () => {
    console.log(this.state.new_instructor);
    this.setState({ instructor: this.state.new_instructor });
    this.updateUserInfo();
    this.toggleEditing();
  };
  getUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      console.log(res);
      var info = {
        id: res.data.payload['_id'] || 0,
        username: res.data.payload.username || '',
        email: res.data.payload.email || '',
        biography: res.data.payload.biography || ''
      };
      console.log(info)

      this.setState({ instructor: info, new_instructor: info });
    } catch (e) {
      console.log(e);
    }
  };
  updateUserInfo = async () => {
    try {
      const res = await axios.put(
        'http://localhost:5000/users',
        {
          username: this.state.new_instructor.username,
          email: this.state.new_instructor.email,
          biography: this.state.new_instructor.biography,
          password: this.state.new_instructor.password
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  getStars = ()=>{

    return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((value,i)=>{
    return (<div className='shooting_star'/>)

    })
  }
  getOption = (icon, value, ref) =>{

    return (
      <div className="profile__options" onClick={()=>{ window.location.href = 'user/'+ref}}>
        <div>{icon}</div>
        <div style={{marginLeft:'10px'}}>{value}</div>
      </div>
    )
  }
  render() {
    return (
      <div className="instructor-profile">
        <div className="instructor-profile__header">
          <img src={eren} alt="profile" />
          <div className="instructor-profile__header__pp">
            <img src={erenSmiling} alt="pp" />
          </div>
        </div>
        <div className="instructor-profile__data">
          <div className="instructor-profile__info">
            {!this.state.editing && (
              <div className="instructor-profile__info__username">
                {this.props.user.username}
              </div>
            )}
            {this.state.editing && (
              <div className="instructor-profile__info__username">
                <TextField
                  id="username"
                  style={{ width: '100%', marginTop: '20px' }}
                  onChange={this.handleChange}
                  value={this.state.new_instructor.username}
                  label="Username"
                  variant="outlined"
                />
                <TextField
                  id="password"
                  type="password"
                  style={{ width: '100%', marginTop: '20px' }}
                  onChange={this.handleChange}
                  value={this.state.new_instructor.password}
                  label="Password"
                  variant="outlined"
                />
              </div>
            )}

          </div>
          <div className="instructor-profile__data__footer">
            {!this.state.editing && (
              <div className="instructor-profile__data__bio">{this.state.instructor.biography}</div>
            )}

            {this.state.editing && (
              <div className="instructor-profile__data__bio">
                <TextField
                  id="email"
                  style={{ width: '100%', marginTop: '20px' }}
                  onChange={this.handleChange}
                  value={this.state.new_instructor.email}
                  label="Email"
                  variant="outlined"
                />

                <TextField
                  id="biography"
                  style={{ width: '100%', marginTop: '20px' }}
                  multiline
                  rows={3}
                  onChange={this.handleChange}
                  value={this.state.new_instructor.biography}
                  label="Bio"
                  variant="outlined"
                />
              </div>
            )}
            <div className="instructor-profile__data__footer__btn">
              {!this.state.editing && <SecondaryBtn btnText="Edit" function={this.toggleEditing} />}
              {this.state.editing && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SecondaryBtn btnText="Cancel" function={this.cancel} />
                  <div className="date-picker__sep" />
                  <PrimaryBtn btnText="Save" function={this.save} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="instructor-profile__content"  style={{display:'flex', justifyContent:'space-between', position:'relative'}}>

          <div className="instructor-profile__content__reviews" style={{width:'50%'}}>
          <div className="instructor-profile__content__reviews__header">My Menu</div>
          <div className="instructor-profile__content__reviews__comments"
          >

              {this.getOption(<WhatshotIcon style={{fontSize:'30px', color:'red'}}/>, 'Top Courses', 'topCourses')}
              {this.getOption(<MenuBookIcon style={{fontSize:'30px', color:'var(--secondary-color)'}}/>, 'My Courses', 'myCourses')}
              {this.getOption(<ReportIcon style={{fontSize:'30px',  color:'var(--secondary-color)'}}/>, 'My Reports', 'myReports')}
              {this.props.user.userType==='corporate trainee' && this.getOption(<SwitchAccessShortcutIcon style={{fontSize:'30px',  color:'var(--secondary-color)'}}/>, 'Grant Access', 'requestCourseAccess')}

          </div>

          
        </div>
        <div className="instructor-profile__content__reviews" style={{ width:'50%'}}>
        <div className="instructor-profile__content__reviews__header">My Wallet</div>
        <div className="instructor-profile__content__reviews__comments" >
            <div className="wallet" style={{ width:'100%'}}>
                <div className="wallet__content night-container night">
                    {this.getStars()}
                    

                    <div className="wallet__content__value">319$</div>
                        <div className="wallet__content__icon wallet__content__icon-1"><AttachMoneyIcon sx={{fontSize:'150px'}}/></div>
                        <div className="wallet__content__icon wallet__content__icon-2"><PaidIcon sx={{fontSize:'150px'}}/></div>
                    </div>
            </div>
        </div>

      </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};



export default connect(mapStateToProps)(UserProfile);
