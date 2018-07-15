
import React from 'react'
import PropTypes from 'prop-types'

const {hljs} = window

export default class MdCodeBlockRenderer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }
  
  setRef(el) {
    this.codeEl = el
  }
  
  componentDidMount() {
    this.highlightCode()
  }
  
  componentDidUpdate() {
    this.highlightCode()
  }
  
  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }
  
  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

MdCodeBlockRenderer.defaultProps = {
  language: ''
}

MdCodeBlockRenderer.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}