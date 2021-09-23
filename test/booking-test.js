import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import sampleCustomerData from './fixtures/customers';
import sampleBookingsData from './fixtures/bookings';

describe('Booking', function() {
  let customer;
  let bookings;
  let booking;
  beforeEach(function() {
    booking = new Booking(sampleBookingsData['bookings'][0])
    customer = new Customer(sampleCustomerData['customers'][0]);
    bookings = sampleBookingsData.bookings.map(booking => new Booking(booking))
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be a instance of Booking', function() {
    expect(booking).to.be.an.instanceof(Booking);
  });

  it('should be able to hold an ID', function() {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6sz");
  });

  it('should have a user id that matches a customer id', function() {
    expect(booking.userID).to.equal(sampleCustomerData['customers'][0].id);
  });

  it('should hold the date of the booking', function() {
    expect(booking.date).to.equal("2020/04/22");
  });

  it('should hold the number of the room on the booking', function() {
    expect(booking.roomNumber).to.equal(2);
  });

  it('should keep track of all the room charges', function() {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });

  // it('should be able to have bookings', function() {
  //   customer.setBookings(bookings);
  //   const actualBooking = customer.bookings[0];
  //   const expectedBooking = bookings[0];
  //   expect(actualBooking).to.be.an.instanceof(Booking);
  //   expect(actualBooking.id).to.equal(expectedBooking.id);
  // });
})
