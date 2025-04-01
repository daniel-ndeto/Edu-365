/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import EventIcon from "@mui/icons-material/Event";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    dateOfBirth:"", // null
    gender: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
  });

  const [phoneError, setPhoneError] = useState(false);
  const [emergencyContactError, setEmergencyContactError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateOfBirthChange = (date) => {
    setFormData({
      ...formData,
      dateOfBirth: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (formData.emergencyContact.length !== 10) {
      setEmergencyContactError(true);
    } else {
      setEmergencyContactError(false);
    }

    if (!phoneError && !emergencyContactError) {
      console.log(formData);
      window.location.href = "/students/profile";
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid item xs={10}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={handleDateOfBirthChange}
                      renderInput={(params) => (
                        <TextField
                          {...params.inputProps}
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <EventIcon
                                sx={{
                                  color: "action.active",
                                  cursor: "pointer",
                                }}
                                onClick={params.inputProps.onClick}
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                      <MenuItem value="Prefer not to say">
                        Prefer not to say
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={phoneError}
                    helperText={phoneError && "Phone number must be 10 digits"}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    error={emergencyContactError}
                    helperText={
                      emergencyContactError &&
                      "Emergency contact must be 10 digits"
                    }
                  />
                </Grid>
                <Grid item xs={10}>
                  <Button variant="contained" color="primary" type="submit">
                    Save Details
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default StudentForm;
