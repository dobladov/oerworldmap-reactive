/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import Markdown from 'markdown-to-jsx'

import Icon from './Icon'

const style = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  border-radius: 2px;
  padding: 40px;
  overflow: scroll;
  min-height: 80vh;

  .close {
    text-align: right;
    svg {
      width: 30px;
      height: 30px;
    }
  }

  .resourceViewType {
    svg {
      width: 15px;
      height: 15px;
    }

    h4 {
      display: inline-block;
      margin: 0;
      padding: 0;
    }
  }
`

const ResourceView = ({ resource, onClose }) => (
  <div className="ResourceView" css={style}>
    <div
      className="close"
      onClick={onClose}
    >
      <Icon type="close" />
    </div>

    {resource.about && (
      <>
      <span className="resourceViewType">
        <Icon type={resource.about['@type']} /> <h4>{resource.about['@type']}</h4>
      </span>

      <h2>{(resource.about.name && resource.about.name.en) || resource._id}</h2>

        {(resource.about.description && Object.keys(resource.about.description).length > 0) && (
          <Markdown>
            {resource.about.description[Object.keys(resource.about.description).shift()]}
          </Markdown>
        )}
      </>
    )}
  </div>
)

ResourceView.propTypes = {
  resource: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func.isRequired
}

export default ResourceView
