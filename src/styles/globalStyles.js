import { css } from '@emotion/core'

const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #fafafa;
    font-size: 16px;
    font-family: futura-pt, sans-serif, sans-serif;
    color: #3c3c3c;
    min-height: 100vh;
  }

  svg {
      fill: #005986;
  }

  pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
`

export default globalStyles
