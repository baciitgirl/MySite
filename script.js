
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

//footer: für alle Seiten
function loadFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>&copy; 2025 Anna Bacanau. Alle Rechte vorbehalten.</p>
    <p>
      📞 <a href="tel:+436801516688">+43 680 151 66 88</a><br />
      ✉️ <a href="mailto:anna.bacanau@gmail.com">anna.bacanau@gmail.com</a>
    </p>`;
  document.body.appendChild(footer);
}
document.addEventListener("DOMContentLoaded", loadFooter);


//Datei:index.html Block:Entwickler Zitat des Tages
  // Code für die Zitate des Tages/exterene API (index.html)
  // Lädt ein zufälliges Entwicklerzitat von der Programming Quotes API (vercel.app)
// und zeigt es im <blockquote> mit der ID "dev-quote" an.
// Wird automatisch beim Laden der Seite ausgeführt.

async function loadProgrammingQuote() {
  try {
    console.log("Lade Entwickler-Zitat...");

    //Richtige URL verwenden!
    const response = await fetch("https://programming-quotes-api.vercel.app/api/random");
    if (!response.ok) throw new Error(`Fehler: ${response.status} ${response.statusText}`);

    const data = await response.json();

    const quoteElement = document.getElementById("dev-quote");
    if (quoteElement) {
      quoteElement.innerHTML = `
        <p>${data.en}</p>
        <cite>— ${data.author}</cite>`;
    }
  } catch (error) {
    console.error("Fehler beim Laden des Zitats:", error);
    const quoteElement = document.getElementById("dev-quote");
    if (quoteElement) {
      quoteElement.innerHTML = "<p><em>Zitat konnte nicht geladen werden.</em></p>";
    }
  }
}

// Zitat laden, sobald die Seite vollständig geladen ist
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

// Funktion zur Generierung eines PDF-Dokuments
// Wird verwendet, um z. B. den Lebenslauf als PDF herunterladbar zu machen

function generatePDF() {
  // Holt das HTML-Element mit der ID 'lebenslauf-inhalt',
  // das den Inhalt enthält, der als PDF gespeichert werden soll
  const element = document.getElementById('lebenslauf-inhalt');

  // Konfigurationseinstellungen für die PDF-Erstellung
  const options = {
    margin: 0.5, // Seitenrand in Zoll
    filename: 'lebenslauf-anna-bacanau.pdf', // Name der heruntergeladenen PDF-Datei
    image: { type: 'jpeg', quality: 0.98 }, // Bildtyp und -qualität (für eingebettete Screenshots)
    html2canvas: { 
      scale: 2,     // Erhöht die Auflösung für bessere Druckqualität
      scrollY: 0    // Verhindert Scroll-Verschiebung während des Renderns
    },
    jsPDF: {
      unit: 'in',       // Maßeinheit: Zoll
      format: 'a4',     // Papierformat: A4
      orientation: 'portrait' // Hochformat
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'] // Vermeidet Seitenumbrüche an ungünstigen Stellen
    }
  };

  // html2pdf wird mit den Optionen konfiguriert,
  // nimmt das HTML-Element und startet den PDF-Download
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

/* Kode für die Generierung
der QR Kode */
  // E-Mail QR generieren
  new QRCode(document.getElementById("emailQR"), {
    text: "mailto:anna.bacanau@gmail.com",
    width: 150,
    height: 150,
  });

      // Telefon QR generieren
      new QRCode(document.getElementById("phoneQR"), {
        text: "tel:+436801516688",
        width: 150,
        height: 150,
      });

      /* für Datei Upload(Kontakt Formular)

      */
      const fileInput = document.getElementById("datei");
      const fileName = document.getElementById("file-name");

      //Datei hinzufügen mit Prüfung, ob eine Datei überhauupt ausgewählt war
      fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
          fileName.textContent = fileInput.files[0].name;
        } else {
          fileName.textContent = "Keine Datei ausgewählt";
        }
      });

      //Um sicher zu sein, dass wird nur PDF Datei hochgeladen
      const file = fileInput.files[0];
      if (file && file.type !== "application/pdf") {
        alert("Nur PDF-Dateien erlaubt.");
        return;
      }

      //Datei Größe kontrollieren
      if (file.size > 5 * 1024 * 1024) { // 5 MB
        alert("Die Datei ist zu groß.");
      }

   



