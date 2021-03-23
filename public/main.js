// import firebase from 'firebase/app'
// import firestore from 'firebase/firestore'

const BTN = document.querySelector('#track');

const firebaseConfig = {
    apiKey: "AIzaSyC49wXZ7EiemTdPC70abLojHd0UQdpFwZ4",
    authDomain: "stay-at-home-16eaa.firebaseapp.com",
    projectId: "stay-at-home-16eaa",
    storageBucket: "stay-at-home-16eaa.appspot.com",
    messagingSenderId: "492732871360",
    appId: "1:492732871360:web:42340dfebc53666e863325"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var x = document.getElementById("demo");
var count = document.getElementById("count");
var coords = [];

function getLocation() {
    console.log("geolocation")

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(recordPosition);
        console.log('yes')
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        console.log('no')
    }

}

let sessionCords = []
function recordPosition(pos) {
    if (pos.length > 0 && coords[coords.length - 1].lat === pos.coords.latitude) return;

    const currPos = {
        time: Date.now(),
        lat: pos.coords.latitude,
        long: pos.coords.longitude
    }
    sessionCords.push(currPos)
    console.log(sessionCords)
    return db.collection('test').add(currPos)
}

(async () => {
    db.collection('test')
        .onSnapshot((querySnapshot) => {
            let data = [];
            querySnapshot.forEach(doc => {
                data.push(doc.data())
                coords.push(data)
                x.innerHTML = data.map(loc => `<p>Lat: ${loc.lat}, Long:${loc.long}</p>`).join(' ')
                count.innerHTML = `Count: ${data.length}`
            })
        })

})();


BTN.addEventListener('click', () => getLocation())