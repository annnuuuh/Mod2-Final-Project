const domUpdates = {
  addCustomerName(customerName) {
    document.querySelector('.js-user-dashboard').innerText = customerName;
  },

//   displayCustomerBookings(customerBookings) {
//     let bookingSection = document.querySelector('.js-booking-card');
//     customerBookings.forEach(booking => {
//       const bookingCard = `
//       <article class="booking ${booking.id}">
//         <p class="booking-date ${recipe.id}">Reservation Date: ${booking.date}</p>
//         <p class"room-number ${recipe.id}">Room Number: ${booking.roomNumber}</p>
//       </article>`;
//         return bookingSection.innerHTML += bookingCard;
//     })
//   }
// }
displayCustomerBookings(customerBookings) {
  let bookingSection = document.querySelector('.js-booking-card');
    if (!customerBookings.length) {
      bookingSection.innerHTML =
      `<p>We couldn't find any bookings.</p>`
    } else {
      bookingSection.innerHTML = '';
      customerBookings.forEach(booking => {
        const bookingCard =
        `<article class="recipe ${booking.id}">
        <pclass="card-title ${booking.id}">Booking Details</p>
        <p class="date ${booking.id}">Reservation Date: ${booking.date}</p>
        <p class="room-number ${booking.id}">Room Number: ${booking.roomNumber}</p>
        <p class="room-charges ${booking.id}">Total Charges:</p>
        </article>`;
        bookingSection.innerHTML += bookingCard;
      });
    }
  },
}

export default domUpdates;
