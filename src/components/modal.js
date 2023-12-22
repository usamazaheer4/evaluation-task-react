import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col } from "react-bootstrap";
import SelectField from "./select";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Status, Priority, TaskType } from "./enums";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { getAllEmployees, getClients, saveForm } from "../API/taskFormApi";
import { Snackbar, Alert } from "@mui/material";

import ProjectModal from "../components/projectModal";

export default function ModalForm(props) {
  // const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [taskType, setTaskType] = useState("");
  const [priority, setPriority] = useState("");
  const [sendMail, setSendMail] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [addThirtyDays, setAddThirtyDays] = useState(false);
  const [fetchOptions, setFetchOptions] = useState({});
  const [employeeData, setEmployeeData] = useState([
    { id: "1", name: "Loading..." },
  ]);
  const [employeeId, setEmployeeId] = useState();
  const [projectData, setProjectData] = useState([
    { id: "1", name: "Loading..." },
  ]);
  const [projectId, SetProjectId] = useState();
  const [clientData, setClientData] = useState([
    { id: "1", name: "Loading..." },
  ]);
  const [clientId, SetClientId] = useState();
  const [toastOpen, setToastOpen] = useState(false);

  //new modal
  const [open, setOpen] = useState(false);
  const [selectedProject, setselectedProject] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value, id) => {
    //close priject modals
    setOpen(false);
    setselectedProject(value);
    SetProjectId(id);
  };

  //=======   toast open /close    =======
  const handleToastOpen = () => {
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  const data = {
    ...fetchOptions,
    sendEmail: sendMail,
    dueDate: selectedDate,
    priority: priority,
    taskType: taskType,
    status: status,
  };

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    if (addThirtyDays) {
      setAddThirtyDays(false);
    }
    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    setSelectedDate(formattedDate);
  };

  const handleCheckboxChange = (event) => {
    setAddThirtyDays(event.target.checked);
    if (event.target.checked && selectedDate) {
      const currentDate = new Date(selectedDate);
      const newDate = new Date(
        currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
      );
      const formattedNewDate = `${(newDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${newDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${newDate.getFullYear()}`;

      setSelectedDate(formattedNewDate);
    } else if (!event.target.checked && selectedDate) {
      const currentDate = new Date(selectedDate);
      const newDate = new Date(
        currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
      );
      const formattedNewDate = `${(newDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${newDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${newDate.getFullYear()}`;
      setSelectedDate(formattedNewDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = saveForm(projectId, employeeId, clientId, data);
      handleToastOpen();
      setSelectedDate(null);
      setselectedProject(null);
      setAddThirtyDays(false);
      setSendMail(false);
      setTimeout(() => {
        props.onHide();
      }, 3000);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleChange = (e) => {
    setFetchOptions((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClient = (event) => {
    SetClientId(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleTaskType = (event) => {
    setTaskType(event.target.value);
  };

  const handleEmployee = (event) => {
    setEmployeeId(event.target.value);
  };

  //  api to fetch all employees
  useEffect(() => {
    const fetchEmployees = () => {
      try {
        getAllEmployees()
          .then((res) => {
            setEmployeeData(res);
            console.log(" mod res", res);
          })
          .catch((err) => {
            console.log("error", err);
          });
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  //  api to fetch all clients
  useEffect(() => {
    const fetchClients = () => {
      try {
        getClients()
          .then((res) => {
            setClientData(res);
          })
          .catch((err) => {
            console.log("error", err);
          });
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ borderBottom: "none" }} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">New Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Modal.Body>
            <Snackbar
              open={toastOpen}
              autoHideDuration={3000}
              onClose={handleToastClose}
            >
              <Alert onClose={handleToastClose} severity="success">
                Form Submit Successfully
              </Alert>
            </Snackbar>

            <div>
              {/* moadl for projects */}
              <ProjectModal
                selectedProject={selectedProject}
                projectId={projectId}
                open={open}
                onClose={handleClose}
                clientId={clientId}
                projectData={projectData}
                setProjectData={setProjectData}
              />
            </div>
            <Container>
              <Row>
                <Col sm={6} md={6} lg={4}>
                  <TextField
                    id="outlined-basic"
                    className="form-fields"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={selectedDate}
                    fullWidth
                    label="Due Date"
                    variant="outlined"
                    required
                    title="Please select Due Date"
                    focused
                  />
                </Col>
                <Col
                  sm={6}
                  md={6}
                  lg={4}
                  className="d-flex padding-zero mt-sm-0 mt-3"
                >
                  <span className="mx-1">
                    <input
                      type="date"
                      placeholder="MM-DD-YYYY"
                      style={{
                        width: "43px",
                        height: "43px",
                        borderRadius: "10px",
                        padding: "10px",
                        border: "2px solid #c8ccd9",
                      }}
                      onChange={handleDateChange}

                      // onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </span>

                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Project Date Filter 30+/-"
                      checked={addThirtyDays}
                      onChange={handleCheckboxChange}
                      disabled={!selectedDate}
                    />
                  </FormGroup>
                </Col>

                <Col sm={6} md={6} lg={4} className="mt-lg-0  mt-sm-3 mt-3">
                  <TextField
                    id="outlined-basic"
                    name="createdBy"
                    required
                    title="Please Enter Creator Name"
                    onChange={handleChange}
                    fullWidth
                    className="form-fields"
                    label="Created By"
                    variant="outlined"
                    focused
                  />
                </Col>
              </Row>

              {/*=================    row 2  =============      */}
              <Row className="mt-3">
                <Col sm={6} md={6} lg={4}>
                  <SelectField
                    label={"Client"}
                    // value={client}
                    onChange={handleClient}
                    options={clientData}
                    formData={true}
                  />
                </Col>
              </Row>

              {/*=================    row 3  =============      */}

              <Row className="mt-3">
                <Col>
                  <div className="d-flex gap-2">
                    <TextField
                      id="outlined-basic"
                      value={selectedProject}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      className="form-fields"
                      label="Project"
                      variant="outlined"
                      focused
                    />
                    <span className="icon-border" onClick={handleClickOpen}>
                      <FolderOutlinedIcon style={{ color: "9BA4B3" }} />
                    </span>
                  </div>
                </Col>
              </Row>

              {/*=================    row 4  =============      */}

              <Row className="mt-3">
                <Col>
                  <div className="d-flex gap-2">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      className="form-fields"
                      label="Task"
                      variant="outlined"
                      name="task"
                      required
                      title="Please Enter Task"
                      onChange={handleChange}
                      focused
                    />
                    <span className="icon-border">
                      <img
                        src="/edit.png"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </span>
                  </div>
                </Col>
              </Row>

              {/*=================    row 5  =============      */}

              <Row className="mt-3">
                <Col md={4}>
                  <SelectField
                    label={"Status"}
                    // value={status}
                    onChange={handleStatus}
                    options={[
                      { value: Status.IN_PROGRESS, label: Status.IN_PROGRESS },
                      { value: Status.COMPLETED, label: Status.COMPLETED },
                      { value: Status.OPEN, label: Status.OPEN },
                    ]}
                    required={true}
                    title={"Please Select Status"}
                  />
                </Col>
                <Col md={4} className="mt-lg-0 mt-md-0 mt-3">
                  <SelectField
                    label={"Assignee"}
                    options={employeeData}
                    formData={true}
                    onChange={handleEmployee}
                  />
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={sendMail}
                      onChange={() => setSendMail(!sendMail)}
                      label="Send Email"
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/*=================    row 6  =============      */}

              <Row className="mt-3">
                <Col md={4}>
                  <SelectField
                    label={"Task Type"}
                    // value={taskType}
                    onChange={handleTaskType}
                    options={[
                      {
                        value: TaskType.DEVELOPMENT,
                        label: TaskType.DEVELOPMENT,
                      },
                      {
                        value: TaskType.MANAGEMENT,
                        label: TaskType.MANAGEMENT,
                      },
                      { value: TaskType.TEST, label: TaskType.TEST },
                    ]}
                    required={true}
                    title={"Please Selct Task Type"}
                  />
                </Col>
                <Col md={4} className="mt-lg-0 mt-md-0 mt-3">
                  <SelectField
                    label={"Priority"}
                    onChange={handlePriority}
                    options={[
                      { value: Priority.IMPORTANT, label: Priority.IMPORTANT },
                      { value: Priority.MEDIUM, label: Priority.MEDIUM },
                      { value: Priority.LOW, label: Priority.LOW },
                    ]}
                    required={true}
                    title={"Please Select Priority"}
                  />
                </Col>
              </Row>

              {/*=================    row 6  =============      */}

              <Row className="mt-3">
                <Col md={6}>
                  <TextField
                    id="outlined-multiline-flexible"
                    name="notes"
                    multiline
                    rows={5}
                    required
                    title="Please Enter Note"
                    onChange={handleChange}
                    fullWidth
                    className="form-fields"
                    label="Notes"
                    variant="outlined"
                    focused
                  />

                  {/* <TextareaAutosize/> */}
                </Col>
                <Col md={6} className="mt-lg-0 mt-md-0 mt-3">
                  <TextField
                    id="outlined-multiline-flexible"
                    name="emailNotes"
                    required
                    label="Email Notes"
                    multiline
                    rows={5}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    className="form-fields"
                    focused
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary">Save & Add Task</Button>
            <Button variant="outline-secondary">Save & Add Pitch/Hit</Button>
            <Button variant="outline-secondary" onClick={() => props.onHide()}>
              Close
            </Button>
            <Button
              type="submit"
              variant="danger"
              disabled={!(projectId && employeeId && clientId && selectedDate)}
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
