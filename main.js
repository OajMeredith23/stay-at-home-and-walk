import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC49wXZ7EiemTdPC70abLojHd0UQdpFwZ4",
    authDomain: "stay-at-home-16eaa.firebaseapp.com",
    projectId: "stay-at-home-16eaa",
    storageBucket: "stay-at-home-16eaa.appspot.com",
    messagingSenderId: "492732871360",
    appId: "1:492732871360:web:42340dfebc53666e863325"
};
firebase.initializeApp(firebaseConfig);


var x = document.getElementById("demo");
var coords = [];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
        console.log('yes')
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        console.log('no')
    }
}

function showPosition(position) {

    if (coords.length > 0 && coords[coords.length - 1].lat === position.coords.latitude) return;
    console.log(position)

    coords.push({
        lat: position.coords.latitude,
        long: position.coords.longitude
    })
    x.innerHTML = coords.map(loc => `<p>Lat: ${loc.lat}, Long:${loc.long}</p>`).join(' ')

}