$(document).ready(function() {

  // Al caricamento della pagina, inizializzo la variabile genre col valore ALL
  var genre = "all";
  // Ed eseguo la chiamata ajax per caricare il contenuto
  ajaxCallCd();

  // EVENTO CHANGE del campo select
  $("#genre-select").change(function() {
    // Ad ogni cambio di #genre-select, salvo il nuovo genere selezionato
    genre = $(this).val();
    // e richiamo la funzione di chiamata ajax
    ajaxCallCd();
  });

  // FUNZIONE CHIAMATA AJAX
  function ajaxCallCd() {
    $(".cds-container.container").empty();
    // Effettuo la chiamata ajax verso l'api:
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/array/music",
      method: "GET",
      success: function (data, stato) {
        // Salvo l'oggetto risposta in una variabile
        var response = data.response;
        // Eseguo la funzione render passando come argomento la risposta ottenuta
        render(response);
        },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
        }
    });
  }

  // FUNZIONE RENDER
  // Dichiaro la funzione render(), con argomento una risposta ricevuta dall'api
  function render(response) {

    // Nella funzione, salvo e compilo il template di Handlebars che voglio utilizzare
    var source = $("#disc-template").html();
    var template = Handlebars.compile(source);

    // Per ogni oggetto contenuto nell'array response,
    for (var i = 0; i < response.length; i++) {
      var albumGenre = response[i].genre.toLowerCase();
      // Se il genere dell'album corrisponde al genere selezionato OPPURE se il genere selezionato è ALL
      if ((albumGenre == genre) || genre == "all") {
        // compilo il template Handlebars passando l'oggetto stesso (perché i placeholder e le chiavi corrispondono)
        var html = template(response[i]);
        // e faccio l'append del template compilato nel container dei cd nell'html
        $(".cds-container.container").append(html);
      }
    }
    
  }

});
