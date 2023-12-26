import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Trình duyệt của bạn không hỗ trợ định vị người dùng.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Hiển thị vị trí trên bản đồ
    alert(latitude+ " lat/lon" + longitude);
}

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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent onClick={getLocation} fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
