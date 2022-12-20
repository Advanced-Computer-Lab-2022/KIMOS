import SecondaryBtn from "./buttons/secondaryBtn";
import axios from 'axios';

const checkout = ({courseId}) => {

    const onclick = ()=>{
        axios.post(`https://localhost:5000/checkout`,{items:[{courseId}]})
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
            <SecondaryBtn function={onclick} btnText={"Checkout"}/>
        </div>
    );
}
 
export default checkout;