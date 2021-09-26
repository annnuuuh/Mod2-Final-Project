import dayjs from 'dayjs';

const domUpdates = {

  hide(...elements) {
  elements.forEach(element => {
    element.classList.add('hidden');
  })
},

  show(...views) {
  views.forEach(view => view.classList.remove('hidden'));
},

  addCustomerName(customerName) {
    document.querySelector('.js-user-dashboard').innerText = customerName;
  },

  displayCustomerBookings(customerBookings) {
    let bookingSection = document.querySelector('.js-booking-card');
    customerBookings.forEach(booking => {
      const bookingCard =
        `<article class="booking ${booking.id}">
        <pclass="card-title ${booking.id}">Booking Details</p>
        <p class="date ${booking.id}">Reservation Date: ${booking.date}</p>
        <p class="room-number ${booking.id}">Room Number: ${booking.roomNumber}</p>`;
        bookingSection.innerHTML += bookingCard;
    });
  },

  displayTotalSpent(customerTotal) {
    document.querySelector('.js-total-spent').innerHTML = `<p>Total Spend: ${customerTotal}</p>`;
  },

  displayAvailableRooms(availableRooms) {
    let availableRoomsSection = document.querySelector('.js-available-rooms');
    availableRoomsSection.innerHTML = "";
      availableRooms.forEach(room => {
        if (!room) {
          availableRoomsSection.innerHTML = `<p>We are so sorry! There are no rooms available for the date you've selected. Kindly select a different date.</p>`;
        } else {
          const roomCard = `<article class="room ${room.number}">
          <pclass="card-title ${room.number}">Room Details</p>
          <p class="room-number ${room.number}">Room Type: ${room.roomType}</p>
          <p class="room-number ${room.number}">Room Number: ${room.number}</p>
          <p class="room-number ${room.number}">Number of Beds: ${room.numBeds}</p>
          <p class="room-number ${room.number}">Bidet: ${room.bidet}</p>
          <p class="room-number ${room.number}">Bed Size: ${room.bedSize}</p>
          <p class="room-number ${room.number}">Cost Per Night: ${room.costPerNight}</p>`;
          availableRoomsSection.innerHTML += roomCard;
        }
    })
  },
}

export default domUpdates;
