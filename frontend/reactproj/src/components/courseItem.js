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
                    <Typography variant="body2" color="text.secondary">
                        {this.props.course.rating + '/5.0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {this.props.course.totalHours + ' Hour(s)'}
                    </Typography>
                    {this.userType !== 'cop-trainee' && <Typography variant="h6" >
                            {Math.ceil(this.props.course.price*this.props.rateAndSymbol.rate) +" " +this.props.rateAndSymbol.symbol }
                    </Typography>}
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




