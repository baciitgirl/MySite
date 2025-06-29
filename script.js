// ==========================
// HEADER dynamisch laden
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  // Lädt den HTML-Inhalt aus "header.html" und fügt ihn in #header-placeholder ein
  fetch("header.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Netzwerkfehler: " + response.statusText);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(error => {
      console.error("Fehler beim Laden des Headers:", error);
    });

  // FOOTER generieren und anhängen
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>&copy; 2025 Anna Bacanau. Alle Rechte vorbehalten.</p>
    <p>
      📞 <a href="tel:+436801516688">+43 680 151 66 88</a><br />
      ✉️ <a href="mailto:anna.bacanau@gmail.com">anna.bacanau@gmail.com</a>
    </p>`;
  document.body.appendChild(footer);

  // Entwickler-Zitat laden
  loadDeveloperQuote();

  // Navigation aktiv setzen
  markActiveNavigation();

  // Slideshow starten (wenn vorhanden)
  initSlideShow();

  // Datei-Upload vorbereiten (wenn vorhanden)
  initFileUpload();

  // QR-Codes generieren (wenn Elemente vorhanden sind)
  generateQRCodes();
});

// ========================== FUNKTIONEN NACH DEM ZWECK:
// API-ZITAT LADEN
// ==========================
/** 
 * Lädt ein zufälliges, inspirierendes Zitat von ZenQuotes 
 */
/**
 * Lädt ein Zitat aus der API-Ninjas Quote API
 */
// Entwickler-Zitat dynamisch laden (über corsproxy.io als CORS-Bypass)
// Holt ein Zitat zum Thema "technology" über API-Ninjas (RapidAPI)
async function loadDeveloperQuote() {
  const quoteElement = document.getElementById("dev-quote");
  try {
    const response = await fetch("https://api.quotable.io/random?tags=technology");

    if (!response.ok) throw new Error(`Fehler: ${response.status}`);

    const data = await response.json();

    if (quoteElement) {
      quoteElement.innerHTML = `
        <p>"${data.content}"</p>
        <cite>— ${data.author}</cite>`;
    }
  } catch (error) {
    console.error("Zitat-Laden fehlgeschlagen:", error);
    if (quoteElement) {
      quoteElement.innerHTML = "<p><em>Zitat konnte nicht geladen werden.</em></p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", loadDeveloperQuote);


//Alternative Lösung

const quotes = [
  { content: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { content: "Programs must be written for people to read.", author: "Harold Abelson" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
];

function loadDeveloperQuote() {
  const quoteElement = document.getElementById("dev-quote");
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.innerHTML = `<p>"${random.content}"</p><cite>— ${random.author}</cite>`;
}

document.addEventListener("DOMContentLoaded", loadDeveloperQuote);

// ==========================
// ZEIT IN WIEN
// ==========================
// Holt die aktuelle Zeit in Wien über einen Proxy von worldtimeapi.org
document.addEventListener("DOMContentLoaded", () => {
  loadWorldTime("Europe/Vienna", "vienna-time");
  // Weitere Städte? Füge hier weitere Zeilen hinzu.
});

/**
 * Holt aktuelle Zeit via World Time API und zeigt sie im Element an.
 *
 * @param {string} tz Timezone als IANA-String (z. B. "Europe/Vienna")
 * @param {string} elemId ID des HTML-Elements für die Ausgabe
 */
async function loadWorldTime(tz, elemId) {
  const el = document.getElementById(elemId);
  if (!el) return;

  const url = `https://api.api-ninjas.com/v1/worldtime?timezone=${tz}`;
  try {
    const response = await fetch(url, {
      headers: { 'X-Api-Key': 'nAB3Cr0QP9VLi6JIgX5juA==UERfDWr6xOf3fZvY' } //Mein API Key
    });
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

    const data = await response.json();
    // Beispielantwort enthält {datetime: "2025-06-20 17:45:12", date: "...", time: "...", timezone: ... }

    el.textContent = `Zeit in ${tz.split('/')[1]}: ${data.datetime}`;
  } catch (e) {
    console.error("Fehler beim Laden der Zeit:", e);
    el.textContent = "Zeit konnte nicht geladen werden.";
  }
}



// ==========================
// NAVIGATION: Aktiver Link markieren
// ==========================
function markActiveNavigation() {
  const currentPath = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ==========================
// PDF GENERIERUNG (Lebenslauf)
// ==========================
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

// ==========================
// SLIDESHOW
// ==========================
function initSlideShow() {
  let slideIndex = 1;
  showSlides(slideIndex);

  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  function showSlides(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
  }
}

// ==========================
// DATEIUPLOAD (Kontaktformular)
// ==========================
function initFileUpload() {
  const fileInput = document.getElementById("datei");
  const fileName = document.getElementById("file-name");

  if (!fileInput || !fileName) return;

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      fileName.textContent = file.name;

      if (file.type !== "application/pdf") {
        alert("Nur PDF-Dateien erlaubt.");
        fileInput.value = "";
        fileName.textContent = "Keine gültige Datei";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Die Datei ist zu groß.");
        fileInput.value = "";
        fileName.textContent = "Datei zu groß";
      }
    } else {
      fileName.textContent = "Keine Datei ausgewählt";
    }
  });
}

// ==========================
// QR-CODES GENERIEREN
// ==========================
function generateQRCodes() {
  const emailQR = document.getElementById("emailQR");
  const phoneQR = document.getElementById("phoneQR");

  if (emailQR) {
    new QRCode(emailQR, {
      text: "mailto:anna.bacanau@gmail.com",
      width: 150,
      height: 150,
    });
  }

  if (phoneQR) {
    new QRCode(phoneQR, {
      text: "tel:+436801516688",
      width: 150,
      height: 150,
    });
  }
}




