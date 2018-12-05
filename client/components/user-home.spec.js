/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import sinon from 'sinon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome, loadInitialData

  it('renders the email in an h3', () => {
    loadInitialData = sinon.spy()
    userHome = shallow(
      <UserHome
        user={{email: 'cody@email.com'}}
        loadInitialData={loadInitialData}
      />
    )
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
    expect(loadInitialData).to.have.property('callCount', 1)
  })
})
