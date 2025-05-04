function loadUsersFromAPI() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      const userList = document.getElementById("userList");
      userList.innerHTML = "";
      data.forEach((user) => {
        const div = document.createElement("div");
        div.className = "user-card";
        div.innerHTML = `
          <h4>${user.name}</h4>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
        `;
        userList.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Gagal mengambil data API:", error);
      document.getElementById("userList").innerHTML = "Gagal mengambil data.";
    });
}

// Panggil saat DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadData(); // panggil loadData guestbook
  loadUsersFromAPI(); // panggil load API
});

function loadImagesFromAPI() {
  const imageList = document.getElementById("imageList");
  imageList.innerHTML = "Loading gambar...";

  // Ambil 5 gambar random dari Picsum
  const totalImages = 5;
  imageList.innerHTML = "";
  for (let i = 0; i < totalImages; i++) {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/seed/${Math.random()}/200/200`;
    img.alt = "Random Image";
    imageList.appendChild(img);
  }
}

// Panggil sekali waktu halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  loadData(); // guestbook
  loadUsersFromAPI(); // user data
  loadImagesFromAPI(); // gambar api
});

function saveData() {
  const entries = [...document.querySelectorAll(".guest-entry")].map((entry) => ({
    name: entry.querySelector(".entry-name").textContent,
    address: entry.querySelector(".entry-address").textContent,
    message: entry.querySelector(".entry-message").textContent,
    done: entry.classList.contains("done"),
  }));
  localStorage.setItem("guestList", JSON.stringify(entries));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("guestList")) || [];
  data.forEach(({ name, address, message, done }) => createEntry(name, address, message, done));
}

function createEntry(name, address, message, done = false) {
  const guestList = document.getElementById("guestList");
  const entry = document.createElement("div");
  entry.className = "guest-entry" + (done ? " done" : "");
  entry.innerHTML = `
    <div class="entry-name">${name}</div>
    <div class="entry-address">${address}</div>
    <div class="entry-message">${message}</div>
    <div class="entry-actions">
      <button class="done-btn">${done ? "Batal" : "Selesai"}</button>
      <button class="delete-btn">Hapus</button>
    </div>
  `;
  guestList.prepend(entry);

  const [doneBtn, deleteBtn] = entry.querySelectorAll("button");
  doneBtn.onclick = () => {
    entry.classList.toggle("done");
    doneBtn.textContent = entry.classList.contains("done") ? "Batal" : "Selesai";
    saveData();
  };
  deleteBtn.onclick = () => {
    if (confirm("Apakah Anda yakin ingin menghapus tamu ini?")) {
      entry.remove();
      saveData();
    }
  };
}

function addEntry() {
  const name = document.getElementById("guestname").value.trim();
  const address = document.getElementById("guestaddress").value.trim();
  const message = document.getElementById("guestmessage").value.trim();
  if (!name || !address || !message) return alert("Semua kolom wajib diisi!");

  createEntry(name, address, message);
  saveData();
  document.getElementById("guestform").reset();
}

document.addEventListener("DOMContentLoaded", loadData);
