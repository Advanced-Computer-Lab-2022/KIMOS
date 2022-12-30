import React, { Component } from 'react'
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';

import Linegraph from './charts/linechart';
import Piegraph from './charts/piechart';
import PiegraphS from './charts/piechartS';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default class InstructorDB extends Component {
  makeCard = (icon, text, url)=>{
    return (
      <div className='instructorDB__container__option' onClick={()=>this.changeHref(url)}>
        {icon}
        <h3 className='instructorDB__container__option__text'>{text}</h3>
      </div>
    )
  }


  makeGraphCard = (title, graph)=>{
   return(
    <div className='graph-card'>
      <div className='graph-card__title'>{title}</div>
      <div className='graph-card__chart'>{graph}</div>
    </div>


   )

  }
  changeHref = (link) =>{
  
    window.location.href = '/administrator/'+link;
  }
  // {this.makeCard(<QuizIcon className='instructorDB__container__option__icon'/>, 'Create A Quiz','createQuiz')}

  render() {

    return (
      <div className='adminDB'>
            {this.makeGraphCard('Total Users Types', <Piegraph/>)}
            {this.makeGraphCard('Total Subjects ', <PiegraphS/>)}
            {this.makeGraphCard('Last 7 Days Activities', <Linegraph/>)}
      </div>
    )
  }
}
