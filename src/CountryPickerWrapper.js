import React from 'react'

const CountryPickerWrapper = ({ aggregations }) => (
  <div className="CountryPickerWrapper">
    <pre>
      {JSON.stringify(aggregations, null, 2)}
    </pre>
  </div>
)

export default CountryPickerWrapper
