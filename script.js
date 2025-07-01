// ==========================
// HEADER dynamisch laden
// ==========================

document.addEventListener("DOMContentLoaded", function () {
  // Diese Funktion wird ausgeführt, sobald das DOM vollständig geladen ist

  // ----------------------------------------
  // HEADER LADEN
  // ----------------------------------------

  // Ruft den Inhalt der Datei "header.html" über Fetch API ab
  fetch("header.html")
    .then(response => {
      // Überprüft, ob der HTTP-Status erfolgreich ist (Status 200–299)
      if (!response.ok) {
        // Falls nicht, wirft einen Fehler mit Statusmeldung
        throw new Error("Netzwerkfehler: " + response.statusText);
      }
      // Gibt den Antworttext (HTML-Inhalt) zurück
      return response.text();
    })
    .then(data => {
      // Fügt den geladenen HTML-Inhalt in das Element mit der ID "header-placeholder" ein
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(error => {
      // Gibt einen Fehler in der Konsole aus, falls das Laden des Headers fehlschlägt
      console.error("Fehler beim Laden des Headers:", error);
    });

  // ----------------------------------------
  // FOOTER ERZEUGEN UND ANS DOKUMENT ANHÄNGEN
  // ----------------------------------------

  // Erstellt ein neues <footer>-Element
  const footer = document.createElement("footer");

  // Definiert den HTML-Inhalt für den Footer (Copyright, Kontakt)
  footer.innerHTML = `
    <p>&copy; 2025 Anna Bacanau. Alle Rechte vorbehalten.</p>
    <p>
      📞 <a href="tel:+436801516688">+43 680 151 66 88</a><br />
      ✉️ <a href="mailto:anna.bacanau@gmail.com">anna.bacanau@gmail.com</a>
    </p>`;

  // Hängt den Footer ans Ende des <body>-Elements
  document.body.appendChild(footer);


/*** 
 * Die "kleinen" Funktionen werden hier aufgerufen:
 * Diese Funktionen sorgen für zusätzliche interaktive oder dynamische Features 
 * der Seite, je nachdem ob die entsprechenden Elemente vorhanden sind.
 ***/

  // Lädt ein motivierendes Zitat für Entwickler (meist über eine externe API)
  loadDeveloperQuote();

  // Markiert das aktuelle Navigationsmenüelement als aktiv (z. B. durch CSS-Klasse)
  markActiveNavigation();

  // Startet die Slideshow (nur wenn ein Slideshow-Container auf der Seite vorhanden ist)
  initSlideShow();

  // Initialisiert die Datei-Upload-Funktionalität (nur wenn ein entsprechendes <input> vorhanden ist)
  initFileUpload();

  // Generiert QR-Codes für spezielle Elemente (z. B. Links oder Texte mit Attributen)
  generateQRCodes();

});

// ========================== FUNKTIONEN NACH DEM ZWECK:
// API-ZITAT LADEN
// ==========================

/** 
 * Lädt ein zufälliges, inspirierendes Zitat zum Thema Technologie.
 * Variante 1: Echtzeit-Abruf über eine öffentliche API (Quotable.io)
 * Hinweis: Funktioniert nur bei aktiver Internetverbindung und wenn CORS erlaubt ist.
 */
async function loadDeveloperQuote() {
  // Holt das HTML-Element, in dem das Zitat angezeigt werden soll
  const quoteElement = document.getElementById("dev-quote");

  try {
    // Anfrage an die API senden (mit Filter für "technology"-Zitate)
    const response = await fetch("https://api.quotable.io/random?tags=technology");

    // Falls die Antwort fehlschlägt, wird ein Fehler ausgelöst
    if (!response.ok) throw new Error(`Fehler: ${response.status}`);

    // Die Antwort als JSON interpretieren
    const data = await response.json();

    // Wenn das Element vorhanden ist, wird das Zitat eingefügt
    if (quoteElement) {
      quoteElement.innerHTML = `
        <p>"${data.content}"</p>
        <cite>— ${data.author}</cite>`;
    }
  } catch (error) {
    // Fehlerbehandlung: Fehlermeldung in Konsole und Fallback-Text anzeigen
    console.error("Zitat-Laden fehlgeschlagen:", error);
    if (quoteElement) {
      quoteElement.innerHTML = "<p><em>Zitat konnte nicht geladen werden.</em></p>";
    }
  }
}

// Event-Listener registrieren, damit das Zitat nach dem DOM-Laden eingefügt wird
document.addEventListener("DOMContentLoaded", loadDeveloperQuote);


/** 
 * Alternative Lösung:
 * Lädt ein Entwickler-Zitat lokal aus einem vordefinierten Array (Offline-Variante)
 * Vorteil: Kein Netzwerk nötig, läuft zuverlässig offline
 */

// Sammlung von inspirierenden Entwickler-Zitaten
const quotes = [
  { content: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { content: "Programs must be written for people to read.", author: "Harold Abelson" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
];

function loadDeveloperQuote() {
  const quoteElement = document.getElementById("dev-quote");

  // Zufälliges Zitat aus dem Array auswählen
  const random = quotes[Math.floor(Math.random() * quotes.length)];

  // Wenn das Element existiert, das Zitat einfügen
  if (quoteElement) {
    quoteElement.innerHTML = `<p>"${random.content}"</p><cite>— ${random.author}</cite>`;
  }
}

// Auch hier sicherstellen, dass die Funktion erst nach dem DOM-Aufbau aufgerufen wird
document.addEventListener("DOMContentLoaded", loadDeveloperQuote);

// ==========================
// ZEIT IN WIEN
// ==========================

/**
 * Ruft die aktuelle Zeit in Wien (oder einer anderen Stadt) ab und zeigt sie im Ziel-Element an.
 * Nutzt die World Time API von API-Ninjas.
 */
document.addEventListener("DOMContentLoaded", () => {
  loadWorldTime("Europe/Vienna", "vienna-time"); // Ziel-Element muss existieren
  // Weitere Städte? Füge hier weitere Funktionsaufrufe mit passender Zeitzone ein.
});

/**
 * Holt aktuelle Zeit via World Time API und zeigt sie im angegebenen Element an.
 *
 * @param {string} tz - IANA-Zeitzone, z. B. "Europe/Vienna"
 * @param {string} elemId - ID des HTML-Elements zur Anzeige
 */
async function loadWorldTime(tz, elemId) {
  const el = document.getElementById(elemId);
  if (!el) return; // Abbrechen, wenn Ziel-Element nicht existiert

  const url = `https://api.api-ninjas.com/v1/worldtime?timezone=${tz}`;
  try {
    const response = await fetch(url, {
      headers: { 'X-Api-Key': 'nAB3Cr0QP9VLi6JIgX5juA==UERfDWr6xOf3fZvY' } // Eigener API-Key
    });
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

    const data = await response.json();
    // Antwort enthält z. B. data.datetime: "2025-06-20 17:45:12"
    el.textContent = `Zeit in ${tz.split('/')[1]}: ${data.datetime}`;
  } catch (e) {
    console.error("Fehler beim Laden der Zeit:", e);
    el.textContent = "Zeit konnte nicht geladen werden.";
  }
}


// ==========================
// NAVIGATION: Aktiver Link markieren
// ==========================

/**
 * Vergleicht die aktuelle Seiten-URL mit den href-Werten aller Links
 * und fügt der übereinstimmenden Navigation den Stil „active“ hinzu.
 */
function markActiveNavigation() {
  const currentPath = window.location.pathname.split("/").pop(); // aktuelle Datei extrahieren
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}


// ==========================
// GIT (projekte.html)
// ==========================

/**
 * Lädt öffentliche Repositories des Users "baciitgirl" über die GitHub-API
 * und gibt sie in der Konsole aus.
 * (Hinweis: Darstellung im HTML ist als TODO markiert)
 */
// Hinweis: Kein Token nötig für öffentliche Repos

fetch("https://api.github.com/users/baciitgirl/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fehler beim Abrufen: ${response.status} ${response.statusText}`);
    }
    return response.json(); // Antwort in JSON umwandeln
  })
  .then((data) => {
    // Datenverarbeitung der erhaltenen Repos
    console.log("Public Repositories:", data);
    // TODO: Ausgabe ins HTML (z. B. mit createElement oder innerHTML)
  })
  .catch((error) => {
    // Fehlerbehandlung bei API-Problemen oder fehlender Verbindung
    console.error("Fehler mit API:", error);
  });


// ==========================
// PDF GENERIERUNG (cv.html)
// ==========================

/**
 * Erstellt ein PDF-Dokument aus dem Lebenslauf-Bereich („lebenslauf-inhalt“)
 * mit Hilfe von html2pdf.js (muss eingebunden sein)
 */
function generatePDF() {
  const element = document.getElementById('lebenslauf-inhalt'); // Ziel-Bereich für PDF
  const options = {
    margin: 0.3, // kompakter Seitenrand
    filename: 'lebenslauf-anna-bacanau.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3, scrollY: 0 }, // für hohe Auflösung, ohne Scrollversatz
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // bricht Seiten sinnvoll um
  };
  html2pdf().set(options).from(element).save(); // PDF erzeugen und automatisch herunterladen
}


// ==========================
// SLIDESHOW
// ==========================

/**
 * Initialisiert eine einfache manuelle Slideshow (z. B. für Bilderkarussell).
 * Es wird jeweils ein Slide angezeigt, andere ausgeblendet.
 */
function initSlideShow() {
  let slideIndex = 1;
  showSlides(slideIndex); // Start mit dem ersten Slide

  // Globale Funktion, um die Slides durch Navigation zu ändern (z. B. „vor“/„zurück“-Buttons)
  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  /**
   * Blendet alle Slides aus und zeigt nur den aktuellen (slideIndex)
   */
  function showSlides(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return; // Wenn keine Slides vorhanden, abbrechen

    // Zyklische Navigation: zurück zum Anfang oder zum letzten Slide
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // Alle Slides ausblenden
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Aktuellen Slide einblenden
    slides[slideIndex - 1].style.display = "block";
  }
}

// Initialisiert die Slideshow nach DOM-Ladung (wenn Slides vorhanden sind)
document.addEventListener("DOMContentLoaded", function () {
  initSlideShow();
});


// ==========================
// DATEIUPLOAD (Kontaktformular)
// ==========================

/**
 * Initialisiert die Upload-Funktion im Kontaktformular:
 * Zeigt Dateinamen an und prüft, ob es sich um eine gültige PDF-Datei handelt.
 * Unterstützt Größen- und Formatprüfung.
 */
function initFileUpload() {
  const fileInput = document.getElementById("datei");
  const fileName = document.getElementById("file-name");

  if (!fileInput || !fileName) return; // Falls Felder nicht vorhanden, abbrechen

  // Reagiert auf Auswahl einer Datei
  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      fileName.textContent = file.name;

      // Nur PDF-Dateien erlauben
      if (file.type !== "application/pdf") {
        alert("Nur PDF-Dateien erlaubt.");
        fileInput.value = "";
        fileName.textContent = "Keine gültige Datei";
        return;
      }

      // Max. 5 MB Dateigröße
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

/**
 * Erzeugt QR-Codes für E-Mail und Telefonnummer (wenn entsprechende Container vorhanden).
 * Verwendet eine externe Bibliothek wie `QRCode.js`.
 */
function generateQRCodes() {
  const emailQR = document.getElementById("emailQR");
  const phoneQR = document.getElementById("phoneQR");

  // QR-Code für E-Mail
  if (emailQR) {
    new QRCode(emailQR, {
      text: "mailto:anna.bacanau@gmail.com",
      width: 150,
      height: 150,
    });
  }

  // QR-Code für Telefonnummer
  if (phoneQR) {
    new QRCode(phoneQR, {
      text: "tel:+436801516688",
      width: 150,
      height: 150,
    });
  }
}





