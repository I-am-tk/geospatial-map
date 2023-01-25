import { LatLongObj, CoordingateDistanceObj, CoordingateObj, CoordinatesArray, CoordinatesDistanceArray } from "./LocationViewerTypes";

export const calculateDistance = (base: LatLongObj, to: LatLongObj, unit?: "KM" | "M") : number => {
  const {lat : lat1, long: long1} = base;
  const {lat : lat2, long: long2} = to;
  if ((lat1 == lat2) && (long1 == long2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = long1-long2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
    const distKM = dist * 1.609344;    
    if(unit === "M") {
      return distKM * 1000;
    }
    return distKM;		
	}
}

export function compareDistance(currElem: CoordingateDistanceObj, nextElem: CoordingateDistanceObj) {
  return currElem.distance - nextElem.distance
}

export const findNearestNCoordinates = (base: LatLongObj, coordinatesArray:CoordinatesArray, n?: number) :CoordinatesArray => {
  if(!n) {
    n = 3;
  }
  if(coordinatesArray.length <= n) {
    return coordinatesArray
  }
  const distanceArr : CoordinatesDistanceArray = []
  for(let i=0; i<coordinatesArray.length; i++) {
    distanceArr.push({
      ...coordinatesArray[i],
      distance: calculateDistance(base, {lat: coordinatesArray[i].lat, long: coordinatesArray[i].long}, "M")
    })
  }  
  const sortedDistanceArr = distanceArr.sort(compareDistance);  
  return sortedDistanceArr.slice(0, n);
}


export const DUMMY_BASE_CORD : CoordingateObj = { lat: 17.447, long: 78.354, label: 'PSR Prime Towers' }
export const DUMMY_CO_ORDS : Record<string, CoordingateObj> = {   
  dellOffice:  { lat: 17.4484, long: 78.3734, label: 'Dell Office' },
  cognizantOffice:  { lat: 17.4473, long: 78.3557, label: 'Cognizant Office' },
  accentureOffice:  { lat: 17.4408, long: 78.3775, label: 'Accenture Office' },
  deloitteOffice:  { lat: 17.4418, long: 78.3971, label: 'Deloitte Office' },
  nvidiaOffice :  { lat: 17.4155, long: 78.3442, label: 'Nvidia Office' },
  wiproOffice :  { lat: 17.4248, long:  78.3421, label: 'Wipro Office' },
  microsoftOffice :  { lat: 17.4279, long: 78.3392, label: 'Microsoft Office' },
  infosysOffice :  { lat: 17.4955, long: 78.4265, label: 'Infosys Office' },
  googleOffice :  { lat: 15.9129, long: 79.74, label: 'Google Office' },
  amazonOffice :  { lat: 17.4204, long: 78.3395, label: 'Amazon Office' }
}


export const dummyDistanceFindExecution = () :CoordinatesArray => {
  const nearestCoords = findNearestNCoordinates(DUMMY_BASE_CORD, Object.values(DUMMY_CO_ORDS), 3)
  return nearestCoords;
}