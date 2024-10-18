const productSelect = document.getElementById('productName');
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate product options
products.forEach(product => {
  const option = document.createElement('option');
  option.value = product.id; // Use the product ID as the value
  option.text = product.name; // Use the product name for display
  productSelect.add(option);
});

// Handle form submission and review counter
const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the review counter from localStorage
  let reviewCount = parseInt(localStorage.getItem('reviewCount')) || 0;
  reviewCount++;

  // Update the counter in localStorage
  localStorage.setItem('reviewCount', reviewCount);

  // Redirect to the review.html page
  window.location.href = 'review.html';
});

// On review.html page, display the review count
if (window.location.pathname === '/review.html') {
  const reviewCount = parseInt(localStorage.getItem('reviewCount')) || 0;
  document.getElementById('reviewCount').textContent = `You have submitted ${reviewCount} reviews.`;
}
