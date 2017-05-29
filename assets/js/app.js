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
        //disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        //mapTypeId: google.maps.MapTypeId.ROADMAP, //Es  el tipo de mapa po default
        mapTypeControl: true,   
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_CENTER,
            //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            //style: google.maps.MapTypeControlStyle.DEFAULT,
            //mapTypeIds: ['roadmap', 'terrain']
          },
         fullscreenControl: true, 
      }
  //Creamos el mapa     
      var mapa = new google.maps.Map(contenedorMapa,mapOptions);
      //Adjuntamos al mapa las siguientes caracteriristicas
      directionsDisplay.setMap(mapa);
      directionsDisplay.setPanel(document.getElementById("right-panel"));
 /*     
 //Autocompletamos las direcciones de Inicio y fin
      var puntoInicio = document.getElementById("punto-partida");
      var puntoLLegada = document.getElementById("punto-llegada")
          new google.maps.places.Autocomplete(puntoInicio);
          new google.maps.places.Autocomplete(puntoLLegada);
*/

//Autocompletamos las direcciones de Inicio y fin
 var puntos = document.querySelectorAll("input[id*='punto-']");
 var geocoder = new google.maps.Geocoder();
 var lista = [...puntos];
    console.log(lista);           
    for (i in lista){
         new google.maps.places.Autocomplete(lista[i]);
       }



  //Opteniendo las coordenads de cada punto 


  //Evento que traza la ruta y obtiene información de lo ruta,
       var btn_ruta = document.getElementById("trazar-ruta");
          btn_ruta.addEventListener("click", trazarRuta);   

     function trazarRuta(){
            
        var selectTravelMode = document.getElementById("travelMode").value;  
            console.log(selectTravelMode);

        var request = {
                origin:lista[0].value,
                destination:lista[1].value,
                travelMode:selectTravelMode,
                //travelMode:google.maps.TravelMode[selectTravelMode],
              }   

            function callback(result,status){
                  if(status=="OK"){
                    directionsDisplay.setDirections(result);
                      var distancia = (result.routes[0].legs[0].distance.value)/1000;
                      var costo = distancia*1.75;
                      console.log(costo);

                      var elementoControl = document.getElementsByClassName("control")[0];
                           elementoControl.classList.remove("none");

               
                      var nodoTextControl = document.createTextNode("La distancia es : " + distancia + " Y el costo es: "  + costo); 
                     
                            
                           elementoControl.appendChild(nodoTextControl); 
                                

                    }

                     else {
                        window.alert("No encontramos la ruta");   
                      }

              }


            var direccionPartida = {
              address:lista[0].value,
            }    
           
            var direccionLLegada = {
              address:lista[1].value,
            }    
            
             var arr =[];     

            function callbackGeo(result,status){
                if(status=="OK"){
                  arr.push(result[0].geometry.location.toString().trim().replace("(","").replace(")","").trim())
                  console.log(arr);
                  }
              

                }

            


          directionsService.route(request, callback);
          geocoder.geocode(direccionPartida,callbackGeo);
          geocoder.geocode(direccionLLegada,callbackGeo);
      }     
    





}

/*
   mapa.addListener("click", function(event){
        console.log(event);
      var coordenadas = event.latLng.toString().trim();
          coordenadas = coordenadas.replace("(", "");
          coordenadas = coordenadas.replace(")",""); 
      var lista = coordenadas.split(",");
      var direccion = new google.maps.LatLng(lista[0], lista[1]);    
      var marcador = new google.maps.Marker({
        titulo:prompt("Ingresa un titulo para el mark"),
        position:direccion, //La posicion del nuevo marcador 
        map: mapa, //En que mapa se ubicará el marcador 
        animation:google.maps.Animation.DROP, //como aparecerá el marcador
        draggable:false //No permite el arrastre del marcador 
        });        
      marcador.addListener("click", function(event){
        alert(marcador.titulo);
      })  
    //Ubicar el marcador en el mapa
    marcador.setMap(mapa);
  })

//Autocompletado de las direcciones 
 var puntos = document.querySelectorAll("input[id*='punto-']");
 var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));

    //var listaPuntos = [...puntos]; 
     var listaPuntos = Array.prototype.slice.call(puntos); 
    console.log(Array.isArray(listaPuntos));
    var options = {bounds: defaultBounds,
                    types: ['establishment']
                    };

    for (i in listaPuntos){
         new google.maps.places.Autocomplete(listaPuntos[i],options);
      }  

 //Objeto que me va a permitir tomar los datos de soicitud
 var directionsService = new google.maps.DirectionsService;

          //Inicio de la solicitud dirigida al servicio de direcciones y se la pasa un literal
          // de directionRequuest
          //
      directionsService.route(
            //Esto es un literal de DirectionRequest
            //Literal de objeto DirectionRequest (direccion solicitada)
          {origin: listaPuntos[0].value,
            destination: listaPuntos[1].value,
            travelMode:'DRIVING'},

          //Funcion de callback que contiene el status ("OK", "NO_FOUND", "ZERO_RESULTS",
          //"MAX_WAYPOINTS_EXCEEDED", "INVALID_REQUEST", "OVER_QUERY_LIMIT", "REQUEST_DENIED", 
          //"UNKNOWN_ERROR")    
          function(directionsStatus, directionsResult)        




 }


       
*/