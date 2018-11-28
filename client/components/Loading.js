import React from 'react'
import {connect} from 'react-redux'
import PageCreate from './PageCreate'

class Loading extends React.Component {
  constructor() {
    super()
    this.state = {
      palettes: [
        ['CCF390', 'E0E05A', 'F7C41F', 'FC930A', 'FF003D'],
        ['EDE7BE', 'BDEECD', 'A7BFA0', '929073', '7C6146'],
        ['B1E6D1', '77B1A9', '3D7B80', '270A33', '451A3E'],
        ['452632', '91204D', 'E4844A', 'E8BF56', 'E2F7CE'],
        ['5C323E', 'A82743', 'E15E32', 'C0D23E', 'E5F04C'],
        ['FF3366', 'C74066', '8F4D65', '575A65', '1F6764'],
        ['343838', '005F6B', '008C9E', '00B4CC', '00DFFC'],
        ['6DA67A', '99A66D', 'A9BD68', 'B5CC6A', 'C0DE5D'],
        ['280904', '680E34', '9A151A', 'C21B12', 'FC4B2A']
      ]
    }
    this.loader = this.loader.bind(this)
  }

  componentDidMount() {
    console.log('Loading DidMount')
    //trigger video splicing
    //phython server will send to temp file and respond with?
    //something needs to be waiting to recieve and put gif page on state as curPage
    const palettes = this.state.palettes
    this.loader(palettes[Math.floor(Math.random() * palettes.length)])
    //run loading animation...not sure if this will run with function called being established below???
  }

  loader = (function() {
    'use strict'
    var palette
    var loader, squares
    var interval

    /* -------------------------
      /* UTILS
      /* -------------------------*/

    // Soft object augmentation
    function extend(target, source) {
      for (var key in source) {
        if (!(key in target)) {
          target[key] = source[key]
        }
      }

      return target
    }

    function init() {
      start()
    }

    function start() {
      interval = setInterval(iterateColors, 80)
    }

    function iterateColors() {
      var i = 0
      for (var i; i < palette.length; i++) {
        squares[i].style.backgroundColor = '#' + palette[i]
      }

      // Move last item in array to first
      palette.splice(0, 0, palette.splice(palette.length - 1, 1)[0])
    }

    function stop() {
      clearInterval(interval)
      loader.style.display = 'none'
    }

    function main(colors) {
      // There are always 5 colors.
      palette = [
        colors[0],
        colors[1],
        colors[2],
        colors[3],
        colors[4],
        colors[3],
        colors[2],
        colors[1],
        colors[0]
      ]

      // Caching

      loader = document.querySelector('.loader')
      var squareElements = document.querySelectorAll('.loader .square')

      // Arranged square elements so they look snake like!
      squares = [
        squareElements[0],
        squareElements[1],
        squareElements[2],
        squareElements[5],
        squareElements[8],
        squareElements[7],
        squareElements[6],
        squareElements[3],
        squareElements[4]
      ]

      // Initialize
      init()
    }

    return extend(main, {
      stop: stop
    })
  })()

  render() {
    //const page = inside internal temp/gifs

    return (
    // return page ? (
    //   <PageCreate page={page} />
    // ) : (
      <div background-color="black">
        <div>
          <div className="loader">
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
            <div className="square" />
          </div>

          <div className="info">👯It's coming we promise :D👯</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    page: state.page.curPage ///page wont be here until after sticker is placed
  }
}

export default connect(mapStateToProps)(Loading)
