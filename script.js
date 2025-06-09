  // Code für die Zitate des Tages/exterene API (index.html)
  // Lädt ein zufälliges Entwicklerzitat von der Programming Quotes API (vercel.app)
// und zeigt es im <blockquote> mit der ID "dev-quote" an.
// Wird automatisch beim Laden der Seite ausgeführt.


//Header für alle Seiten 

document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Netzwerkfehler: " + response.statusText);
      }
      return response.text();
    })
    .then(function (data) {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(function (error) {
      console.error("Fehler beim Laden des Headers:", error);
    });
});

//footer für alle Seiten
function loadFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>&copy; 2025 Anna Bacanau. Alle Rechte vorbehalten.</p>
    <p>
      📞 <a href="tel:+436801516688">+43 680 151 66 88</a><br />
      ✉️ <a href="mailto:anna.bacanau@gmail.com">anna.bacanau@gmail.com</a>
    </p>
  `;
  document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", loadFooter);






async function loadProgrammingQuote() {
  try {
    console.log("Lade Entwickler-Zitat...");

    const response = await fetch("https://programming-quotes-api.herokuapp.com/quotes/random");
    if (!response.ok) throw new Error("API-Antwort fehlgeschlagen");

    const data = await response.json();

    const quoteElement = document.getElementById("dev-quote");
    if (quoteElement) {
      quoteElement.innerHTML = `
        <p>${data.en}</p>
        <cite>— ${data.author}</cite>
      `;
    }
  } catch (error) {
    console.error("Fehler beim Laden des Zitats:", error);
    const quoteElement = document.getElementById("dev-quote");
    if (quoteElement) {
      quoteElement.innerHTML = "<p><em>Zitat konnte nicht geladen werden.</em></p>";
    }
  }
}

window.addEventListener("DOMContentLoaded", loadProgrammingQuote);

// Für den Navigations-Block
// Hebt den aktuellen Navigationslink hervor, basierend auf dem Dateinamen in der URL.
// Fügt der passenden <a>-Navigation die Klasse "active" hinzu und entfernt sie von allen anderen.

const currentPath = window.location.pathname.split("/").pop();
const element = document.getElementById('lebenslauf-inhalt');

document.querySelectorAll(".nav-link").forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

//Funktion für die Generierung eines PDFs-Dokumnet

//Wird ein PDF Dokument generiert

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


  //Für die Seite "Kontakt" 
  //  // Startwert: Index des aktuell sichtbaren Bildes (beginnt bei 0)
  //     let slideIndex = 0;

  //     // Alle Elemente mit der Klasse "carousel-slide" (also die Bilder im Karussell) werden geholt
  //     let slides = document.getElementsByClassName("carousel-slide");

  //     // Funktion zum Anzeigen eines Bildes und Ausblenden der anderen
  //     function showSlides() {
  //       // Zuerst alle Bilder ausblenden
  //       for (let i = 0; i < slides.length; i++) {
  //         slides[i].style.display = "none";
  //       }

  //       // Nächsten Index vorbereiten (geht zyklisch weiter)
  //       slideIndex++;

  //       // Wenn der Index größer ist als die Anzahl der Bilder, wieder bei 1 beginnen
  //       if (slideIndex > slides.length) {
  //         slideIndex = 1;
  //       }

  //       // Aktuelles Bild (slideIndex - 1, da Array bei 0 beginnt) anzeigen
  //       slides[slideIndex - 1].style.display = "block";
  //     }

  //     // Funktion für den Benutzer, um manuell vor- oder zurückzublättern
  //     function plusSlides(n) {
  //       // n ist entweder +1 oder -1 (von den Pfeil-Buttons)
  //       slideIndex += n - 1; // z. B. bei +1 ergibt das keine Erhöhung, da showSlides() selbst inkrementiert
  //       showSlides(); // Danach wird das neue Bild angezeigt
  //     }

  //     // Starte die automatische Slideshow
  //     showSlides();
  //     setInterval(showSlides, 5000); // alle 5 Sekunden wechseln



//Slides Show aktualisiert:
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}



      // E-Mail QR
      new QRCode(document.getElementById("emailQR"), {
        text: "mailto:anna.bacanau@gmail.com",
        width: 150,
        height: 150,
      });

      // Telefon QR
      new QRCode(document.getElementById("phoneQR"), {
        text: "tel:+436801516688",
        width: 150,
        height: 150,
      });

      // für Datei Upload

      const fileInput = document.getElementById("datei");
      const fileName = document.getElementById("file-name");

      fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
          fileName.textContent = fileInput.files[0].name;
        } else {
          fileName.textContent = "Keine Datei ausgewählt";
        }
      });




