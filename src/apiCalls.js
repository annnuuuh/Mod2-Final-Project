import Booking from './classes/booking';
import dayjs from 'dayjs';
import { loadApi, loadCustomer, bookingRepository } from './scripts.js';



function fetchCustomers() {
  return fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .then(data => data.customers)
  .catch(error => console.log(error))
}

function fetchUser(userID) {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function fetchRooms() {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(error => console.log(error))
}

function fetchBookings() {
  return fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(error => console.log(error))
}

function addBooking(room, customer, date) {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify({
      userID: customer.id,
      date: date,
      roomNumber: room,
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(response => bookingRepository.bookings.push(new Booking(response.newBooking)))
  // .then(loadApi(customer.id))
  .then(loadCustomer(customer.id))
  .catch(error => console.log(error));
}

export {
  fetchCustomers,
  fetchUser,
  fetchRooms,
  fetchBookings,
  addBooking
}
