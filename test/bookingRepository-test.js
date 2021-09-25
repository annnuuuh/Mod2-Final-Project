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
  let customerBookings;
  beforeEach(function() {
    booking = new Booking(sampleBookingsData['bookings'][0])
    customer = new Customer(sampleCustomerData['customers'][0]);
    bookingRepository = new BookingRepository(sampleBookingsData);
    bookings = sampleBookingsData.bookings.map(booking => new Booking(booking));
    customerBookings = bookingRepository.customerBookings;
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
    expect(bookingRepository.bookings[0]).to.equal(booking[0])
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
    expect(bookingRepository.findCustomerBookings(customer)).to.be.an('array');
    expect(bookingRepository.findCustomerBookings(customer)).to.deep.equal(expected);
  });
  });
