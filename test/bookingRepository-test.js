import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/customer';
import Booking from '../src/classes/booking';
import BookingRepository from '../src/classes/bookingRepository';
import sampleCustomerData from './fixtures/customers';
import sampleBookingsData from './fixtures/bookings';

describe('Booking', function() {
  let customer;
  let bookings;
  let booking;
  let bookingRepository;
  beforeEach(function() {
    booking = new Booking(sampleBookingsData['bookings'][0])
    customer = new Customer(sampleCustomerData['customers'][0]);
    bookings = sampleBookingsData.bookings.map(booking => new Booking(booking))
    bookingRepository = new BookingRepository(sampleBookingsData);
  });

  it('should be able to have bookings', function() {
    expect(bookingRepository.bookings).to.deep.equal({
      "bookings": [
      {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 1,
      "date": "2020/04/22",
      "roomNumber": 2,
      "roomServiceCharges": []
      },
      {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/01/24",
      "roomNumber": 24,
      "roomServiceCharges": []
      },
      {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 1,
      "date": "2020/01/10",
      "roomNumber": 2,
      "roomServiceCharges": []
      }
      ]
    })
  });

  it('each booking should be an instance of Booking', function() {
    expect(bookingRepository.bookings).to.deep.equal(bookings)
  })
  });

  // it('should be able to find customer bookings', function() {
  //   customer.setBookings(bookings);
  //   const actualBooking = customer.bookings[0];
  //   const expectedBooking = bookings[0];
  //   expect(actualBooking).to.be.an.instanceof(Booking);
  //   expect(actualBooking.id).to.equal(expectedBooking.id);
  // });
