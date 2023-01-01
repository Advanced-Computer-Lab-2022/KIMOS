import SecondaryBtn from "./buttons/secondaryBtn";
import axios from 'axios';
import {showAlert} from '../redux/actions';
import {connect} from 'react-redux';



const checkout = ({courseId, showAlert}) => {

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
            showAlert({shown:true, message:'Couldnt Check out this course',severity:'error'})

        })
    }


    return (  
        <div>
            <SecondaryBtn function={onclick} btnText={"Checkout"}/>
        </div>
    );
}
 

export default connect(null, {showAlert})(checkout);
