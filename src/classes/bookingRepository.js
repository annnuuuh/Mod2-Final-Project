class BookingRepository {
  constructor(bookings) {
    this.bookings = bookings;
  }

  addBookings() {
   this.bookings = this.bookings.map(booking => {
     const newBooking = new Booking(booking);
     return newBooking;
   });
 }
};

export default BookingRepository;
