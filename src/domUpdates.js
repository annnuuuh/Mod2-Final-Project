import dayjs from 'dayjs';

const domUpdates = {
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

  displayAvailableRooms() {
    
  }
}



export default domUpdates;
