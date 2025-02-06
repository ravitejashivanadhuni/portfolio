function redirectTo(projectPage) {
    window.location.href = projectPage;
}

// Handling the contact form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting traditionally

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple client-side validation
    if (name && email && message) {
        document.getElementById("form-response").textContent = "Thank you for your message! I'll get back to you soon.";
        document.getElementById("form-response").style.color = "#99ccff";

        // Clear the form after submission
        document.getElementById("contact-form").reset();
    } else {
        document.getElementById("form-response").textContent = "Please fill in all fields.";
        document.getElementById("form-response").style.color = "red";
    }
});
