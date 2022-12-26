import React, { Component } from 'react';
import eren from '../assets/eren-yeager.png';
import erenSmiling from '../assets/eren-smiliing.png';
import RatingComp from '../components/rating';
import SecondaryBtn from './buttons/secondaryBtn';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';

class InstructorProfile extends Component {
  state = {
    openRating: false,
    instructorRatingValue: 0,
    editing: false,
    instructor: {
      username: 'Eren',
      email: 'eren@topE.com',
      bio: 'Instructor at the paradise.',
      password: ''
    },
    new_instructor: {
      username: 'Eren',
      email: 'eren@earth.com',
      bio: 'Instructor at the paradise.',
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

    this.setState({ instructor: this.state.new_instructor });
    this.updateUserInfo();
    this.toggleEditing();
  };
  getUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/?userId=638117c243cba3f0babcc3a9', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });


      var info = {
        id: res.data['_id'] || 0,
        username: res.data.username || '',
        email: res.data.email || '',
        bio: res.data.biography || '',
        password: res.data.password || '',
        rating: res.data.rating.value || 0
      };
      this.setState({ instructor: info, new_instructor: info });
    } catch (e) {

    }
  };

  postRating = async () => {
    const res = await axios.post(
      'http://localhost:5000/users/rateInstructor',
      { rating: this.state.instructorRatingValue },
      {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a',
          instructorId: '638117c243cba3f0babcc3a9'
        }
      }
    );

    if (res.statusText === 'OK') {
      //setSubmitSuccess(true);
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

    } catch (e) {

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
              <RatingComp value={3} />
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
        <Modal
          open={this.state.openRating}
          onClose={() => {
            this.setState({ openRating: false });
          }}>
          <div
            style={{
              borderRadius: '10px',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '30%',
              height: '10%',
              position: 'absolute',
              left: '50%',
              top: '35%',
              transform: 'translate(-50%,-35%)'
            }}>
            Rate This Instructor
            <div>
              <Rating
                name="rating-the-couse"
                value={this.state.instructorRatingValue}
                onChange={(event, newValue) => {
                  this.setState({ instructorRatingValue: newValue }, this.postRating);
                }}
                sx={{ width: '100%', height: '100%', fontSize: '3.5vw' }}
              />
            </div>
          </div>
        </Modal>
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

            {!this.state.editing && (
              <div className="instructor-profile__info__rating">
                <RatingComp value={this.state.instructor.rating} />
              </div>
            )}
          </div>
          <div className="instructor-profile__data__footer">
            {!this.state.editing && (
              <div className="instructor-profile__data__bio">{this.state.instructor.bio}</div>
            )}

            <div className="instructor-profile__data__footer__btn">
              {<SecondaryBtn btnText="Follow" />}
            </div>
          </div>
        </div>
        <div className="instructor-profile__content">
          <div className="instructor-profile__content__reviews">
            <div className="instructor-profile__content__reviews__header">
              <div>Reviews</div>
              <div
                style={{
                  fontWeight: 'bolder',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                <AddIcon
                  onClick={() => {
                    this.setState({ openRating: true });
                  }}
                  style={{ fontSize: '40px', color: 'var(--primary-color)' }}
                />
              </div>
            </div>
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
