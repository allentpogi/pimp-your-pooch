import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import PetForm from "../PetForm";
import formatDate from "../../utils/formatdate";
import { getIconComponent } from "../../utils/geticoncomponent";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Avatar from "@mui/material/Avatar";

import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

const BookingList = ({ pet }) => {
  //   const pet = singlePet.singlePet;
  console.log(pet);
  const appointments = pet.appointments;
  console.log("appointments", appointments);

  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <CalendarMonthRoundedIcon />
          </Avatar>
          <Typography variant="h5">Upcoming bookings</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "1.5rem",
            justifyContent: "left",
            width: "100%",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Booking type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{appointments.bookingType}</TableCell>
                  <TableCell>{appointments.bookingDate}</TableCell>
                  <TableCell>{appointments.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
};

export default BookingList;
