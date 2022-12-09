import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import tmpImg from '../assets/imgTmp.jpeg';
import {connect} from 'react-redux';

class courseItem extends Component {
    userType = 'guest'
    componentDidMount() {

    }
    coursePrice = () => {
        console.log(this.props);
        var discount = this.props.course.discount.amount;
        var oldPrice = Math.ceil(this.props.course.price*this.props.rateAndSymbol.rate)  ;
        var newPrice = -1;
        if(discount > 0){
            newPrice = Math.ceil(oldPrice - (discount/100)* parseInt(oldPrice) ) 
        }
        var price = discount > 0 ? newPrice : oldPrice;
        price += " " +this.props.rateAndSymbol.symbol;

        return (
            <div style={{color:discount > 0 ? 'red':'black', display:'flex', justifyContent:'space-between'}}>
                <div>
                    {price}
                </div>
                {discount > 0 && <div style={{marginLeft:'20px'}}>
                    {discount > 0 ? discount+'%' :''}
                </div>}
            </div>
        )
    }
//     <CardActions>
//     <Button size="small">View Details</Button>
//     {this.userType !== 'cop-trainee' && <Button size="small">Buy</Button> }
// </CardActions>
    render() {
        return (
            <div className="course-item">
                <Card sx={{ maxWidth: 345, height: 350, display: 'flex', flexDirection:'column', alignItems:'start', justifyContent:'space-between' }}>
                    <CardMedia
                    component="img"
                    alt="course image"
                    height="140"
                    image= {tmpImg}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {this.props.course.title}
                    </Typography>
                    {this.props.type !== 'i' && <Typography variant="body2" color="text.secondary">
                        {Math.round(this.props.course.rating.value) + '/5.0'}
                    </Typography>}
                    {this.props.type !== 'i' && <Typography variant="body2" color="text.secondary">
                        {this.props.course.totalHours + ' Hour(s)'}
                    </Typography>}
                    <Typography variant="h6" >
                            {this.coursePrice()}
                    </Typography>
                    </CardContent>

                </Card>
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
   
    return {
        rateAndSymbol: state.rateAndSymbol,
    };
  }
  

export default connect(mapStateToProps) (courseItem);




