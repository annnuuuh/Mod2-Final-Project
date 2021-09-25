import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/customer';
import Booking from '../src/classes/booking';
import BookingRepository from '../src/classes/bookingRepository';
import sampleCustomerData from './fixtures/customers';
import sampleBookingsData from './fixtures/bookings';
import sampleRoomsData from './fixtures/rooms';

describe('Booking', function() {
  let customer;
  let bookings;
  let booking;
  let bookingRepository;
  let customerBookings;
  beforeEach(function() {
    booking = new Booking(sampleBookingsData[0])
    customer = new Customer(sampleCustomerData[0]);
    bookingRepository = new BookingRepository(sampleBookingsData, sampleRoomsData, sampleCustomerData[0]);
    bookingRepository.user = sampleCustomerData[0];
  });

  it('should be able to have bookings', function() {
    expect(bookingRepository.bookings).to.deep.equal([
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
  );
});

  it('each booking should be an instance of Booking', function() {
    const expected = {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2020/04/22",
    "roomNumber": 2,
    "roomServiceCharges": []
    }
    bookingRepository.getBookings();
    expect(bookingRepository.bookings[0]).to.deep.equal(expected);
  });

  it('should be able to find customer bookings', function() {
    const expected = [{
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2020/04/22",
    "roomNumber": 2,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 1,
    "date": "2020/01/10",
    "roomNumber": 2,
    "roomServiceCharges": []
  }];
 ;
  bookingRepository.findCustomerBookings();
    expect(bookingRepository.customerBookings).to.be.an('array');
    expect(bookingRepository.customerBookings).to.deep.equal(expected);
  });
  });
