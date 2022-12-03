const WatchVideo = (props) => {
  console.log(props);
  return (
    <div className="watchVideo">
      <iframe
        width="853"
        height="480"
        src={props.link}
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
