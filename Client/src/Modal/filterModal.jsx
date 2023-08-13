import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const FilterModal = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("");

  const Tasks = useSelector((state) =>
    state?.tasks?.tasks ? state?.tasks?.tasks : []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = () => {
    const filters = {
      priority: priorityFilter,
    };
    console.log(filters);
    onFilter(filters);
    handleClose();
  };

  const uniquePriorities = [
    ...new Set(Tasks?.length > 0 ? Tasks?.map((task) => task?.priority) : ""),
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FilterAltIcon />
      </Button>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-modal"
        aria-describedby="filter-modal-description"
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            width: "400px",
            borderRadius: "25px",
          }}
        >
          <h2 id="filter-modal">Filter Tasks</h2>
          <FormControl
            style={{
              marginBottom: "10px",
              minWidth: "120px",
              width: "100%",
            }}
          >
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {uniquePriorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={()=>handleFilter()}
            >
              Refine Tasks
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

FilterModal.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterModal;
