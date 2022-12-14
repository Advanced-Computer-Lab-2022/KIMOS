import React from 'react';
import payPic from '../assets/pay.png';
import refund from '../assets/refund.png';
import paypal from '../assets/Paypal.png';
import mastercard from '../assets/Mastercard.png';
import visa from '../assets/Visa.png';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function paymentPolicy() {
  return (
    <>
    <div style={{display:"flex",columnGap:70,justifyContent:"center",alignItems:"center"}}>
      <div >
        <img src={payPic} width="400px" height="350px"/>
      </div>
      <div style={{maxWidth:600,display:"flex",flexDirection:"column",rowGap:20}}>
        <h1 style={{color:"var(--primary-color)"}}>Course Payments by Credit Cards or Paypal</h1>

        <div style={{display:"flex",columnGap:7}}>
            <img src={paypal} width="30px" height="17px"/>
            <img src={mastercard} width="30px" height="17px"/>
            <img src={visa} width="30px" height="17px"/>
        </div>

        <label style={{fontSize:14,lineHeight:1.5}}>We also accept payments by major credit cards and PayPal. Please follow the instructions
             to submit your payment by credit card. Net fees received (amount you pay less charges) will be 
             appearing on your student account, and not the actual amount you pay. Proceeding with your payment 
             confirms that you are accepting these terms. To pay kindly click the: "Pay" button from the course page
             and write down the amount you want to pay in the "Price Per Item" box, whilst clicking "Continue" after.
             The link will take you to Checkout whereby you can login to your Paypal account or to 
             "PayPal Guest Checkout" if you do not have a Paypal Account. </label>

        <label style={{fontSize:14}}>Should you require any further assistance, please do not hesitate to contact us.  </label>
      </div>
    </div>

    <div style={{backgroundColor:"#F5F5F5",display:"flex",flexDirection:"column",minWidth:"80vw",justifyContent:"center",alignItems:"center",paddingTop:40,paddingBottom:40,lineHeight:2,marginTop:-20}}>
        <label style={{fontSize:16,fontWeight:700}}>Course Payments by Bank Transfer</label>
        <label style={{fontSize:16}}>Students may submit payments directly
         to our bank account as per Bank details below 
        (should you wish to pay by credit card, please see section above) : </label>
        <label style={{fontSize:14,marginTop:20}}>Account Name: <span style={{color:"var(--primary-color)"}}>KIMOS</span></label>
        <label style={{fontSize:14}}>IBAN code: <span style={{color:"var(--primary-color)"}}>MT80VALL22013000000040020476629</span></label>
        <label style={{fontSize:14}}>Bank CIB/Emirates:<span style={{color:"var(--primary-color)"}}> VALLMTMT</span></label>
        <label style={{fontSize:14,marginBottom:20}}>Account number:<span style={{color:"var(--primary-color)"}}> 40020476629</span></label>
        <label style={{fontSize:16,fontWeight:700}}>Once payment has been effected, please send us a copy of the transfer slip by email to: info@kimos-group.com</label>
    </div>

    <div style={{display:"flex",columnGap:70,margin:"auto",marginTop:80}}>
        <div style={{maxWidth:600,display:"flex",flexDirection:"column",rowGap:20,marginBottom:30}}>
            <h1 style={{color:"var(--primary-color)"}}>Funding and Refund Policy</h1>

            <label style={{fontSize:16,fontWeight:700}}>Get Qualified</label>

            <label style={{lineHeight:1.5}}>Our accredited programmes are eligible for funding under the Enterprise's
                 Get Qualified scheme. The Get Qualified is an initiative that supports the personal
                  development of individuals for the achievement of qualifications and certifications
                   required by industry. The incentive is applicable for individuals who are self-funded
                    and who are following a course of studies leading to a certification, diploma, degree
                     or post-graduate degree courses. Upon completion of the programme, you will be able
                      to recover up to 70% of expenses on both the registration and tuition fee. 
            </label>

            <label style={{fontSize:16,fontWeight:700}}>Refund Policy</label>

            <label style={{lineHeight:1.5}}>Students who have paid tuition fees for our courses may avail of the following refund policy:</label>

            <ul style={{lineHeight:1.5,listStyle:"inside",marginLeft:20}} >
                <li>3 weeks prior to the start of the course - 100% of fees paid</li>
                <li>2 weeks prior to the start of the course - 50% of fees paid only</li>
                <li>1 week prior to the start of the course - 25% of fees paid only</li>
                <li>Once course started –  0% of fees paid i.e. No Refund.</li>
            </ul>

            <label style={{lineHeight:1.5}}>Refund at the above rates are normally paid 14 weeks from Refund application date
                 (by means of a written request by the withdrawing student).
            </label>

            <div style={{display:"flex",columnGap:10,justifyContent:"center",alignItems:"center",marginTop:20,marginLeft:-70}}>
                <KeyboardBackspaceIcon style={{color:"var(--primary-color)",cursor:"pointer"}}></KeyboardBackspaceIcon>
                <label style={{color:"var(--primary-color)",cursor:"pointer"}}>Back to sign up</label>
            </div>
        </div>

        <div>
            <img src={refund} width="400px" height="400px"/>
        </div>
    </div>
    </>
  )
}
