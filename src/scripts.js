import './css/base.scss';
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
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.querySelector('.error-message');
const dateSelector = document.querySelector('.date-selection-form');
const loginMessage = document.querySelector('.please-log-in');
let bookingRepository;
let customer;
let booking;
let room;


window.addEventListener('load', displayLogin);
sumbitDateBtn.addEventListener('click', findAvailableRooms);
roomTypeFilterSection.addEventListener('click', function(event) {
  filterRoomsByType(event);
});
vacantRooms.addEventListener('click', addANewBooking);
returnHomeBtn.addEventListener('click', showDashboard);

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    let customerIdA = [username.charAt(8)]
    let customerIdB = [username.charAt(9)]
    let customerId = `${customerIdA}${customerIdB}`
    if (parseInt(customerId) > 0 && parseInt(customerId) <= 50 && password === "overlook2021") {
        loadApi(customerId)
    } else {
        domUpdates.show(loginErrorMsg)
        loginErrorMsg.style.opacity = 1;
    }
})

function displayLogin() {
  domUpdates.show(loginForm, loginMessage);
  domUpdates.hide(vacantRooms, roomTypeFilterSection, returnHomeBtn, userDashboard, dateSelector)
}
function loadApi(customerId) {
  Promise.all([fetchCustomers(), fetchBookings(), fetchRooms()])
  .then(data => {
    bookingRepository = new BookingRepository(data[1], data[2], data[0])
    loadCustomer(customerId);
    bookingRepository.getBookings()
    document.getElementById("calendar").setAttribute("min", today);
    document.getElementById("calendar").setAttribute("value", today);
    domUpdates.hide(loginForm, loginMessage);
    domUpdates.show(userDashboard, dateSelector)
  })
}

function showDashboard() {
  domUpdates.show(userDashboard);
  domUpdates.hide(vacantRooms, roomTypeFilterSection, returnHomeBtn);
}

function addANewBooking(event) {
  event.preventDefault();
  const dateSelection = document.getElementById("calendar").value;
  let formattedDate = dayjs(dateSelection).format('YYYY/MM/DD');
  const roomNumber = parseInt(event.target.closest('article').id);
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

function loadCustomer(id) {
  fetchUser(id).then(customerData => {
    customer = new Customer(customerData);
    bookingRepository.user = customer;
    bookingRepository.findCustomerBookings(customer)
    domUpdates.addCustomerName(customer.name)
    console.log(bookingRepository.customerBookings);
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
  domUpdates.hide(userDashboard, loginMessage);
  domUpdates.show(vacantRooms, returnHomeBtn, roomTypeFilterSection);
  domUpdates.displayAvailableRooms(bookingRepository.availableRooms);
  domUpdates.displayRoomTagsOnSearch(bookingRepository.roomTags)
}

export {
loadApi,
loadCustomer,
bookingRepository
}
