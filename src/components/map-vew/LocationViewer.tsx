import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import BaseMarkerIconPng from "../../assets/icons/marker-icon-red.png"
import MarkerIconPng from "../../assets/icons/marker-icon-blue.png"
import { Icon } from 'leaflet'
import { dummyDistanceFindExecution, DUMMY_BASE_CORD } from './LocationViewerUtils';
import {CoordinatesArray} from './LocationViewerTypes';

const LocationViewer = (): JSX.Element => {
  const coordsToShow: CoordinatesArray = dummyDistanceFindExecution();
  return (
    <MapContainer center={[DUMMY_BASE_CORD.lat, DUMMY_BASE_CORD.long]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[DUMMY_BASE_CORD.lat, DUMMY_BASE_CORD.long]} icon={new Icon({ iconUrl: BaseMarkerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
        <Popup>
          {DUMMY_BASE_CORD.label}
        </Popup>
      </Marker>
      {coordsToShow.map(cord => (
        <Marker position={[cord.lat, cord.long]} icon={new Icon({ iconUrl: MarkerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>
            {cord.label}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LocationViewer;
