import Room from './room';

class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges;
  }
  getRoomInformation(roomInfo) {
    this.roomNumber = this.roomNumber.map(room => {
      return new Room(room);
    });
  }
};

export default Booking;
