import React, { Component } from 'react'
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UploadIcon from '@mui/icons-material/Upload';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';

export default class InstructorDB extends Component {
  makeCard = (icon, text, url)=>{
    return (
      <div className='instructorDB__container__option' onClick={()=>this.changeHref(url)}>
        {icon}
        <h3 className='instructorDB__container__option__text'>{text}</h3>
      </div>
    )
  }

  changeHref = (link) =>{
  
    window.location.href = '/instructor/'+link;
  }
  // {this.makeCard(<QuizIcon className='instructorDB__container__option__icon'/>, 'Create A Quiz','createQuiz')}

  render() {

    return (
      <div className='instructorDB'>

        <div className='instructorDB__container'>
            {this.makeCard(<PersonIcon className='instructorDB__container__option__icon'/>, 'My Profile','profile')}
            {this.makeCard(<GavelIcon className='instructorDB__container__option__icon'/>, 'Contracts', 'contracts')}
            {this.makeCard(<MenuBookIcon className='instructorDB__container__option__icon'/>, 'My Courses', 'myCourses')}

        </div>
      
      </div>
    )
  }
}
