import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

export const getAllEmployees = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/employee`);

    return res.data;
  } catch (error) {
    const err = await error;
    return error;
  }
};

export const getClients = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/client`);
    return res.data;
  } catch (error) {
    const err = await error;
    return error;
  }
};

// get project
export const getProjects = async (clientId) => {
  try {
    const res = await axios.get(`${BASE_URL}/project/${clientId}`);
    return res.data;
  } catch (error) {
    const err = await error;
    return error;
  }
};

// save form api
export const saveForm = async (projectId, employeeId, clientId, data) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/task?project_id=${projectId}&client_id=${clientId}&employee_id=${employeeId}`,
      data
    );
    return res.data;
  } catch (error) {
    const err = await error;
    return error;
  }
};
