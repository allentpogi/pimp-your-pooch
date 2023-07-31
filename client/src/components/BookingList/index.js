import React from "react";
import formatDate from "../../utils/formatdate";
import { getBookingtypeName } from "../../utils/getbookingtypename";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Avatar from "@mui/material/Avatar";

import {
  Box,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const BookingList = ({ pet }) => {
  const appointments = pet.appointments;

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
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {getBookingtypeName(appointment.bookingType)}
                  </TableCell>
                  <TableCell>{formatDate(appointment.bookingDate)}</TableCell>
                  <TableCell>{appointment.notes}</TableCell>
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
