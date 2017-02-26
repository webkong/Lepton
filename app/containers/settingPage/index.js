'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Nav, NavItem, Image } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import {
    updatePreferenceModalStatus} from '../../actions'

import Store from '../../utilities/store'
import LicenseInfo from '../../../license.json'
import logoImage from './logo.png'
import { remote } from 'electron'
import appInfo from '../../../package.json'
import './index.scss'

const logger = remote.getGlobal('logger')

class SettingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'General'
    }
  }

  handleTabSelect(eventKey) {
    this.setState({
      activeTab: eventKey
    })
  }

  renderAboutSection () {
    const licenseList = []
    Object.keys(LicenseInfo).forEach(item => {
      licenseList.push(
        <div key={ item } className='license-item'>
          <div className='license-project'>
            { item }
          </div>
          <div className='license-type'>License: { LicenseInfo[item].licenses }</div>
        </div>
      )
    })

    return (
      <div className='about-section'>
        <div className='logo-section'>
          <Image className='logo' src={ logoImage } rounded/>
          <div>{ appInfo.name + ' v' + appInfo.version }</div>
          <a className='logo-sub' href='https://github.com/hackjutsu/Lepton'>GitHub</a>
          <a className='logo-sub' href='https://github.com/hackjutsu/Lepton/issues'>Feedback</a>
          <a className='logo-sub' href='https://github.com/hackjutsu/Lepton/blob/master/LICENSE.md'>License</a>
        </div>
        <hr/>
        <div className='setting-title'>Contributors</div>
        <div className='contributor-section'>
          <div className='contributor'><a href='https://github.com/hackjutsu'>hackjutsu</a></div>
          <div className='contributor'><a href='https://github.com/wujysh'>wujysh</a></div>
          <div className='contributor'><a href='https://github.com/meilinz'>meilinz</a></div>
          <div className='contributor'><a href='https://github.com/lcgforever'>lcgforever</a></div>
          <div className='contributor'><a href='https://github.com/Calinou'>Calinou</a></div>
          <div className='contributor'><a href='https://github.com/rogersachan'>rogersachan</a></div>
        </div>
        <hr/>
        <div className='setting-title'>Acknowledgement</div>
        <div className='license-section'>
          { licenseList }
        </div>
      </div>
    )
  }

  renderGeneralSection () {
    return (
      <div className='general-section'>
        General Section
      </div>
    )
  }

  renderTabSection () {
    const { activeTab } = this.state
    switch (activeTab) {
      case 'General':
        return this.renderGeneralSection()
      case 'About':
        return this.renderAboutSection()
      default:
    }
    return null
  }

  renderSettingModalBody () {
    const { activeTab } = this.state
    return (
        <div>
          <Nav bsStyle='tabs' activeKey={ activeTab } onSelect={ this.handleTabSelect.bind(this) }>
            <NavItem eventKey='General'>General</NavItem>
            <NavItem eventKey='About'>About</NavItem>
          </Nav>
          <div>
            { this.renderTabSection() }
          </div>
        </div>
    )
  }

  close () {
    const { updatePreferenceModalStatus } = this.props
    updatePreferenceModalStatus('OFF')
  }

  render () {
    const { preferenceModalStatus } = this.props
    return (
      <div className='preference-modal'>
        <Modal.Dialog bsSize='small'>
          <Modal.Header>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.renderSettingModalBody() }
          </Modal.Body>
        </Modal.Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    // searchWindowStatus: state.authWindowStatus,
    // userSessionStatus: state.userSession.activeStatus,
    preferenceModalStatus: state.preferenceModalStatus
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    // selectGistTag: selectGistTag,
    // selectGist: selectGist,
    // fetchSingleGist: fetchSingleGist,
    // updateSearchWindowStatus: updateSearchWindowStatus,
    updatePreferenceModalStatus: updatePreferenceModalStatus
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
