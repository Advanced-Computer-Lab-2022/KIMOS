import SecondaryBtn from "./buttons/secondaryBtn";
import axios from 'axios';

const checkout = ({courseId}) => {
    console.log(courseId)
    const onclick = ()=>{
        
        axios.post(`http://localhost:5000/users/createCheckoutSession?courseId=`+courseId)
        .then(res=>{
            console.log(res);
            const url = res.data.payload.url;
            window.open(
                url,
                '_blank' // <- This is what makes it open in a new window.
              );
            if(res.ok)  return res.json();
            return res.json().then(json=>Promise.reject(json));
        })
        .catch(e=>{
            console.log(e.error);
        })
    }


    return (  
        <div>
            <SecondaryBtn function={onclick} btnText={"Checkout"}/>
        </div>
    );
}
 
export default checkout;