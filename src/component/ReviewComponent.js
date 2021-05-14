import React from 'react'

class ReviewComponent extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.review.author.username}</h3>
                <h4>{`${this.props.review.rating} : ${this.props.review.text}`}</h4>
            </div>
        )
    }
}

export default ReviewComponent