import React, { Component } from "react";
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

class Drawer extends Component {

  clickHeandler = () => {
    this.props.onClosed()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink 
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHeandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'Список', exact: true}
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false},)
    }

    return (
      
      <React.Fragment>
        <nav className={cls.join(' ')}>
        <ul>
          {this.renderLinks(links)}
        </ul>
      </nav>
      {this.props.isOpen ? <Backdrop onClick={this.props.onClosed}/> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
