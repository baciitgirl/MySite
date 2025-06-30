// ==========================
// HEADER & FOOTER LADEN
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  // Lade header.html und füge den Inhalt in das Placeholder-Element ein
  fetch("header.html")
    .then(response => {
      if (!response.ok) throw new Error("Netzwerkfehler: " + response.statusText);
      return response.text();
    })
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data; // Füge den geladenen HTML-Code in das DOM ein
    })
    .catch(error => {
      console.error("Fehler beim Laden des Headers:", error); // Fehlerbehandlung bei Problemen mit dem Laden
    });

  // Erzeuge ein <footer>-Element mit Kontaktdaten und hänge es ans Ende der Seite
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>&copy; 2025 Anna Bacanau. Alle Rechte vorbehalten.</p>
    <p>
      <a href="tel:+436801516688">+43 680 151 66 88</a><br />
      <a href="mailto:anna.bacanau@gmail.com">anna.bacanau@gmail.com</a>
    </p>`;
  document.body.appendChild(footer);

  // Starte alle optionalen Funktionen
  loadDeveloperQuote();      // Lade ein Entwickler-Zitat
  markActiveNavigation();    // Markiere den aktiven Navigationslink
  initSlideShow();           // Starte die Slideshow
  initFileUpload();          // Aktiviere die Datei-Upload-Funktion
  generateQRCodes();         // Generiere QR-Codes für Kontakt
});

// ==========================
// ZITAT LADEN (API)
// ==========================
async function loadDeveloperQuote() {
  const quoteElement = document.getElementById("dev-quote");
  try {
    // Hole ein zufälliges Zitat mit dem Thema "technology"
    const response = await fetch("https://api.quotable.io/random?tags=technology");
    if (!response.ok) throw new Error(`Fehler: ${response.status}`);

    const data = await response.json(); // Antwort als JSON verarbeiten

    // Füge Zitat und Autor ins HTML ein, wenn das Element existiert
    if (quoteElement) {
      quoteElement.innerHTML = `<p>"${data.content}"</p><cite>— ${data.author}</cite>`;
    }
  } catch (error) {
    console.error("Zitat-Laden fehlgeschlagen:", error);
    // Zeige Fehlermeldung im HTML an
    if (quoteElement) {
      quoteElement.innerHTML = "<p><em>Zitat konnte nicht geladen werden.</em></p>";
    }
  }
}

// ==========================
// AKTUELLE ZEIT LADEN (API)
// ==========================
async function loadWorldTime(tz, elemId) {
  const el = document.getElementById(elemId);
  if (!el) return; // Wenn Ziel-Element nicht vorhanden, abbrechen

  const url = `https://api.api-ninjas.com/v1/worldtime?timezone=${tz}`;
  try {
    // Anfrage an API mit Zeit-Zone senden
    const response = await fetch(url, {
      headers: { 'X-Api-Key': 'nAB3Cr0QP9VLi6JIgX5juA==UERfDWr6xOf3fZvY' }
    });
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

    const data = await response.json();

    // Zeige Zeit im richtigen Element an (z.B. "Vienna")
    el.textContent = `Zeit in ${tz.split('/')[1]}: ${data.datetime}`;
  } catch (e) {
    console.error("Fehler beim Laden der Zeit:", e);
    el.textContent = "Zeit konnte nicht geladen werden.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadWorldTime("Europe/Vienna", "vienna-time"); // Rufe Zeit für Wien ab
});

// ==========================
// NAVIGATION HERVORHEBEN
// ==========================
function markActiveNavigation() {
  const currentPath = window.location.pathname.split("/").pop();
  // Alle Navigationselemente prüfen
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active"); // Markiere aktuellen Link
    } else {
      link.classList.remove("active"); // Entferne Markierung von anderen
    }
  });
}

// ==========================
// GITHUB-REPOS LADEN
// ==========================
fetch("https://api.github.com/users/baciitgirl/repos")
  .then((response) => {
    if (!response.ok) throw new Error(`Fehler beim Abrufen: ${response.status} ${response.statusText}`);
    return response.json();
  })
  .then((data) => {
    // Daten im Log anzeigen, später z. B. als Projektliste anzeigen
    console.log("Public Repositories:", data);
  })
  .catch((error) => {
    console.error("Fehler mit API:", error);
  });

// ==========================
// PDF GENERIEREN
// ==========================
function generatePDF() {
  const element = document.getElementById('lebenslauf-inhalt');
  const options = {
    margin: 0.3,
    filename: 'lebenslauf-anna-bacanau.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3, scrollY: 0 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  // Erzeuge PDF aus dem gewählten Bereich und lade es herunter
  html2pdf().set(options).from(element).save();
}

// ==========================
// SLIDESHOW
// ==========================
function initSlideShow() {
  let slideIndex = 1; // Start mit dem ersten Bild
  showSlides(slideIndex); // Zeige Startbild

  // Funktion für Navigation (z. B. mit Buttons)
  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  function showSlides(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return; // Wenn keine Bilder vorhanden, abbrechen

    if (n > slides.length) slideIndex = 1; // Zurück zum Anfang
    if (n < 1) slideIndex = slides.length; // Zum letzten Bild

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Alle Bilder ausblenden
    }

    slides[slideIndex - 1].style.display = "block"; // Aktuelles Bild anzeigen
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initSlideShow();
});

// ==========================
// DATEIUPLOAD
// ==========================
function initFileUpload() {
  const fileInput = document.getElementById("datei");
  const fileName = document.getElementById("file-name");

  if (!fileInput || !fileName) return; // Felder nicht vorhanden?

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0]; // Nur die erste Datei zählt
      fileName.textContent = file.name; // Zeige Dateiname an

      // Nur PDF-Dateien erlauben
      if (file.type !== "application/pdf") {
        alert("Nur PDF-Dateien erlaubt.");
        fileInput.value = "";
        fileName.textContent = "Keine gültige Datei";
        return;
      }

      // Maximal 5 MB Größe erlaubt
      if (file.size > 5 * 1024 * 1024) {
        alert("Die Datei ist zu groß.");
        fileInput.value = "";
        fileName.textContent = "Datei zu groß";
      }
    } else {
      fileName.textContent = "Keine Datei ausgewählt"; // Keine Datei gewählt
    }
  });
}

// ==========================
// QR-CODES ERZEUGEN
// ==========================
function generateQRCodes() {
  const emailQR = document.getElementById("emailQR");
  const phoneQR = document.getElementById("phoneQR");

  // QR-Code für E-Mail erzeugen
  if (emailQR) {
    new QRCode(emailQR, {
      text: "mailto:anna.bacanau@gmail.com",
      width: 150,
      height: 150,
    });
  }

  // QR-Code für Telefonnummer erzeugen
  if (phoneQR) {
    new QRCode(phoneQR, {
      text: "tel:+436801516688",
      width: 150,
      height: 150,
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateQRCodes();
});
