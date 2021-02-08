import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table'

const TableView = ( { data, currentlyOnline, checkOnline }) => {



  const mapRows = data.map((person, index) =>
    <tr key={index}>
      <td>{person.name}</td>
      <td>{person.timesum}</td>
    </tr>
    )

  const mapOnline = currentlyOnline.map((name, index) =>
    <tr key={index}>
      <td>{name}</td>
    </tr>
    )

  const noOnline = () =>
    <tr style={{backgroundColor: 'pink'}}>
      <td>No players online</td>
    </tr>

  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: 'auto'}}>
      <table style={{border: '1px solid black', margin: 'auto', textAlign: 'center', padding: '4px'}}>
        <caption>Total playtime of users</caption>
        <thead >
          <tr style={{backgroundColor: 'lightgray'}}>
            <th>Name</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          {mapRows}
        </tbody>
      </table>

        <table style={{border: '1px solid black', margin: 'auto', textAlign: 'center', padding: '4px'}}>
          <caption>Currently online</caption>
          <thead >
            <tr style={{backgroundColor: 'lightgray'}}>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {currentlyOnline.length ? mapOnline : noOnline()}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button onClick={checkOnline}>Refresh table</button>
              </td>
            </tr>
          </tfoot>
        </table>
    </div>

  )
}

export default TableView;