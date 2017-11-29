import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fireGetSubPosts, getPosts } from '../actions/posts';
import LoadingPage from './LoadingPage';
import ReactDOM from 'react-dom';
import { history } from '../routers/AppRouter';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

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
    const title = e.currentTarget.title
    this.props.fireGetSubPosts(e.currentTarget.id)
  }
  render() {
    return (
      <div className="seens-body">
        {this.props.seens.map((seen) => (
          <Link className="seens" onClick={this.handleClick} key={seen.id} to={`/s/${seen.title}`} {...seen}>
            <ListItem button>
              {seen.title}
            </ListItem>
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