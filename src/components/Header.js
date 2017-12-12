import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, startLogin, emailCreate } from '../actions/auth';
import { fireGetPosts, getPosts } from '../actions/posts';
import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';
import auth from 'firebase';

export class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = (e) => {
    const getPosts = this.props.getPosts
    this.props.fireGetPosts().then((posts) => {
      history.push('/')
    })
  }
  render() {
    const user = this.props.user
    return (
      <header className="real_header">
        <div className="content-container">
          <div className="header__content">
            <button className="button button--link" onClick={this.handleClick}>
              <i className="material-icons">tune</i> Seenit
            </button>
            {this.props.isAuthed
              ?
              <div>
                <Link className="button button--link" to="/profile">
                  Profile ({this.props.user.name})
                </Link>
                <Link className="button button--link" to="/seens/create">Create Seen</Link>
              </div>
              :
              <div></div>
            }
            {this.props.isAuthed
              ?
              (<button className="button button--link" onClick={this.props.startLogout}>Logout</button>)
              :
              (
                <div className="button button--link">
                  <button className="button button--link" onClick={this.props.startLogin}>Login</button>
                  /
                  <Link className="button button--link" to={`/login`}>Create account</Link>
                </div>)
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
  emailLogin: () => dispatch(emailLogin()),
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
