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
    this.unavailableRooms;
    this.availableRooms;
    this.roomTags;
    this.selectedTags = [];
  }

  getBookings() {
    this.bookings = this.bookings.map(booking => {
      const newBooking = new Booking(booking);
      return newBooking;
    })
  }

  findCustomerBookings() {
    let filteredBookings = this.bookings.filter(booking => {
      return booking.userID === this.user.id;
    })
    this.customerBookings = filteredBookings.sort((a, b) => {
      return dayjs(a.date) - dayjs(b.date);
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

  findVacantRooms(formattedDate) {
    this.unavailableRooms = [];
    this.availableRooms = [];
    const filteredBookings = this.bookings.filter(booking => {
      if (booking.date === formattedDate) {
        this.unavailableRooms.push(booking.roomNumber);
      }
    })
    this.rooms.forEach(room => {
      if (this.unavailableRooms.includes(room.number)) {
        return
      } else {
        this.availableRooms.push(room);
      }
    })
  }

  getRoomTags() {
    this.roomTags = [];
    this.rooms.forEach(room => {
      if (!this.roomTags.includes(room.roomType)) {        this.roomTags.push(room.roomType);
      }
    })
  }
  filterRoomByTags() {
    let filteredRooms = [];
    this.selectedTags.forEach(selectedTag => {
      this.addToFilteredRoom(selectedTag, filteredRooms);
    })
    return filteredRooms;
  }
  addToFilteredRoom(selectedTag, filteredRooms) {
    this.availableRooms.forEach(availableRoom => {
      if (availableRoom.roomType === selectedTag) {
        filteredRooms.push(availableRoom);
      }
    });
  }
}

export default BookingRepository;
