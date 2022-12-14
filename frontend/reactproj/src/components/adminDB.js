import React, { Component } from 'react'
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UploadIcon from '@mui/icons-material/Upload';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';

export default class AdminDB extends Component {
  makeCard = (icon, text, url)=>{
    return (
      <div className='instructorDB__container__option' onClick={()=>this.changeHref(url)}>
        {icon}
        <h3 className='instructorDB__container__option__text'>{text}</h3>
      </div>
    )
  }

  changeHref = (link) =>{
  
    window.location.href = '/admin/'+link;
  }
  // {this.makeCard(<QuizIcon className='instructorDB__container__option__icon'/>, 'Create A Quiz','createQuiz')}

  render() {

    return (
      <div className='instructorDB'>

        <div className='instructorDB__container'>
            {this.makeCard(<PersonIcon className='instructorDB__container__option__icon'/>, 'Add Users','addUsers')}
            {this.makeCard(<GavelIcon className='instructorDB__container__option__icon'/>, 'Check Reports', 'reports')}
            {this.makeCard(<MenuBookIcon className='instructorDB__container__option__icon'/>, 'Check Courses Requests', 'courseRequests')}
            {this.makeCard(<MenuBookIcon className='instructorDB__container__option__icon'/>, 'Add Promotions', 'promotions')}


        </div>
      
      </div>
    )
  }
}
