import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, startLogin } from '../actions/auth';
import { fireGetPosts } from '../actions/posts';
import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export class Header extends Component {
  handleClick = (e) => {
    this.props.fireGetPosts().then(() => {
      history.push(`/`)
    });
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
