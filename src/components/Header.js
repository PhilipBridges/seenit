import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, startLogin } from '../actions/auth';
import { firebase } from '../firebase/firebase';

export class Header extends Component {
  render() {
    const user = this.props.user
    return (
      <header className="real_header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/">
              <i className="material-icons">tune</i> Seenit
            </Link>
            
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
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
