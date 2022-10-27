import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import tmpImg from '../assets/imgTmp.jpeg';


class courseItem extends Component {
    userType = 'guest'
    componentDidMount() {

    }
    render() {
        return (
            <div className="course-item">
                <Card sx={{ maxWidth: 345 }}>
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
                            {this.props.course.price + '$' }
                    </Typography>}
                    </CardContent>
                    <CardActions>
                        <Button size="small">View Details</Button>
                        {this.userType !== 'cop-trainee' && <Button size="small">Buy</Button> }
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default courseItem;




