/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Global, jsx } from '@emotion/core'

import {
  ReactiveBase,
  ReactiveList,
  ToggleButton,
  DataSearch,
  MultiList,
  SelectedFilters,
  ReactiveComponent,
} from '@appbaseio/reactivesearch'

import globalStyles from './styles/globalStyles'

import languagesLabels from './locales/iso639-1.json'
import countriesLabels from './locales/iso3166-1-alpha-2.json'
import regionsLabels from './locales/iso3166-2.json'

import style from './styles/App.css.js'

import Icon from './Icon'
import ResourceView from './ResourceView'
import ResultList from './ResultList'
import CountryPickerWrapper from './CountryPickerWrapper'

const { ELASTICSEARCH_INDEX } = process.env
const { ELASTICSEARCH_URL } = process.env

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resource: null
    }
    this.subFilters = [
      {
        componentId: 'filter.about.keyword',
        dataField: 'about.keywords',
        showMissing: true,
        showSearch: true,
        title: 'Tag'
      },
      {
        componentId: 'filter.about.location.address.addressCountry',
        dataField: 'about.location.address.addressCountry',
        showSearch: false,
        title: 'Country',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{countriesLabels[label] || label}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.location.address.addressRegion',
        dataField: 'about.location.address.addressRegion',
        showSearch: false,
        title: 'Region',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{regionsLabels[label]}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.availableChannel.availableLanguage',
        dataField: 'about.availableChannel.availableLanguage',
        showSearch: false,
        title: 'Language',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{languagesLabels[label] || label}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.additionalType.@id',
        dataField: 'about.additionalType.@id',
        showSearch: false,
        title: 'Sub-Categories',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('#').slice(-1).pop()}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.audience.@id',
        dataField: 'about.audience.@id',
        showSearch: false,
        title: 'Audience',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('/').slice(-1).pop()}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.primarySector.@id',
        dataField: 'about.primarySector.@id',
        showSearch: false,
        title: 'Primary Sector',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('#').slice(-1).pop()}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.secondarySector.@id',
        dataField: 'about.secondarySector.@id',
        showSearch: false,
        title: 'Secondary Sector',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('#').slice(-1).pop()}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.award',
        dataField: 'about.award',
        showSearch: false,
        title: 'Award',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('/').slice(-1).pop().replace('.png', '').replace('.jpg', '')}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.license.@id',
        dataField: 'about.license.@id',
        showSearch: false,
        title: 'License',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('#').slice(-1).pop()}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.about.@id',
        dataField: 'about.about.@id',
        showSearch: false,
        title: 'Subject',
        renderItem: (label, count, isSelected) => (
          <span>
            <span>{label.split('/').slice(-1).pop()}</span>
            <span>{count}</span>
          </span>
        )
      },
      {
        componentId: 'filter.about.activityField.@id',
        dataField: 'about.activityField.@id',
        showSearch: false,
        title: 'Field of Activity'
      }
    ]

    this.filterIDs = ['q', 'filter.about.@type'].concat(this.subFilters.map(filter => filter.componentId))
    this.subFilters = this.subFilters.map(filter => {
      filter.react = {
        and: this.filterIDs.filter(id => id !== filter.componentId)
      }
      return filter
    })

    this.toggleButtons = [
      { label: 'Organizaion', value: 'Organization' },
      { label: 'Service', value: 'Service' },
      { label: 'Person', value: 'Person' },
      { label: 'Project', value: 'Action' },
      { label: 'Event', value: 'Event' },
      { label: 'Story', value: 'Article' },
      { label: 'Publication', value: 'WebPage' },
      { label: 'Tool', value: 'Product' },
      { label: 'Policy', value: 'Policy' }
    ]

    this.toggleButtons = this.toggleButtons.map(btn => {
      btn.label = (
        <span>
          <Icon type={btn.value} /> {btn.label}
        </span>
      )
      return btn
    })
  }

  render () {
    const { subFilters, toggleButtons } = this
    const { resource } = this.state

    return (
      <main css={style}>
        <Global styles={globalStyles} />

        <ReactiveBase
          app={ELASTICSEARCH_INDEX}
          url={ELASTICSEARCH_URL}
          className="wrapper"
        >
          <div className="content">

            <DataSearch
              className="nameSearch"
              componentId="q"
              dataField={['about.name.*', 'about.description.*']}
              placeholder="Search the OER"
              URLParams
              react={ {
                and: this.filterIDs.filter(id => id !== 'q')
              }}
            />

            <ReactiveComponent
              componentId="myCountryPicker"
              defaultQuery={() => ({
                  aggs: {
                      color: {
                          terms: {
                              field: 'about.location.address.addressCountry'
                          }
                      }
                  }
              })}
              render={({ aggregations, setQuery }) => (
                  <CountryPickerWrapper
                      aggregations={aggregations}
                      setQuery={setQuery}
                  />
              )}
              react={ {
                and: this.filterIDs
              }}
            />

            <ToggleButton
              className="typeSearch"
              componentId="filter.about.@type"
              dataField="about.@type"
              URLParams
              multiSelect={false}
              react={ {
                and: this.filterIDs.filter(id => id !== 'filter.about.@type')
              }}
              data={toggleButtons}
            />

            <ReactiveList
              className="SearchResult"
              componentId="SearchResult"
              title="Results"
              dataField="@type"
              showResultStats={false}
              from={0}
              size={20}
              pagination
              loader={
                <div className="loading">
                  <h1>Loading Results...</h1>
                  <div className="loader" />
                </div>
              }
              showLoader
              react={{
                and: this.filterIDs
              }}

              render={({ data, resultStats }) => (
                  <>
                  <h4>{resultStats.numberOfResults} Found</h4>
                  <SelectedFilters />
                  <br/>
                  <div className="columns">
                    <aside
                      style={{
                        display: resource ? 'none' : ''
                      }}
                    >
                      {subFilters.map(filter => (
                        <MultiList
                          key={filter.componentId} className="FilterBox"
                          {...filter}
                          URLParams
                        />
                      ))}

                    </aside>
                    <main
                      style={{
                        display: resource ? 'none' : ''
                      }}
                    >
                      <ResultList
                        items={data}
                        onClickItem={(item) => {
                          this.setState({ resource: item })
                        }}
                      />
                    </main>
                  </div>

                  {resource &&
                    <ResourceView
                      resource={resource}
                      onClose={() => {
                        this.setState({ resource: null })
                      }}
                    />
                  }
                  </>
              )
              }
            />
          </div>

        </ReactiveBase>
      </main>
    )
  }
}

render(<App/>, document.getElementById('app'))
