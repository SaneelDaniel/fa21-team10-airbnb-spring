import React, { Component } from "react";
import MaterialTable from "material-table";

// import { Link } from "react-router-dom";

const data = [
  { userId: "1", bookingId: "1", requestType: 12, requestStatus: "Pending" },
  { userId: "1", bookingId: "2", requestType: 24, requestStatus: "Approved" },
  { userId: "2", bookingId: "1", requestType: 18, requestStatus: "Approved" },
  { userId: "3", bookingId: "1", requestType: 25, requestStatus: "Pending" },
  { userId: "4", bookingId: "1", requestType: 19, requestStatus: "Approved" },
  { userId: "5", bookingId: "1", requestType: 12, requestStatus: "Pending" },
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
  }
];

class Home extends Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <MaterialTable
            title="Request Created by Users"
            data={data}
            columns={columns}
          />
        </div>
      </>
    );
  }
}

export default Home;
