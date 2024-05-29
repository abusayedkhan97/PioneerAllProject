// Get references to modal elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

const modalContent = document.querySelector(".modal-content");

// Function to open modal with slide down and fade effect
function openModal() {
    modalContent.style.animation = "fadeIn 0.3s ease-out";
    modal.style.display = "flex";
    modal.style.opacity = 1;
    modal.style.height = "100%";
}

// Function to close modal with slide up and fade effect
function closeModal() {
    modalContent.style.animation = "fadeOut 0.3s ease-out";
    setTimeout(() => {
        modal.style.opacity = 0;
        modal.style.height = 0;
        modal.style.display = "none";
    }, 200); // Ensure display change after opacity transition
}

// Event listener for opening modal
openModalBtn.addEventListener("click", openModal);

// Event listener for closing modal
closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
