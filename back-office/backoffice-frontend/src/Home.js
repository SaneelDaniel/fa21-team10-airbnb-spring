import React, { Component, forwardRef, useEffect } from "react";
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
  const [state, setState] = React.useState(null);
  const [cancelData, setCancelData] = React.useState([]);
  const [contactData, setContactData] = React.useState([]);

  useEffect(async () => {
    api.getIssues().then((response) => {
      setState(response);
      localStorage.setItem("issues", JSON.stringify(response));
    });
    filterContent();
  }, []);

  const filterContent = async () => {
    const data = JSON.parse(localStorage.getItem("issues"));

    console.log("filter me", data);
    var filteredCancelData = await data.filter((item) => {
      return (
        item.requestType === reqTypes[0] && item.requestStatus != "Resolved"
      );
    });

    var filteredContactData = await data.filter((item) => {
      return (
        item.requestType === reqTypes[1] && item.requestStatus != "Resolved"
      );
    });

    await setCancelData(filteredCancelData);
    await setContactData(filteredContactData);
    console.log("cancel data", filteredCancelData, "contact data", contactData);
  };
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
              data={cancelData}
              columns={columns}
              style={{ margin: "20px" }}
              actions={[
                {
                  icon: resolve,
                  tooltip: "Resolve Ticket",
                  onClick: async (event, rowData) => {
                    rowData.requestStatus = "Resolved";
                    delete rowData.tableData;
                    console.log("Sending This", rowData);
                    var resp = await api.resolveIssue(rowData);
                    if (resp) {
                      filterContent();
                    }
                  },
                },
              ]}
            />
          </div>

          <div>
            <h1>Admin Requests</h1>
            <MaterialTable
              title="Contact Admin Requests"
              data={contactData}
              columns={columns}
              style={{ margin: "20px" }}
              actions={[
                {
                  icon: resolve,
                  tooltip: "Resolve Ticket",

                  onClick: async (event, rowData) => {
                    rowData.requestStatus = "Resolved";
                    delete rowData.tableData;
                    console.log("Sending This", rowData);
                    var resp = await api.resolveIssue(rowData);
                    if (resp) {
                      filterContent();
                    }
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
