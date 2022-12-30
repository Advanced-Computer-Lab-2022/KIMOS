import React, { Component } from 'react'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import notFound from '../assets/thief.webp';


export default class noAccessPage extends Component {
  render() {
    return (
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <div style={{

            width:'50%',
            height:'50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            color:'var(--primary-color)',
            fontWeight:'bolder',
            fontSize:'50px'
        }}>
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
            }}>
                <div style={{
                    textAlign:'center'
                }}>YOU DON'T HAVE ACCESS TO THIS PAGE</div>
                <div>
                    <WarningRoundedIcon className="notFound" style={{fontSize:'200px'}}/>
                </div>
                <div style={{  fontSize:'20px', fontWeight:'lighter'}}>
                    You treid to access a page that you can't access
                </div>

                <div style={{ color:'var(--secondary-color)', fontSize:'12px', fontWeight:'lighter'}}>
                    Click Here to be redirected to the login page <a href="/login">Login</a>
                </div>

            </div>
            


        </div>
      

        <div style={{
            width:'600',
            height:'500',
            position:'absolute',
            right:'0',
            bottom:'0',
            opacity: 0.8

        }}>
            <img  src={notFound} alt="404" width="300" height="300"/>
        </div>
      </div>
    )
  }
}
