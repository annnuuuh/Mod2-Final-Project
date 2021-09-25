//IMPORTS///////////////////////
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchCustomers, fetchUser, fetchRooms, fetchBookings } from './apiCalls.js';
import Customer from './classes/customer.js';
import Room from './classes/room.js';
import Booking from './classes/booking.js';
import BookingRepository from './classes/bookingRepository';
import domUpdates from './domUpdates';

////////////////GLOBAL VARIABLE//////////////////
let bookingRepository;
let customer;
let booking;
////////////////FETCH CALLS//////////////////////

////////////////EVENT LISTENERS//////////////////
window.addEventListener('load', loadApi);
////////////////FUNCTIONS////////////////////////


function loadApi() {
  Promise.all([fetchCustomers(), fetchBookings(), fetchRooms()])
  .then(data => {
    bookingRepository = new BookingRepository(data[1], data[2], data[0])
    loadCustomer(25);
    bookingRepository.getBookings()

  })
}

function loadCustomer(id) {
  fetchUser(id).then(customerData => {
    customer = new Customer(customerData);
    bookingRepository.user = customer;
    bookingRepository.findCustomerBookings(customer)
    domUpdates.addCustomerName(customer.name)
    domUpdates.displayCustomerBookings(bookingRepository.customerBookings);
    bookingRepository.getCost();
    domUpdates.displayTotalSpent(bookingRepository.amountSpent);
  })
}
