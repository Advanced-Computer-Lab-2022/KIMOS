import React, { Component } from 'react';
import eren from '../assets/eren-yeager.png';
import erenSmiling from '../assets/eren-smiliing.png';
import Loading from './loadingPage';

import Rating from '../components/rating';
import SecondaryBtn from './buttons/secondaryBtn';
import PrimaryBtn from './buttons/primaryBtn';
import TextField from '@mui/material/TextField';
import axios from 'axios';

class InstructorProfile extends Component {
  state = {
    editing: false,
    loading:true,
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
      const res = await axios.get('http://localhost:5000/users');

      if(res.data.success === true){
        var info = {
          id: res.data.payload['_id'] || 0,
          username: res.data.payload.username || 'not yet',
          email: res.data.payload.email || '',
          biography: res.data.payload.biography || '',
          password: res.data.payload.password || '',
          rating: res.data.payload.rating.value || 1
        };
        this.setState({ instructor: info, new_instructor: info }, ()=>{this.setState({loading:false})});
      }

    } catch (e) {
      console.log(e);
    }
  };
  updateUserInfo = async () => {
    try {
      var obj ={}
      if(this.state.new_instructor.username !== ''){
        obj['username'] = this.state.new_instructor.username;
      }
      if(this.state.new_instructor.email !== ''){
        obj['email'] = this.state.new_instructor.email;
      }
      if(this.state.new_instructor.biography !== ''){
        obj['biography'] = this.state.new_instructor.biography;
      }
      if(this.state.new_instructor.password !== ''){
        obj['password'] = this.state.new_instructor.password;
      }
      const res = await axios.put(
        'http://localhost:5000/users',obj,
        {
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  getComments = () => {
    return [
      'bad instructor',
      'bad instructor bad instructor bad instructor',
      'bad instructor',
      'bad instructor',
      'bad instructor bad instructor bad instructor bad instructor'
    ].map((comment) => {
      return (
        <div className="comment">
          <div className="comment__header">
            <div className="comment__header__name">Username</div>
            <div className="comment__header__rating">
              <Rating value={3} />
            </div>
          </div>

          <div className="comment__comment">{comment}</div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="instructor-profile">
        {this.state.loading && <Loading/>}
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
                {this.state.instructor.username}
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
            {!this.state.editing && (
              <div className="instructor-profile__info__rating">
                <Rating value={this.state.instructor.rating} />
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
        <div className="instructor-profile__content">
          <div className="instructor-profile__content__reviews">
            <div className="instructor-profile__content__reviews__header">Reviews</div>
            <div className="instructor-profile__content__reviews__comments">
              {this.getComments()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InstructorProfile;
