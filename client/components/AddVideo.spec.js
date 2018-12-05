/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AddVideo} from './AddVideo'
import sinon from 'sinon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AddVideo', () => {
  let addVideo

  it('renders the instructions in an h3', () => {
    addVideo = shallow(<AddVideo />)
    expect(addVideo.find('h3').text()).to.be.equal(
      'Take a video and turn it into a comicBOOM!'
    )
  })

  it('simulates click events', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<AddVideo onButtonClick={onButtonClick} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick).to.have.property('callCount', 1)
  })
})
