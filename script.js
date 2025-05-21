const currentPath = window.location.pathname.split("/").pop();
const element = document.getElementById('lebenslauf-inhalt');

document.querySelectorAll(".nav-link").forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});




  function generatePDF() {
    const element = document.getElementById('lebenslauf-inhalt');
    const options = {
      margin: 0.5,
      filename: 'lebenslauf-anna-bacanau.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(options).from(element).save();
  }


   const images = document.querySelectorAll('.carousel-images img');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  let current = 0;

  function updateCarousel() {
    images.forEach((img, index) => {
      img.classList.toggle('active', index === current);
    });
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    updateCarousel();
  });

  updateCarousel(); // Initial anzeigen