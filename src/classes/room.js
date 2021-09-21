class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }
};

export default Room;


//SAMPLE ROOMS
// {
// "rooms": [
// {
// "number": 1,
// "roomType": "residential suite",
// "bidet": true,
// "bedSize": "queen",
// "numBeds": 1,
// "costPerNight": 358.4
// },
// {
// "number": 2,
// "roomType": "suite",
// "bidet": false,
// "bedSize": "full",
// "numBeds": 2,
// "costPerNight": 477.38
// },
// {
// "number": 3,
// "roomType": "single room",
// "bidet": false,
// "bedSize": "king",
// "numBeds": 1,
// "costPerNight": 491.14
// };
