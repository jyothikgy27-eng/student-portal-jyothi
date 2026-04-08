// ----------------------
// CONTACT FORM (POST)
// ----------------------
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    try {
      const res = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      alert(result.message || "Submitted successfully!");
      form.reset();
    } catch (error) {
      alert("Error submitting data");
      console.error(error);
    }
  });
}


// ----------------------
// ADMIN PAGE (GET)
// ----------------------
const container = document.getElementById("data");

if (container) {
  fetch("http://localhost:3000/contacts")
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        container.innerHTML = "<p>No data available</p>";
        return;
      }

      container.innerHTML = data.map(item => `
        <div style="border:1px solid #ccc; padding:10px; margin:10px;">
          <h4>${item.name}</h4>
          <p><b>Email:</b> ${item.email}</p>
          <p><b>Message:</b> ${item.message}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      container.innerHTML = "<p>Error loading data</p>";
      console.error(err);
    });
}