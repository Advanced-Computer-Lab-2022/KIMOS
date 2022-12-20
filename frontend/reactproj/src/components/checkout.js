import secondaryBtn from "./buttons/secondaryBtn";
import axios from 'axios';

const checkout = (props) => {

    const courseId = props.courseId;

    const onclick = ()=>{
        axios.post(`https://localhost:5000/checkout`,{userId,courseId})
        .then(res=>{
            if(res.ok)  return res.json();
            return res.json().then(json=>Promise.reject(json));
        })
        .then(({url}) =>{
            window.location.href = url;
        })
        .catch(e=>{
            console.error(e.error);
        })
    }


    return (  
        <div>
            <secondaryBtn function={onclick} btnText={"Checkout"}/>
        </div>
    );
}
 
export default checkout;