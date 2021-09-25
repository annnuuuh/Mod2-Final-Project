
function fetchCustomers() {
  return fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .then(data => data.customers)
  .catch(error => console.log(error))
}

function fetchUser(userID) {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function fetchRooms() {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(error => console.log(error))
}

function fetchBookings() {
  return fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(error => console.log(error))
}

export {
  fetchCustomers,
  fetchUser,
  fetchRooms,
  fetchBookings
}

// future -- export const add/remove bookings??
