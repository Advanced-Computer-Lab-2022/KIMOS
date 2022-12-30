import PrimaryBtn from "./buttons/primaryBtn";
import { Stack } from "@mui/material";

const paymentCancelled = () => {

    return ( 
        <Stack sx={{display:"flex",justifyContent:"center",textAlign: "center"}} spacing={2}>
            <p>The payement is cancelled.</p>

            <PrimaryBtn function={()=>{window.location.href='http://localhost:3000'}} btnText="Home page"/>
        </Stack>
     );
}
 
export default paymentCancelled;