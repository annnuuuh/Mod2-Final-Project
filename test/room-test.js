import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/room';
import sampleRoomsData from './fixtures/rooms';

describe('Booking', function() {
  let room;
  beforeEach(function() {
    room = new Room(sampleRoomsData[0])
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be a instance of Booking', function() {
    expect(room).to.be.an.instanceof(Room);
  });

  it('should have a number', function() {
    expect(room.number).to.equal(1);
  });

  it('should have a type', function() {
    expect(room.roomType).to.equal("residential suite");
  });

  it('should indicate if it has a bidet', function() {
    expect(room.bidet).to.equal(true);
  });

  it('should have the size of the bed in the room', function() {
    expect(room.bedSize).to.equal("queen");
  });

  it('should have the number of beds in the room', function() {
    expect(room.numBeds).to.equal(1);
  });

  it('should have a cost per night', function() {
    expect(room.costPerNight).to.equal(358.4);
  });
})
