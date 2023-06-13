"use client";
import React, { useState, useRef } from "react";
import "./addTiers.module.css";

function AddTiers() {
  const [rows, initRow] = useState([]);
  const addRowTable = () => {
    const data = {
      minContribution: "",
      reward: "",
    };
    initRow([...rows, data]);
    console.log(initRow);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    initRow(data);
  };
  return (
    <>
      <table className="table table-striped col-12">
        <thead>
          <tr>
            <th className="col-3">Minimum Contribution</th>
            <th className="col-7">Reward</th>
            <th>
              <button
                className="btn btn-outline-primary btnTiers"
                onClick={addRowTable}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRows
            rows={rows}
            tableRowRemove={tableRowRemove}
            onValUpdate={onValUpdate}
          />
        </tbody>
      </table>
    </>
  );
}
function TableRows({ rows, tableRowRemove, onValUpdate }) {
  return rows.map((rowsData, index) => {
    const { minContribution, reward } = rowsData;
    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={minContribution}
            onChange={(event) => onValUpdate(index, event)}
            name="minContribution"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={reward}
            onChange={(event) => onValUpdate(index, event)}
            name="reward"
            className="form-control"
          />
        </td>
        <td>
          <button
            className="btn btn-outline-danger btnTiers"
            onClick={() => tableRowRemove(index)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
}
export default AddTiers;
