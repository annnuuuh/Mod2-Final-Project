//IMPORTS///////////////////////
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchCustomers, fetchRooms, fetchBookings } from './apiCalls.js';
import Customer from './classes/customer.js';
import Room from './classes/room.js';
import Booking from './classes/booking.js';
import BookingRepository from './classes/bookingRepository';
import domUpdates from './domUpdates';

//GLOBAL VARIABLE//////////////////
let bookingRepository;
let customer;
//FETCH CALLS//////////////////////

//EVENT LISTENERS//////////////////
window.addEventListener('load', loadCustomer);
//FUNCTIONS


function loadCustomer() {
  fetchCustomers().then(customerData => {
    getBookings(customerData);
  });
}

function getBookings(customerData) {
  fetchBookings().then(bookingData => {
    customer = new Customer(customerData['customers'][25])
    bookingRepository = new BookingRepository(bookingData['bookings'])
    domUpdates.addCustomerName(customer.name)
    bookingRepository.getBookings()
    bookingRepository.findCustomerBookings(customer)
    domUpdates.displayCustomerBookings(bookingRepository.customerBookings);
    console.log(bookingRepository.customerBookings[0].date)
  });
}
