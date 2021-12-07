import React, { Component, forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import api from "./State/Api";
// import { Link } from "react-router-dom";
import Select from "react-select";
import tableIcons from "./TableIcons";
import { Button } from "@material-ui/core";
const data = [
  { userId: "1", bookingId: "1", requestType: 12, requestStatus: "Pending" },
  { userId: "1", bookingId: "2", requestType: 24, requestStatus: "Approved" },
  { userId: "2", bookingId: "1", requestType: 18, requestStatus: "Approved" },
  { userId: "3", bookingId: "1", requestType: 25, requestStatus: "Pending" },
  { userId: "4", bookingId: "1", requestType: 19, requestStatus: "Approved" },
  { userId: "5", bookingId: "1", requestType: 12, requestStatus: "Pending" },
];

const issueTypeSelected = [
  { value: "1", label: "Cancel Order" },
  { value: "2", label: "Contact Admin" },
];

const columns = [
  {
    title: "UserId",
    field: "userId",
  },
  {
    title: "BookingId",
    field: "bookingId",
  },
  {
    title: "RequestType",
    field: "requestType",
  },
  {
    title: "RequestStatus",
    field: "requestStatus",
  },
  {
    title: "RequestDescription",
    field: "requestDescription",
  },
];

const Home = () => {
  const reqTypes = ["Cancel_Order", "Contact_Admin"];
  const reqStatus = ["Pending", "Approved", "Rejected"];
  const [data, setData]  = useState([]);

  useEffect(async () => {
    api.getIssues().then((response) => {
      console.log(response);
      setData(response);
    });
  }, []);

  const resolveRequest = (id) => {
    const idx = data.findIndex(item => item.id == id);
    if (idx > -1) {
   
      let dataCopy = [...data];
      dataCopy[idx] = {
        ...data[idx],
        requestStatus: "Resolved"
      }
      setData(dataCopy)
    }
  }

  
  const resolve = forwardRef(
    (props, ref) => (
      console.log("Button Props, and ref", props, ref),
      (<Button ref={ref}>Resolve</Button>)
    )
  );

  return (
    <>
      <div className="container-fluid">
        <div
          className="row"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <div>
            <h1>Cancellation Requests</h1>
            <MaterialTable
              title="Cancel Order Requests"
              data={data.filter(item => item.requestType === reqTypes[0] && item.requestStatus != "Resolved")}
              columns={columns}
              style={{ margin: "20px" }}
              actions={[
                {
                  icon: resolve,
                  tooltip: "Resolve Ticket",
                  onClick: async (event, rowData) => {
                    var resp = await api.resolveIssue(rowData);
                    resolveRequest(rowData.id);
                  },
                },
              ]}
            />
          </div>

          <div>
            <h1>Admin Requests</h1>
            <MaterialTable
              title="Contact Admin Requests"
              data={data.filter(item => item.requestType === reqTypes[1] && item.requestStatus != "Resolved")}
              columns={columns}
              style={{ margin: "20px" }}
              actions={[
                {
                  icon: resolve,
                  tooltip: "Resolve Ticket",

                  onClick: async (event, rowData) => {
                    // rowData.requestStatus = "Resolved";
                    // delete rowData.tableData;
                    // console.log("Sending This", rowData);
                    var resp = await api.resolveIssue(rowData);
                    resolveRequest(rowData.id);

                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
