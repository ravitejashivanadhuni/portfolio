function redirectTo(projectPage) {
    window.location.href = projectPage;
}
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting traditionally

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple client-side validation
    if (name && email && message) {
        document.getElementById("form-response").textContent = "Sending your message...";
        document.getElementById("form-response").style.color = "#99ccff";

        // Send the form data via Formspree
        fetch("https://formspree.io/f/xbldkgez", {
            method: 'POST',
            body: new FormData(document.getElementById("contact-form")),
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("form-response").textContent = "Thank you for your message! I'll get back to you soon.";
                document.getElementById("form-response").style.color = "#99ccff";
                document.getElementById("contact-form").reset();  // Reset form after success
            } else {
                document.getElementById("form-response").textContent = "There was an error sending your message. Please try again.";
                document.getElementById("form-response").style.color = "red";
            }
        })
        .catch(error => {
            document.getElementById("form-response").textContent = `Error: ${error.message}`;
            document.getElementById("form-response").style.color = "red";
        });
    } else {
        document.getElementById("form-response").textContent = "Please fill in all fields.";
        document.getElementById("form-response").style.color = "red";
    }
});
