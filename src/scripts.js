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
import dayjs from 'dayjs';

let userDashboard = document.querySelector('.bookings-container');
let vacantRooms = document.querySelector('.js-available-rooms');
let bookingRepository;
let customer;
let booking;
let today = dayjs().format('YYYY-MM-DD');
const sumbitDateBtn = document.getElementById("datebtn");


window.addEventListener('load', loadApi);
sumbitDateBtn.addEventListener('click', findAvailableRooms);


function loadApi() {
  Promise.all([fetchCustomers(), fetchBookings(), fetchRooms()])
  .then(data => {
    bookingRepository = new BookingRepository(data[1], data[2], data[0])
    loadCustomer(25);
    bookingRepository.getBookings()
    // document.getElementById("calendar").setAttribute("min", today);
    document.getElementById("calendar").setAttribute("value", today);
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

function findAvailableRooms(event) {
  event.preventDefault();
  const dateSelection = document.getElementById("calendar").value;
  let formattedDate = dayjs(dateSelection).format('YYYY/MM/DD');
  bookingRepository.findOpenRooms(formattedDate);
  domUpdates.hide(userDashboard);
  domUpdates.show(vacantRooms);
  domUpdates.displayAvailableRooms(bookingRepository.availableRooms);
  bookingRepository.getRoomTags();
  console.log(bookingRepository.roomTags);
  // domUpdates.displayRoomTags(bookingRepository.roomTags);
}
