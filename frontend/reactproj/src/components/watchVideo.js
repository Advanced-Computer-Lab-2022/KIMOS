const WatchVideo = (props) => {
  console.log(props);
  return (
    <div  style={{height:'100%', display:'flex',flexDirection:'column', alignItems:'center', }}>
      <iframe

        width="100%"
        height="70%"
        src={props.video.link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
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
