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
    document.querySelector('.js-user-dashboard').innerText = `Welcome Back, ${customerName}!`;
  },

  displayCustomerBookings(customerBookings) {
    let bookingSection = document.querySelector('.js-booking-card');
    customerBookings.forEach(booking => {
      const bookingCard =
        `<article class="booking ${booking.id}">
        <pclass="card-title ${booking.id}">Booking Details:</p>
        <p class="date ${booking.id}">Reservation Date: ${booking.date}</p>
        <p class="room-number ${booking.id}">Room Number: ${booking.roomNumber}</p>`;
        bookingSection.innerHTML += bookingCard;
    });
  },

  displayTotalSpent(customerTotal) {
    document.querySelector('.js-total-spent').innerHTML = `<p>Your Total Spend: ${customerTotal}</p>`;
  },

  displayAvailableRooms(availableRooms) {
    let availableRoomsSection = document.querySelector('.js-available-rooms');
    if (!availableRooms.length) {
      availableRoomsSection.innerHTML = `<p>It looks like we do not have any rooms that match your selection. We are so sorry! Kindly try a different date or room type. Thank you.</p>`
    } else {
      availableRoomsSection.innerHTML = "";
        availableRooms.forEach(room => {
            const roomCard = `<article class="${room.number}" id="${room.number}">
            <pclass="card-title ${room.number}">Room Details</p>
            <p class="room-number ${room.number}">Room Type: ${room.roomType}</p>
            <p class="room-number ${room.number}">Room Number: ${room.number}</p>
            <p class="room-number ${room.number}">Number of Beds: ${room.numBeds}</p>
            <p class="room-number ${room.number}">Bidet: ${room.bidet}</p>
            <p class="room-number ${room.number}">Bed Size: ${room.bedSize}</p>
            <p class="room-number ${room.number}">Cost Per Night: ${room.costPerNight}</p>
            <button class"room-number ${room.number}">Book This Room!</button>`;
            availableRoomsSection.innerHTML += roomCard;
          })
    }

  },

  displayRoomTagsOnSearch(tags) {
    let roomTagSection = document.querySelector('.js-tags');
    roomTagSection.innerHTML = "";
    tags.forEach(tag => {
      const tagCheckBox =
      `<label class="tags">
      <input class="tag" type="checkbox" name="${tag}">${tag}
      </label>
      `;
      roomTagSection.innerHTML += tagCheckBox;
    })
  }
}

export default domUpdates;
