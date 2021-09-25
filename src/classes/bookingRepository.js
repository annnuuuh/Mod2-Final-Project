import Booking from './booking';
import Customer from './customer';
import Room from './room';
import dayjs from 'dayjs';

class BookingRepository {
  constructor(bookingData, roomData, customerData) {
    this.bookings = bookingData;
    this.customerBookings;
    this.rooms = roomData;
    this.customers = customerData;
    this.amountSpent = 0;
    this.user;
  }

  getBookings() {
    console.log(this.bookings);
    this.bookings = this.bookings.map(booking => {
      const newBooking = new Booking(booking);
      return newBooking;
    })
  }

  findCustomerBookings() {
    this.customerBookings = this.bookings.filter(booking => {
      return booking.userID === this.user.id;
    })
  }

  getCost() {
    let customerSpend = this.rooms.reduce((acc, room) => {
      this.customerBookings.forEach(booking => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight;
        }
      })
      return acc;
    }, 0);
    this.amountSpent = `$${customerSpend.toFixed(2)}`;
  }
}

export default BookingRepository;
