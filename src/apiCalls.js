export function fetchCustomers() {
  return fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .then(data => data);
}

export function fetchRooms() {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data);
}

export function fetchBookings() {
  return fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())
  .then(data => data);
}

// future -- export const add/remove bookings??
