const rooms = [
  { roomNumber: 101, capacity: 30, available: true },
  { roomNumber: 102, capacity: 25, available: false }, 
  { roomNumber: 103, capacity: 20, available: true },
  { roomNumber: 104, capacity: 35, available: false }, 
  { roomNumber: 105, capacity: 40, available: true },
];

let reservations = [];

function displayRooms() {
  const roomTableBody = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  roomTableBody.innerHTML = ""; 

  rooms.forEach((room) => {
    const row = roomTableBody.insertRow();
    row.innerHTML = `
            <td>${room.roomNumber}</td>
            <td>${room.capacity}</td>
            <td>${room.available ? "Tersedia" : "Tidak Tersedia"}</td>
        `;
  });
}

function makeReservation() {
  const name = document.getElementById("name").value;
  const roomNumber = document.getElementById("roomNumber").value;
  const date = document.getElementById("date").value;
  const startTime = document.getElementById("startTime").value;
  const duration = document.getElementById("duration").value;

  if (!name || !roomNumber || !date || !startTime || !duration) {
    alert("Semua data harus diisi!");
    return;
  }

  const reservation = {
    name,
    roomNumber,
    date,
    startTime,
    duration,
  };

  if (isRoomAvailable(reservation)) {
    reservations.push(reservation);
    alert("Reservasi berhasil dilakukan!");
    displayReservations();
    document.getElementById("bookingForm").reset();
  } else {
    alert("Ruangan sudah dipesan pada waktu tersebut!");
  }
}

function isRoomAvailable(reservation) {
  for (let res of reservations) {
    if (
      res.roomNumber === reservation.roomNumber &&
      res.date === reservation.date
    ) {
      const start1 = new Date(`${res.date} ${res.startTime}`);
      const end1 = new Date(start1.getTime() + res.duration * 60 * 60 * 1000);
      const start2 = new Date(`${reservation.date} ${reservation.startTime}`);
      const end2 = new Date(
        start2.getTime() + reservation.duration * 60 * 60 * 1000
      );

      if (start1 < end2 && start2 < end1) {
        return false;
      }
    }
  }
  return true;
}

function displayReservations() {
  const tableBody = document
    .getElementById("reservationTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; 

  reservations.forEach((reservation) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.roomNumber}</td>
            <td>${reservation.date}</td>
            <td>${reservation.startTime}</td>
            <td>${reservation.duration} jam</td>
            <td><button onclick="cancelReservation('${reservation.name}')">Hapus</button></td>
        `;
  });
}

function cancelReservation(name) {
  const index = reservations.findIndex((res) => res.name === name);
  if (index !== -1) {
    reservations.splice(index, 1);
    displayReservations();
  }
}

window.onload = function () {
  displayRooms();
};
