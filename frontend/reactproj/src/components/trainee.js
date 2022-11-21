import React, { Component } from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import useStyles from '../styles/styles.scss';
import {Link} from 'react-router-dom';
import Courses from '../components/traineeCourses/traineeCourses';

class trainee extends Component {
    render() {
        return (
            <div className="instructor">
                <Container maxWidth="lg">
                    <Grow in>
                        <Container>
                            <Grid className="appBarContainer" container justify="space-between" alignItems="stretch">
                                <Grid item xs={12} sm={6}>
                                    <AppBar className="appBar" position="static" color="inherit">
                                        <Courses />
                                    </AppBar>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>
            </div>
        );
    }
}

export default trainee;