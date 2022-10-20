import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class tmpRoutes extends Component {

 
    routeChange = () =>{ 
        window.location.href="contact"
    }
    render() {
        return (
            <div className="display-content">
                <div className="tmp-content">
                    <Link to="/guest">Guest</Link>
                    <Link to="/instructor">Instructor</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/trainee">Individual trainee & Corporate trainee</Link>
                </div>
            </div>
        );
    }
}

export default tmpRoutes;