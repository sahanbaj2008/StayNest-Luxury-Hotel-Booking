
// ===== Mobile Navigation =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Set Minimum Booking Date =====
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

checkin.min = getToday();
checkout.min = getToday();

// Checkout must be after check-in
checkin.addEventListener("change", function () {
  if (checkin.value) {
    const nextDay = new Date(checkin.value + "T12:00:00");
    nextDay.setDate(nextDay.getDate() + 1);

    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const day = String(nextDay.getDate()).padStart(2, "0");

    checkout.min = `${year}-${month}-${day}`;

    if (checkout.value && checkout.value <= checkin.value) {
      checkout.value = "";
    }
  }
});

// ===== Booking Form Validation =====
const bookingForm = document.getElementById("booking");

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!checkin.value || !checkout.value) {
    alert("Please select check-in and check-out dates.");
    return;
  }

  if (checkin.value < getToday()) {
    alert("Check-in date cannot be in the past.");
    return;
  }

  if (checkout.value <= checkin.value) {
    alert("Check-out date must be after check-in.");
    return;
  }

  const guests = document.getElementById("guests").value;
  const room = document.getElementById("roomType").value;

  alert(
    "Your booking search details:\n\n" +
    "Check-in: " + checkin.value + "\n" +
    "Check-out: " + checkout.value + "\n" +
    "Guests: " + guests + "\n" +
    "Room: " + room + "\n\n" +
    "Demo only: No real reservation has been made."
  );
});

// ===== Select Room from Room Card =====
document.querySelectorAll(".book-room").forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedRoom = button.dataset.room;

    document.getElementById("roomType").value = selectedRoom;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});
