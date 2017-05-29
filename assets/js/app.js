function initMap() {
    //console.log(google.maps.version);
      var contenedorMapa = document.getElementById("map");
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var geocoder = new google.maps.Geocoder();
      var lima = {lat:-12.1191427, lng:-77.0349046};
      var mapOptions = {
        zoom:18, // 1, 5, 10,15,20
        center:lima,
        disableDefaultUI:true,
    }

  //Creamos el mapa     
      var mapa = new google.maps.Map(contenedorMapa,mapOptions);
      //Adjuntamos al mapa las siguientes caracteriristicas
      directionsDisplay.setMap(mapa);
      //directionsDisplay.setPanel(document.getElementById("right-panel"));

   //LLamamos al evento del window para que el mapa nos pueda ubicar
    window.addEventListener("load", function(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoords, errorFound);} 
        else {
            alert("Tu navegador no soporta Geolocation");
          }
      });
     //variables globales de latitud y longitud de mi ubicacion  
      var lat, lon;  
      
      function errorFound(error) {
        alert("Un error ocurrió: " + error.code);
      };

     function getCoords(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    
       var miUbicacion = new google.maps.Marker({
              position : {lat:lat, lng:lon},
              map:mapa
         });
        //Al mapa creado le agrego mi ubicación
        mapa.setCenter({lat:lat, lng:lon})  
      }  

  //Autocompletamos las direcciones de Inicio y fin
    var puntos = document.querySelectorAll("input[id*='punto-']");
    var lista = [...puntos];
      for (i in lista){
         new google.maps.places.Autocomplete(lista[i]);
       }

//Evento que traza la ruta y obtiene información de lo ruta,
       var btn_ruta = document.getElementById("trazar-ruta");
           btn_ruta.addEventListener("click", trazarRuta);   

         function trazarRuta(){

            var request = {
              origin:lista[0].value,
              destination:lista[1].value,
              travelMode:"DRIVING",
            } 

          function callback(result,status){
            if(status=="OK"){
                directionsDisplay.setDirections(result);
                      var distancia = (result.routes[0].legs[0].distance.value)/1000;
                      var costo = Math.round(distancia*1.75);
                          console.log(costo);
                      var nodoTextControl = document.createTextNode("S/." + costo); 
                        document.getElementById("costo").appendChild(nodoTextControl);
                    }else {
                        window.alert("No encontramos la ruta");   
                      }
              }
              
            directionsService.route(request, callback);
          }
  }     
    






