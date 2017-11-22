import React, { Component } from 'react';
import { connect } from 'react-redux'

export class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post
    }
  }
  render() {
    return (
      <div className="content-container">
        <div className="list-header">
      </div>
        <div className="list-body">
          <div>
            <h3 className="list-item__title">
            </h3>
            <p className="list-item__data">
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