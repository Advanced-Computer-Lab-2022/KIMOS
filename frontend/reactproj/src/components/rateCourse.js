import { useState } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from "axios";


const rate = ({id}) => {
    const [rating,setRating] = useState(null);


    const handleChange = (event,newRating)=>{
        
        axios.post(`http://localhost:5000/courses/rate?id=${id}`,{rating:newRating}).then(()=>{
            setRating(newRating);
        })
    }

    return ( 
        <div className="rate">
            <Typography component="legend">Rate</Typography>
            <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
                handleChange(event,newValue);
            }}
            />
        </div>
     );
}
 
export default rate;