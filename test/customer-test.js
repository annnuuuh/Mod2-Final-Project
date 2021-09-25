import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import sampleCustomerData from './fixtures/customers';
import sampleBookingsData from './fixtures/bookings';

describe('Customer', function() {
  let customer;
  let bookings;
  beforeEach(function() {
    customer = new Customer(sampleCustomerData['customers'][0]);
    bookings = sampleBookingsData.bookings.map(booking => new Booking(booking))
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be a instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should be able to hold a name', function() {
    expect(customer.name).to.equal("Leatha Ullrich");
  });

  it('should have and id', function() {
    expect(customer.id).to.equal(sampleCustomerData['customers'][0].id);
  });
})
