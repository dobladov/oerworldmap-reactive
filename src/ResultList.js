/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'

import Icon from './Icon'

const style = css`
  .ResultListItem {
    border-radius: 2px;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    align-items: center;

    .resultItemInfo {
      margin-left: 20px;
      fill: #005986;
      color: #005986;

      svg {
        width: 15px;
        height: 15px;
      }
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }
`

const ResultList = ({ items, onClickItem }) => (
  <div className="ResultList" css={style}>
    {items.map(item => (
      <div
        key={item._id}
        className="ResultListItem"
        onClick={() => {
          onClickItem(item)
        }}
      >
        {(item.about && item.about.image) && (
          <img src={item.about.image} />
        )}
        <div className="resultItemInfo">
          <Icon type={item.about['@type']} /> {item.about['@type']}
          <h4>{(item.about.name && item.about.name.en) || item._id}</h4>
        </div>
      </div>
    ))}
  </div>
)

ResultList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickItem: PropTypes.func.isRequired
}

export default ResultList
