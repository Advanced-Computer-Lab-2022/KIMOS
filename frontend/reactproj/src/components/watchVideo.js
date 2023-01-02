import React from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios';

const WatchVideo  =  (props) => {
  const sendProgress =async()=>{

    
    const res = await axios.post("http://localhost:5000/courses/progress?courseId="+props.courseId+"&videoId="+props.video['_id'])
    console.log(res);

    props.updateProgress(res.data.payload.newProgress)
  }
  return (  
    <div  style={{height:'100%', display:'flex',flexDirection:'column', alignItems:'center', }}>

      <ReactPlayer 
      controls={true}
      width="100%"
      height="70%"
      url={props.video.link}
      onPlay={sendProgress}
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

