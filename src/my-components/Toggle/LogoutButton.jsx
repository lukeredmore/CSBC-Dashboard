import React from 'react'

import './LogoutButton.scss'

import { connect } from 'react-redux'
import { signOutStart } from '../../redux/user/user.actions'

const LogoutButton = ({signOutStart}) => (
    <span className='logout-button' onClick={signOutStart}>Log Out</span>
)

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(null, mapDispatchToProps)(LogoutButton)