import React, { Component } from 'react';
import eren from '../assets/eren-yeager.png';
import erenSmiling from '../assets/eren-smiliing.png';
import topG from '../assets/andrewpp2.png';
import topGcover from '../assets/bros.png';
import Rating from '../components/rating';
import SecondaryBtn from './buttons/secondaryBtn';
import PrimaryBtn from './buttons/primaryBtn';
import TextField from '@mui/material/TextField';
import axios from 'axios';

class InstructorProfile extends Component {
  state = {
    editing: false,
    instructor: {
      username: 'Andew Tate',
      email: 'eren@topE.com',
      bio: 'Known as the TOP G and as a misogynist.',
      password: ''
    },
    new_instructor: {
      username: 'Andew Tate',
      email: 'topG@earth.com',
      bio: 'Known as the TOP G and as a misogynist.',
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
      const res = await axios.get('http://localhost:5000/users/?userId=638117c243cba3f0babcc3a9', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      console.log(res);
      var info = {
        id: res.data['_id'] || 0,
        username: res.data.username || '',
        email: res.data.email || '',
        bio: res.data.biography || '',
        password: res.data.password || '',
        rating: res.data.rating || 1
      };
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
          userId: this.state.instructor['id'],
          username: this.state.new_instructor.username,
          email: this.state.new_instructor.email,
          bio: this.state.new_instructor.bio,
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
        <div className="instructor-profile__header">
          <img src={topGcover} alt="profile" />
          <div className="instructor-profile__header__pp">
            <img src={topG} alt="pp" />
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
              <div className="instructor-profile__data__bio">{this.state.instructor.bio}</div>
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
                  id="bio"
                  style={{ width: '100%', marginTop: '20px' }}
                  multiline
                  rows={3}
                  onChange={this.handleChange}
                  value={this.state.new_instructor.bio}
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
