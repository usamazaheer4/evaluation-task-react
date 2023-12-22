import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { getProjects } from "../API/taskFormApi";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

const projects = [
  {
    description: "sample project description",
    endDate: "12/30/2023",
    id: "275a4599-c224-465d-820b-bcb0123158ba",
    name: "Sample Project",
    startDate: "12/20/2023",
  },
];

export default function ProjectModal(props) {
  const { onClose, open, projectId, clientId, projectData, setProjectData } =
    props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value, id) => {
    onClose(value, id);
  };

  // call api for all avalible projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (clientId) {
          const res = await getProjects(clientId);
          setProjectData(res);
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchProjects();
  }, [clientId]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Project</DialogTitle>
      <List sx={{ pt: 0 }}>
        {clientId ? (
          projectData.map((project, index) => (
            <ListItem disableGutters key={index}>
              <ListItemButton
                onClick={() => handleListItemClick(project.name, project.id)}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <FolderOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleClose()}>
              <ListItemText primary="Please Select Client First" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}
