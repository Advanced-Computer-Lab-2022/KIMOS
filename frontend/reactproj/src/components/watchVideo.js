const WatchVideo = (props) => {
  console.log(props);
  return (
    <div className="watchVideo" >
      <iframe
        style={{borderRadius:'10px'}}
        width="853"
        height="480"
        src={"https://www.youtube.com/embed/NP1d22FflCk"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <h2>{props.description}</h2>
    </div>
  );
};

export default WatchVideo;
