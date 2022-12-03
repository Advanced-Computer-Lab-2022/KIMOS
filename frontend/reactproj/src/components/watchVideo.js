import axios from "axios";
import { useEffect, useState } from "react";



const watchVideo = ({title}) => {

    const [link,setLink] = useState('');


    useEffect(()=>{
        axios.get(`http://localhost:5000/getLink?title=${title}`).then((res)=>{
            setLink(res.data.link);
        })
    },[link])
    
    return (  

        <div className="watchVideo">
            <iframe
            width="853"
            height="480"
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            />
            <h2>{title}</h2>
        </div>
    );
}
 
export default watchVideo;