import Booking from './booking'

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }
  
  setBookings(bookings) {
    let booking = bookings.map(booking => new Booking(booking));
    if (booking.userID === this.id) {
      this.bookings.push(booking)
    }
  }
};



export default Customer;
