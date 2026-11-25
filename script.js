
// ==============================
// SAVORA | RESTAURANT WEBSITE JS
// ==============================

// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close mobile navigation after clicking a link
document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// Menu Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        menuCards.forEach(card => {
            if (selectedCategory === "all" ||
                card.dataset.category === selectedCategory) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// Order Buttons
const orderButtons = document.querySelectorAll(".order-btn");
const specialRequest = document.getElementById("specialRequest");

orderButtons.forEach(button => {
    button.addEventListener("click", () => {

        const itemName = button.dataset.item;

        specialRequest.value = `Interested in ordering: ${itemName}`;

        alert(`${itemName} selected! Please complete the reservation form if you would like to book a table.`);

        document.getElementById("reservation").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Reservation Form
const reservationForm = document.getElementById("reservationForm");
const reservationMessage = document.getElementById("reservationMessage");
const bookingDate = document.getElementById("bookingDate");

// Set today's date as the minimum booking date
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

bookingDate.min = localToday;

// Reservation Form Submission
reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const phone = document.getElementById("guestPhone").value.trim();
    const date = bookingDate.value;
    const time = document.getElementById("bookingTime").value;
    const guests = document.getElementById("guests").value;
    const request = specialRequest.value.trim();

    if (!name || !phone || !date || !time || !guests) {
        reservationMessage.textContent = "Please fill in all required fields.";
        reservationMessage.style.color = "#c0392b";
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        reservationMessage.textContent = "Please enter a valid 10-digit phone number.";
        reservationMessage.style.color = "#c0392b";
        return;
    }

    // Prevent booking for past dates
    if (date < localToday) {
        reservationMessage.textContent = "Please select today or a future date.";
        reservationMessage.style.color = "#c0392b";
        return;
    }

    // Display reservation summary
    const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    reservationMessage.style.color = "#19352b";

    reservationMessage.innerHTML = `
        <strong>Reservation Request Submitted!</strong><br><br>
        Thank you, ${escapeHTML(name)}!<br>
        <strong>Date:</strong> ${formattedDate}<br>
        <strong>Time:</strong> ${escapeHTML(time)}<br>
        <strong>Guests:</strong> ${escapeHTML(guests)}<br>
        ${request ? `<strong>Request:</strong> ${escapeHTML(request)}<br>` : ""}
        <br>Your reservation request has been received in this demo.
    `;

    reservationForm.reset();
    bookingDate.min = localToday;
});

// Escape user input before displaying it in HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}
