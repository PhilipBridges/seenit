import React, { Component } from 'react';
import { connect } from 'react-redux'

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.location.post
    }
  }
  render() {
    const { author, body, date, title } = this.state.post
    return (
      <div className="content-container">
        <div className="list-header">
          {title}
          <br />
          by {author} @ {date}
        </div>
        <div className="list-body">
          <div>
            <p className="list-item__data">
              {body}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
})

export default connect(mapStateToProps)(Post);