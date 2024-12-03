import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ApiResponse } from "../utils/Static_API";

const generateValidationSchema = (fields) => {
  const schema = {};
  fields.forEach((field) => {
    if (field.required) {
      schema[field.name] = yup.string().required(`${field.label} is required`);
      if (field.type === "number") {
        schema[field.name] = yup
          .number()
          .typeError(`${field.label} must be a number`)
          .required(`${field.label} is required`);
      }
    }
  });
  return yup.object().shape(schema);
};

const Fetched = () => {
  const apiResponse = ApiResponse();
  const sectionTitles = Object.keys(apiResponse);

  const [selectedSection, setSelectedSection] = useState(sectionTitles[0]);
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fields = apiResponse[selectedSection];
  const validationSchema = generateValidationSchema(fields);

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit = (data) => {
    if (isEditing && selectedEntry !== null) {
      const updatedEntries = submittedEntries.map((entry, index) =>
        index === selectedEntry ? data : entry
      );
      setSubmittedEntries(updatedEntries);
      setSelectedEntry(null);
      setSnackbarMessage("Entry updated successfully!");
    } else {
      setSubmittedEntries([...submittedEntries, data]);
      setSnackbarMessage("Form submitted successfully!");
    }
    setIsEditing(false);
    reset();
    setOpenSnackbar(true);
  };

  const handleEdit = (index) => {
    const entryToEdit = submittedEntries[index];

    Object.keys(entryToEdit).forEach((key) => {
      setValue(key, entryToEdit[key]);
    });
    setSelectedEntry(index);
    setIsEditing(true);
  };

  return (
    <div className="border-solid">
      <Box
        sx={{
          gap: 4,
          p: 2,
          border: "2px solid gray",
          maxWidth: 800,
          mx: "auto",
          mt: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dynamic Form
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Section</InputLabel>
          <Select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            label="Select Section"
          >
            {sectionTitles.map((title) => (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <Box key={field.name} sx={{ mb: 2 }}>
              <Controller
                name={field.name}
                control={control}
                render={({ field: controllerField, fieldState: { error } }) => {
                  switch (field.type) {
                    case "text":
                    case "number":
                    case "password":
                    case "date":
                      return (
                        <TextField
                          {...controllerField}
                          type={field.type}
                          label={field.label}
                          variant="outlined"
                          fullWidth
                          error={!!error}
                          helperText={error ? error.message : ""}
                        />
                      );
                    case "dropdown":
                      return (
                        <FormControl fullWidth>
                          <InputLabel>{field.label}</InputLabel>
                          <Select {...controllerField} label={field.label}>
                            {field.options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {error && (
                            <Typography variant="caption" color="error">
                              {error.message}
                            </Typography>
                          )}
                        </FormControl>
                      );
                    default:
                      return null;
                  }
                }}
              />
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 4 }}>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>

        {submittedEntries.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Submitted Entries
            </Typography>
            {submittedEntries.map((entry, index) => (
              <Paper
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">Entry {index + 1}</Typography>
                <Box>
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={() => setSelectedEntry(index)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        {selectedEntry !== null && (
          <Paper sx={{ mt: 4, p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Selected Entry Details
            </Typography>
            {Object.entries(submittedEntries[selectedEntry]).map(
              ([key, value]) => (
                <Typography key={key} variant="body1">
                  <strong>{key}:</strong> {value}
                </Typography>
              )
            )}
          </Paper>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Fetched;
