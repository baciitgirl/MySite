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





