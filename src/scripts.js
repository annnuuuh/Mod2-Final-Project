//IMPORTS///////////////////////
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchCustomers, fetchRooms, fetchBookings } from './apiCalls.js';
import Customer from './classes/customer.js';
import Room from './classes/room.js';
import Booking from './classes/booking.js';

//GLOBAL VARIABLE//////////////////

//FETCH CALLS//////////////////////
const fetchData = () => {
  Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
  .then(data => parseData(data))
}

const parseData = (data) => {
  let customerData = data[0]
  let roomData = data[1]
  let bookingData = data[2]
  getData(customerData, roomData, bookingData)
}
//EVENT LISTENERS//////////////////

//FUNCTIONS
const getData = (customerData, roomData, bookingData) => {
  customer = new Customer(customerData[0])
  room = new Room(roomData)
  booking = new Booking(bookingData)
}
