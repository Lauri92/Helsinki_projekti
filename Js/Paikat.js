'use strict';

const apiUrl2 = 'https://cors-anywhere.herokuapp.com/http://open-api.myhelsinki.fi/v1/places/?tags_search=';

const nappi2 = document.getElementById('nappi2');
nappi2.addEventListener('click', etsiEventit);

function etsiEventit(evt) {
  navigator.geolocation.getCurrentPosition(success);

  function success(pos) {
    const crd = pos.coords;
    kayttajanLon = crd.longitude;
    kayttajanLat = crd.latitude;
  }

  const teksti = document.getElementById('teksti').value;

  fetch(apiUrl2 +
      teksti.charAt(0).toUpperCase() + teksti.slice(1))                                                // Käynnistetään haku. Vakiometodi on GET.
      .then(function(vastaus) {                   // Sitten kun haku on valmis,
        return vastaus.json();                              // muutetaan ladattu tekstimuotoinen JSON JavaScript-olioksi
      }).then(function(json) {                              // Sitten otetaan ladattu data vastaan ja
    naytaPaikat(json);                                      // kutsutaan naytaPaikat-funktiota ja lähetetään ladattu data siihen parametrinä.
  }).catch(function(error) {                                // Jos tapahtuu virhe,
    console.log(error);                                     // kirjoitetaan virhe konsoliin.
  });

  function naytaPaikat(vastaus) {
    console.log(vastaus);
    if (vastaus.data.length > 0) {
      const body = document.querySelector('body');
      const osumat = document.createElement('p');
      osumat.className = 'tulokset';
      osumat.innerHTML = 'Hakusanalla löytyi ' + vastaus.meta.count +
          ' paikkaa.';
      body.appendChild(osumat);
      console.log('data.length' + vastaus.data.length);
      for (let i = 0; i < vastaus.data.length; i++) {
        const div = document.createElement('div');
        const nimi = document.createElement('p');
        const osoite = document.createElement('p');
        const linkki = document.createElement('p');
        const selostus = document.createElement('p');
        const missa = document.createElement('p');

        const lat = vastaus.data[i].location.lat;
        const lon = vastaus.data[i].location.lon;

        console.log(vastaus.data[i].location.lat);
        console.log(vastaus.data[i].location.lon);
        console.log(vastaus.data[i].location.address.street_address);
        console.log(vastaus.data[i].name.fi);

        const ikoni = L.icon({
          iconUrl: '../Pictures/redmarker.png',
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

        body.appendChild(div);
        div.appendChild(nimi);
        div.appendChild(selostus);
        div.appendChild(missa);
        div.appendChild(osoite);
        div.appendChild(linkki);


        console.log(
            'Kuvien määrä: ' + vastaus.data[i].description.images.length);

        for (let j = 0; j < vastaus.data[i].description.images.length; j++) {
          let image = document.createElement('img');
          image.className = 'kuva';
          image.setAttribute('src', vastaus.data[i].description.images[j].url);
          body.appendChild(image);
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











