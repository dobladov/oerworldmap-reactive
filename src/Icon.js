
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'

import faUsers from '@fortawesome/fontawesome-free/svgs/solid/users.svg'
import faUser from '@fortawesome/fontawesome-free/svgs/solid/user.svg'
import faDesktop from '@fortawesome/fontawesome-free/svgs/solid/desktop.svg'
import faCogs from '@fortawesome/fontawesome-free/svgs/solid/cogs.svg'
import faCalendar from '@fortawesome/fontawesome-free/svgs/solid/calendar.svg'
import faComment from '@fortawesome/fontawesome-free/svgs/solid/comment.svg'
import faFile from '@fortawesome/fontawesome-free/svgs/solid/file.svg'
import faWrench from '@fortawesome/fontawesome-free/svgs/solid/wrench.svg'
import faBalanceScale from '@fortawesome/fontawesome-free/svgs/solid/balance-scale.svg'
import faTag from '@fortawesome/fontawesome-free/svgs/solid/tag.svg'
import faSitemap from '@fortawesome/fontawesome-free/svgs/solid/sitemap.svg'
import faQuestion from '@fortawesome/fontawesome-free/svgs/solid/question.svg'
import faTimes from '@fortawesome/fontawesome-free/svgs/solid/times.svg'

const icons = {
  Service: faDesktop,
  Person: faUser,
  Organization: faUsers,
  Article: faComment,
  Action: faCogs,
  Concept: faTag,
  ConceptScheme: faSitemap,
  Event: faCalendar,
  WebPage: faFile,
  Product: faWrench,
  Policy: faBalanceScale,
  close: faTimes
}

const Icon = ({ type }) => {
  return (
    <span css={css`
      position: relative;
      top: 1px;
    `} dangerouslySetInnerHTML={{ __html: (icons[type] || faQuestion) }} />
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon
