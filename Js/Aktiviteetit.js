'use strict';

//Luodaan kartta
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ';
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

//Muuttujat käyttäjän sijainnille
let kayttajanLat;
let kayttajanLon;
let kayttajanSijainti;


//Navigointi valittuun kohteeseen
function navigointi(e) {
  L.Routing.control({
    waypoints: [
      L.latLng(kayttajanLat, kayttajanLon),
      L.latLng(60.17067, 24.94149),
    ],
    routeWhileDragging: false,
  }).addTo(mymap);
}


//Kun karttaa klikataan
function onMapClick(e) {
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


//Käyttäjän paikannus
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

    //Luodaan ikoni käyttäjän sijainnille
    const ikoni = L.icon({
      iconUrl: '../Pictures/bird.png',
      //shadowUrl: 'leaf-shadow.png',
      iconSize: [28, 40], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      //iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      //popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    //Lisätään ikoni kartalle
    kayttajanSijainti = L.marker([crd.latitude, crd.longitude],
        {icon: ikoni}).
        addTo(mymap).
        bindPopup(
            'Täällä ollaan' + '<br>' +
            '<img src="http://placekitten.com/200/300">',
        );

    //Asetetaan käyttäjän koordinaatit
    kayttajanSijainti.setLatLng([crd.latitude, crd.longitude]);
    mymap.setView([crd.latitude, crd.longitude], 13);

  }

  //Jos käyttäjän paikantamisessa tapahtuu virhe
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

}

//Ladataan sivu uudelleen
function clearaus(evt) {
  window.location.reload();
}


//Etsitään aktiviteetit
function etsiAktiviteetit(evt) {
  //Paikallistetaan ensin käyttäjä
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

  //Luodaan elementit haulla löytyneille tiedoille
  function naytaTiedot(vastaus) {
    console.log(vastaus);
    if (vastaus.data.length > 0) {
      const body = document.querySelector('body');
      const osumat = document.createElement('p');
      const a = document.createElement('hr');
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


        //Luodaan löytyneille aktiviteeteille ikoni
        const ikoni = L.icon({
          iconUrl: '../Pictures/bluemarker.png',
          //shadowUrl: 'leaf-shadow.png',
          iconSize: [28, 40], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          //iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          //popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
        });

        //Lisätään merkki karttaan jokaiselle löytyneelle kohteelle
        const merkki = L.marker([lat, lon], {icon: ikoni}).
            addTo(mymap).
            bindPopup(vastaus.data[i].name.fi + '<br>' +
                vastaus.data[i].location.address.street_address + '<br>' +
                '<a href="' + vastaus.data[i].info_url +
                '">Web-sivut</a>'
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

        console.log('Where and when: ' +
            vastaus.data[i].where_when_duration.where_and_when);
        if (vastaus.data[i].where_when_duration.where_and_when !== null ||
            vastaus.data[i].where_when_duration.where_and_when !== undefined) {
          missa.innerHTML = 'Missä järjestetään: ' +
              vastaus.data[i].where_when_duration.where_and_when + '<br><br>' +
              'Kesto: ' + vastaus.data[i].where_when_duration.duration;

          missa.className = 'missa';
        }

        div.appendChild(nimi);
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

        }

        //Luodaan nappula kohteeseen navigointia varten, (jostain syystä ei aina toimi.....) Edgellä pitäisi toimia
        const painike = document.createElement('button');
        painike.className = 'navPainike';
        painike.textContent = "Navigoi kohteeseen";
        painike.addEventListener('click', (e) => {
          document.documentElement.scrollTop = 175;
          L.Routing.control({
            waypoints: [
              L.latLng(kayttajanLat, kayttajanLon),
              L.latLng(lat, lon),
            ],
            routeWhileDragging: false,
          }).addTo(mymap);
        });

        div.appendChild(painike);
        body.appendChild(div);
      }

      //Jos osumia haulle ei löydy
    } else {
      const eiTuloksia = document.createElement('p');
      eiTuloksia.innerHTML = 'Ei tuloksia';
      eiTuloksia.className = 'tulokset';
      document.querySelector('body').appendChild(eiTuloksia);
    }
  }

  mymap.setView([60.20315, 24.94034], 12);
}


kayttajanPaikannus();











