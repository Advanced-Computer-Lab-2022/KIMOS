import React, { Component } from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';


export default class LoadingPage extends Component {
  render() {
    return (
      <div className='loading-page'>
      
        <div>
            <div className='loading-page__text'>
                KIMOS
            </div>
            <div className='loading-page__icons'>
                    <MenuBookIcon />
                    <MenuBookIcon />
                    <MenuBookIcon />
                    <MenuBookIcon />
                    <MenuBookIcon />

            </div>    
        </div>

      
        
      </div>
    )
  }
}
