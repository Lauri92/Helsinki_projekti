'use strict';


const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ';
//const kirkkoattribution = '&copy; <a href="https://pixabay.com/fi/users/tap5a-12431592/">Pixabay</a> contributors ';

const mymap = L.map('kartta').setView([60.20315, 24.94034], 12);

const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

const apiUrl = 'https://cors-anywhere.herokuapp.com/http://open-api.myhelsinki.fi/v1/activities/?tags_search=';

document.querySelector('#teksti').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    // code for enter
    etsiAktiviteetit();
  }
});

const nappi = document.getElementById('nappi');
nappi.addEventListener('click', etsiAktiviteetit);
const nappi4 = document.getElementById('nappi4');
nappi4.addEventListener('click', clearaus);
const nappi5 = document.getElementById('nappi5');
nappi5.addEventListener('click', kayttajanPaikannus);
const nappi6 = document.getElementById('nappi6');
nappi6.addEventListener('click', navigointi);

let kayttajanLat;
let kayttajanLon;
let kayttajanSijainti;

function navigointi(e) {
  const painettu = document.getElementsByClassName('lisattypop');

  L.Routing.control({
    waypoints: [
      L.latLng(kayttajanLat, kayttajanLon),
      L.latLng(60.16941, 24.92589),
    ],
    routeWhileDragging: true,
  }).addTo(mymap);
}

function asetaLon(pos) {
  console.log('Nappi 4: Testataanpas lon: ' + kayttajanLon + '<br>' +
      'Testataanpas lat: ' + kayttajanLat);
}

function onMapClick(e) {
  //alert("You clicked the map at " + e.latlng);
  console.log(e.latlng);
  const popup = L.popup().
      setLatLng(e.latlng).
      setContent('Clicked' + e.latlng.toString()).
      openOn(mymap);
}

mymap.on('click', onMapClick);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function kayttajanPaikannus(evt) {

  navigator.geolocation.getCurrentPosition(success, error, options);

  // Funktio, joka ajetaan, kun paikkatiedot on haettu
  function success(pos) {
    const crd = pos.coords;
    kayttajanLon = crd.longitude;
    kayttajanLat = crd.latitude;

    // Tulostetaan paikkatiedot konsoliin
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const ikoni = L.icon({
      iconUrl: '../Pictures/bird.png',
      //shadowUrl: 'leaf-shadow.png',
      iconSize: [28, 40], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      //iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      //popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    kayttajanSijainti = L.marker([crd.latitude, crd.longitude],
        {icon: ikoni}).
        addTo(mymap).
        bindPopup(
            'I am here' + '<br>' +
            '<img src="http://placekitten.com/200/300">',
        );

    kayttajanSijainti.setLatLng([crd.latitude, crd.longitude]);
    mymap.setView([crd.latitude, crd.longitude], 13);

  }

  // Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

}

function clearaus(evt) {
  window.location.reload();
}

function etsiAktiviteetit(evt) {
  navigator.geolocation.getCurrentPosition(success);

  function success(pos) {
    const crd = pos.coords;
    kayttajanLon = crd.longitude;
    kayttajanLat = crd.latitude;
  }

  const teksti = document.getElementById('teksti').value;

  fetch(apiUrl +
      teksti.toLowerCase())                                                // Käynnistetään haku. Vakiometodi on GET.
      .then(function(vastaus) {                   // Sitten kun haku on valmis,
        return vastaus.json();                              // muutetaan ladattu tekstimuotoinen JSON JavaScript-olioksi
      }).then(function(json) {                              // Sitten otetaan ladattu data vastaan ja
    naytaTiedot(json);                                      // kutsutaan naytaTiedot-funktiota ja lähetetään ladattu data siihen parametrinä.
  }).catch(function(error) {                                // Jos tapahtuu virhe,
    console.log(error);                                     // kirjoitetaan virhe konsoliin.
  });

  function naytaTiedot(vastaus) {
    console.log(vastaus);
    if (vastaus.data.length > 0) {
      const body = document.querySelector('body');
      const osumat = document.createElement('p');
      const a = document.createElement("hr");
      body.appendChild(a);
      osumat.className = 'tulokset';
      osumat.innerHTML = 'Hakusanalla löytyi ' + vastaus.meta.count +
          ' aktiviteettia.';
      body.appendChild(osumat);
      console.log('data.length' + vastaus.data.length);
      for (let i = 0; i < vastaus.data.length; i++) {
        const div = document.createElement('div');
        const nimi = document.createElement('p');
        const osoite = document.createElement('p');
        const linkki = document.createElement('p');
        //const kuva = document.createElement('img');
        const selostus = document.createElement('p');
        const missa = document.createElement('p');

        const lat = vastaus.data[i].location.lat;
        const lon = vastaus.data[i].location.lon;

        console.log(vastaus.data[i].location.lat);
        console.log(vastaus.data[i].location.lon);
        console.log(vastaus.data[i].location.address.street_address);
        console.log(vastaus.data[i].name.fi);

        const ikoni = L.icon({
          iconUrl: '../Pictures/bluemarker.png',
          //shadowUrl: 'leaf-shadow.png',
          iconSize: [28, 40], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          //iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          //popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
        });

        const merkki = L.marker([lat, lon], {icon: ikoni}).
            addTo(mymap).
            bindPopup(vastaus.data[i].name.fi + '<br>' +
                vastaus.data[i].location.address.street_address + '<br>' +
                '<a href="' + vastaus.data[i].info_url +
                '">Web-sivut</a>' + '<br>' +
                '<button onclick="navigointi(lat)">Navigoi</button>' + '<br>' +
                lat + ' ' + lon,
            );

        div.className = 'infodiv';

        nimi.innerHTML = vastaus.data[i].name.fi;
        nimi.className = 'nimi';

        if (vastaus.data[i].info_url !== null) {
          linkki.innerHTML = '<a href="' + vastaus.data[i].info_url +
              '">Vieraile web sivuilla</a>';
          linkki.className = 'linkki';
        } else {
          linkki.innerHTML = 'No official site';
        }

        if (vastaus.data[i].location.address.street_address !== null) {
          osoite.innerHTML =
              vastaus.data[i].location.address.street_address;
          osoite.className = 'osoite';
        } else {
          linkki.innerHTML = 'No official site';
        }

        if (vastaus.data[i].description.body !== null) {
          selostus.innerHTML =
              vastaus.data[i].description.body;
          selostus.className = 'selostus';
        } else {
          selostus.innerHTML = 'Ei selostusta';
          selostus.className = 'selostus';
        }
        /*console.log(
            'Kuvien määrä: ' + vastaus.data[i].description.images.length);

        if (vastaus.data[i].description.images[i] !== null) {
          kuva.src = vastaus.data[i].description.images[0].url;
          kuva.className = 'kuva';
        }*/

        console.log('Where and when: ' +
            vastaus.data[i].where_when_duration.where_and_when);
        if (vastaus.data[i].where_when_duration.where_and_when !== null ||
            vastaus.data[i].where_when_duration.where_and_when !== undefined) {
          missa.innerHTML = 'Missä järjestetään: ' +
              vastaus.data[i].where_when_duration.where_and_when + '<br><br>' +
              'Kesto: ' + vastaus.data[i].where_when_duration.duration;

          missa.className = 'missa';
        }

        body.appendChild(div);
        div.appendChild(nimi);
        //div.appendChild(kuva);
        div.appendChild(selostus);
        div.appendChild(missa);
        div.appendChild(osoite);
        div.appendChild(linkki);
        console.log('Testataanpas lon: ' + kayttajanLon + '<br>' +
            'Testataanpas lat: ' + kayttajanLat);

        console.log(
            'Kuvien määrä: ' + vastaus.data[i].description.images.length);

        for (let j = 0; j < vastaus.data[i].description.images.length; j++) {
          let image = document.createElement('img');
          image.className = 'kuva';
          image.setAttribute('src', vastaus.data[i].description.images[j].url);
          div.appendChild(image);
          body.appendChild(div);
        }
        // add stuff
        if(i == vastaus.data.length - 1) {}
        else {
          const b = document.createElement("hr");
          document.getElementsByTagName("body")[0].appendChild(b);
        }
      }
    } else {
      const eiTuloksia = document.createElement('p');
      eiTuloksia.innerHTML = 'Ei tuloksia';
      eiTuloksia.className = 'tulokset';
      document.querySelector('body').appendChild(eiTuloksia);
    }
  }
}

/*function navigointi(evt, arg1) {
  console.log('"Navigoi painettu."' + arg1);
  console.log(kayttajanLat, kayttajanLon);

}*/











