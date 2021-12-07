import axios from "axios";

const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;
const issuesEndpoint = process.env.REACT_APP_ISSUES_ENDPOINT;
export const login = async (username, password) => {
  const resp = await axios.post(authEndpoint + `authenticate`, {
    username,
    password,
  });
  if (resp.status !== 200) {
    throw Error;
  }
  return resp.data;
};

export const getIssues = async (token) => {
  const resp = await axios.get(issuesEndpoint  + `all`);
  if (resp.status !== 200) {
    throw Error;
  }
  return resp.data;
};

export const resolveIssue = async (issueObj) => {
  console.log("Issue Object", issueObj);
  const resp = await axios.post(
    issuesEndpoint + `resolve`,
    {...issueObj, requestStatus: "Resolved"}
  );
  if (resp.status !== 200) {
    throw Error;
  }
  console.log("Issue Resolved", resp);

  return resp.data;
};

export default {
  login,
  getIssues,
  resolveIssue,
};
