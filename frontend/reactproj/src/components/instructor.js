import React, { Component } from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import useStyles from '../styles/styles.scss';

import Courses from '../components/showCourse/showCourse.js';
import CreateCourse from '../components/createCourse/createCourse.js';

class instructor extends Component {
    render() {
        return (
            <div className="Instructor">
                <Container maxWidth="lg">
                    

                    <Grow in>
                        <Container>
                            <Grid className="appBarContainer" container justify="space-between" alignItems="stretch">
                                <Grid item xs={12} sm={6}>
                                    <AppBar className="appBar" position="static" color="inherit">
                                        <Courses />
                                    </AppBar>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <AppBar className="appBar" position="static" color="inherit">
                                        <CreateCourse />
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

export default instructor;