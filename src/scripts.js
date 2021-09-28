//IMPORTS///////////////////////
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/floralprintbackground.png';
import { fetchCustomers, fetchUser, fetchRooms, fetchBookings, addBooking } from './apiCalls.js';
import Customer from './classes/customer.js';
import Room from './classes/room.js';
import Booking from './classes/booking.js';
import BookingRepository from './classes/bookingRepository';
import domUpdates from './domUpdates';
import dayjs from 'dayjs';

const userDashboard = document.querySelector('.bookings-container');
const vacantRooms = document.querySelector('.js-available-rooms');
const sumbitDateBtn = document.getElementById("datebtn");
const today = dayjs().format('YYYY-MM-DD');
const roomTypeFilterSection = document.querySelector('.js-tags');
const bookAvailableRoom = document.querySelector('.js-add-booking');
const returnHomeBtn = document.querySelector('.js-return-to-dashboard');
let bookingRepository;
let customer;
let booking;
let room;


window.addEventListener('load', loadApi);
sumbitDateBtn.addEventListener('click', findAvailableRooms);
roomTypeFilterSection.addEventListener('click', function(event) {
  filterRoomsByType(event);
});
vacantRooms.addEventListener('click', addANewBooking);
returnHomeBtn.addEventListener('click', showDashboard);

function showDashboard() {
  domUpdates.show(userDashboard);
  domUpdates.hide(vacantRooms, roomTypeFilterSection, returnHomeBtn);
}

function addANewBooking(event) {
  event.preventDefault();
  const dateSelection = document.getElementById("calendar").value;
  let formattedDate = dayjs(dateSelection).format('YYYY/MM/DD');
  const roomNumber = parseInt(event.target.closest('article').id);
  // const newBooking = bookingRepository.availableRooms.find(availRoom => {
    // return availRoom.number === roomNumber;
  // });
  addBooking(roomNumber, customer, formattedDate);
  bookingRepository.findCustomerBookings(customer)
  bookingRepository.getCost();
  domUpdates.show(userDashboard);
  domUpdates.hide(vacantRooms, roomTypeFilterSection, returnHomeBtn);
}


function filterRoomsByType(event) {
  const checkbox = event.target;
  const tag = checkbox.name;
  if (!checkbox.matches('[type="checkbox"]')) {
    return;
  } if (checkbox.checked) {
    addTag(tag);
  } else {
    removeTag(tag);
  }
}

function addTag(tag) {
  bookingRepository.selectedTags.push(tag);
  const filteredRooms = bookingRepository.filterRoomByTags();
  domUpdates.displayAvailableRooms(filteredRooms);
}

function removeTag(tag) {
  bookingRepository.selectedTags = bookingRepository.selectedTags.filter(selectedTag => {
    return selectedTag !== tag;
  });
  if (bookingRepository.selectedTags.length) {
    const filteredRooms = bookingRepository.filterRoomByTags();
    domUpdates.displayAvailableRooms(filteredRooms);
  } if (!bookingRepository.selectedTags.length) {
    domUpdates.displayAvailableRooms(bookingRepository.availableRooms);
  }
}

function loadApi() {
  Promise.all([fetchCustomers(), fetchBookings(), fetchRooms()])
  .then(data => {
    bookingRepository = new BookingRepository(data[1], data[2], data[0])
    loadCustomer(30);
    bookingRepository.getBookings()
    document.getElementById("calendar").setAttribute("min", today);
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
  bookingRepository.findVacantRooms(formattedDate);
  bookingRepository.getRoomTags();
  domUpdates.hide(userDashboard);
  domUpdates.show(vacantRooms, returnHomeBtn);
  domUpdates.displayAvailableRooms(bookingRepository.availableRooms);
  domUpdates.displayRoomTagsOnSearch(bookingRepository.roomTags)
}

export {
loadApi
}
