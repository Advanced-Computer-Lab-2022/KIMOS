import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');


class tmpRoutes extends Component {

 
    routeChange = () =>{ 
        window.location.href="contact"
    }
    submitSearch = async()=>{

        const post = { keyword: this.state.searchContent }
        try {
          const res = await axios.post('http://localhost:3000/users', post)
          console.log(res.data)
        } catch (e) {
          alert(e)
        }
    }
    render() {
        return (
            <div className="display-content">
                <div className="tmp-content">
                    <Link to="/guest">Guest</Link>
                    <Link to="/instructor">Instructor</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/trainee">Individual trainee & Corporate trainee</Link>
                    <button onClick={this.submitSearch}>Test</button>
                </div>
            </div>
        );
    }
}

export default tmpRoutes;