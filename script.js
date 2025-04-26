function addEntry() {
  const name = document.getElementById("guestname").value;
  const address = document.getElementById("guestaddress").value;
  const message = document.getElementById("guestmessage").value;

  const guestList = document.getElementById("guestList");

  const entry = document.createElement("div");
  entry.classList.add("guest-entry");
  entry.innerHTML = `
    <div class="entry-name">${name}</div>
    <div class="entry-address">${address}</div>
    <div class="entry-message">${message}</div>
    <div class="entry-actions">
      <button class="done-btn">Selesai</button>
      <button class="delete-btn">Hapus</button>
    </div>
  `;

  const nameEl = entry.querySelector(".entry-name");
  const addressEl = entry.querySelector(".entry-address");
  const messageEl = entry.querySelector(".entry-message");
  const doneBtn = entry.querySelector(".done-btn");
  const deleteBtn = entry.querySelector(".delete-btn");

  doneBtn.addEventListener("click", () => {
    entry.classList.toggle("done");

    if (entry.classList.contains("done")) {
      doneBtn.textContent = "Batal";
      doneBtn.classList.add("cancel-btn");

      // Coret semuanya
      nameEl.style.textDecoration = "line-through";
      addressEl.style.textDecoration = "line-through";
      messageEl.style.textDecoration = "line-through";

      // Kasih warna abu-abu dan transparan sedikit
      nameEl.style.color = "gray";
      addressEl.style.color = "gray";
      messageEl.style.color = "gray";

      nameEl.style.opacity = "0.6";
      addressEl.style.opacity = "0.6";
      messageEl.style.opacity = "0.6";
    } else {
      doneBtn.textContent = "Selesai";
      doneBtn.classList.remove("cancel-btn");

      // Balikin semua normal
      nameEl.style.textDecoration = "none";
      addressEl.style.textDecoration = "none";
      messageEl.style.textDecoration = "none";

      nameEl.style.color = "inherit";
      addressEl.style.color = "inherit";
      messageEl.style.color = "inherit";

      nameEl.style.opacity = "1";
      addressEl.style.opacity = "1";
      messageEl.style.opacity = "1";
    }
  });

  deleteBtn.addEventListener("click", () => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus tamu ini?");
    if (confirmDelete) {
      guestList.removeChild(entry);
    }
  });

  guestList.prepend(entry);
  document.getElementById("guestform").reset();
}
