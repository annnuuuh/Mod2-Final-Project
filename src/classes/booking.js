class Booking {
  constructor(booking, customer) {
    this.id = booking.id;
    this.userID = customer.id;
    this.date = booking.date;
    this.roomServiceCharges = booking.roomServiceCharges;
  }
};

export default Booking;

//SAMPLE BOOKINGS
// {
// "bookings": [
// {
// "id": "5fwrgu4i7k55hl6sz",
// "userID": 9,
// "date": "2020/04/22",
// "roomNumber": 15,
// "roomServiceCharges": []
// },
// {
// "id": "5fwrgu4i7k55hl6t5",
// "userID": 43,
// "date": "2020/01/24",
// "roomNumber": 24,
// "roomServiceCharges": []
// },
// {
// "id": "5fwrgu4i7k55hl6t6",
// "userID": 13,
// "date": "2020/01/10",
// "roomNumber": 12,
// "roomServiceCharges": []
// };
