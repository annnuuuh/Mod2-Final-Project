import Booking from './booking';
import Customer from './customer';

class BookingRepository {
  constructor(bookingData) {
    this.bookings = bookingData;
    this.customerBookings;
  }

  getBookings() {
    this.bookings = this.bookings.map(booking => {
      const newBooking = new Booking(booking);
      return newBooking;
    })
  }

  findCustomerBookings(customer) {
    this.customerBookings = this.bookings.filter(booking => {
      return booking.userID === customer.id;
    })
  }

  
}

export default BookingRepository;
