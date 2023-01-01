import React from 'react'
import ReactPlayer from 'react-player/youtube'

const WatchVideo = (props) => {

  return (
    <div  style={{height:'100%', display:'flex',flexDirection:'column', alignItems:'center', }}>

      <ReactPlayer 
      controls={true}
      width="100%"
      height="70%"
      url={props.video.link}
       />
      <div style={{marginTop:'10px'}}>
        <div
        style={{color:'var(--primary-color)',
              fontWeight:'bolder',
              fontSize:'20px'
              }}
        >Description</div>
        <div>
          <p>{props.video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;

