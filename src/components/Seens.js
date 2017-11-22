import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fireGetSubPosts, getPosts } from '../actions/posts';

export class Seens extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seens: this.props.seens
    }
  }
  shouldComponentUpdate() {
    return true
  }
  handleClick = (e) => {
    this.props.fireGetSubPosts(e.target.id)
  }
  render() {
    return (
      <div>
        {this.props.seens.map((seen) => (
          <Link className="list-item" onClick={this.handleClick} key={seen.id} to={`/s/${seen.title}`} {...seen}>
            {seen.title}
          </Link>
        )
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  seens: state.seens.slice(0, 10)
});

const mapDispatchToProps = (dispatch) => ({
  fireGetSubPosts: (id) => dispatch(fireGetSubPosts(id)),
  getPosts: (id) => dispatch(getPosts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seens)