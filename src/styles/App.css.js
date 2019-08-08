import { css } from '@emotion/core'

const style = css`
  min-height: 100vh;

  h2,
  h4 {
    color: #005986;
  }

  .wrapper {
    display: flex;
    min-height: 100vh;
    background-color: #F5F5F5;

    .content {
      margin: 0 auto;
      max-width: 1000px;
      width: 1000px;

      .nameSearch {
        margin: 10px 0;
      }

      .typeSearch {
        display: flex;
        margin: 10px 0;
        justify-content: space-around;

        a {
          margin: 0;
          color: #989898;
          background-color: transparent;
          font-weight: 500;
          padding: 0;
          transition: none;

          > span {
            display: inline-flex;
            align-items: center;
          }

          svg {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            fill: #989898;
          }

          &.active {
            color: #005986;

            svg {
              fill: #005986;
            }
          }

          &:focus {
            border: none;
            box-shadow: none;
          }

          &:hover {
            color: #ff8000;

            svg {
              fill: #ff8000;
            }
          }
        }
      }
    }

    .SearchResult {
      position: relative;

      .loading {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        z-index: 99;

        .loader {
          border: 16px solid #f3f3f3;
          border-radius: 50%;
          border-top: 16px solid #005986;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

      }

      .columns {
        display: flex;

        aside {
          margin-right: 20px;

          .FilterBox {
            border-radius: 2px;
            background: #fff;
            padding: 20px;
            margin-bottom: 20px;
            max-width: 350px;
            width: 350px;
          }
        }

        main {
          flex: 2;
        }
      }
    }
  }
`

export default style
