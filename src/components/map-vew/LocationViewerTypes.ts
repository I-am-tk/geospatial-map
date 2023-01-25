export interface LatLongObj {
  lat: number
  long: number
}

export interface CoordingateObj extends LatLongObj {
  label: string
} 

export interface CoordingateDistanceObj extends CoordingateObj {
  distance: number
}

export type CoordinatesArray = Array<CoordingateObj>
export type CoordinatesDistanceArray = Array<CoordingateDistanceObj>

interface LocationViewerProps {
  baseLocation: CoordingateObj;
  otherLocationCoordinates: CoordinatesArray;
}