import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, startLogin } from '../actions/auth';
import { fireGetPosts, getPosts } from '../actions/posts';
import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = (e) => {
    const getPosts = this.props.getPosts
    history.push(`/`)
    this.props.fireGetPosts().then((posts, getPosts) => {
      this.props.getPosts(posts)
    })
  }
  render() {
    const user = this.props.user
    return (
      <header className="real_header">
        {console.log(this.props)}
        <div className="content-container">
          <div className="header__content">
            <button className="button button--link" onClick={this.handleClick}>
              <i className="material-icons">tune</i> Seenit
            </button>

            <Link className="button button--link" to="/profile">
              Profile ({this.props.user.name})
            </Link>
            <Link className="button button--link" to="/seens/create">Create Seen</Link>
            {this.props.isAuthed
              ?
              (<button className="button button--link" onClick={this.props.startLogout}>Logout</button>)
              :
              (<button className="button button--link" onClick={this.props.startLogin}>Login</button>)
            }
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile,
  isAuthed: state.auth.uid && state.auth.uid.length > 1
});

const mapDispatchToProps = (dispatch) => ({
  fireGetPosts: () => dispatch(fireGetPosts()),
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin()),
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
