import React, { Component } from 'react';
import Rating from './rating';
class reviewComment extends Component {
    render() {

            return (
                <div className='comment'>
                        <div className='comment__header'>
                            <div className='comment__header__name'>
                                {this.props.username || 'Unknown'}
                            </div>
                            <div className='comment__header__rating'>
                                <Rating value={this.props.rating}/>
                            </div>
                        </div>
    
                        <div className='comment__comment'>
                            {this.props.comment || 'Not Available'}
                        </div>
                </div>
            )

    }
}

export default reviewComment;