import { createContext, useContext, useEffect, useState } from 'react';


export default function useNavigatorLocation() {
    const [latitude, setLatitude] = useState(34.0723642);
    const [longitude, setLongitude] = useState(-117.6316661);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
  } else {
    console.error('Geolocation is not supported by your browser.');
  }
    return {
      latitude,
      longitude
    };
  }
  
  const UseLocationContext = createContext({
    latitude: null,
    longitude: null
  });
  
  export function UseLocationProvider({ children }) {
    const useLocationValue = useNavigatorLocation();
    return <UseLocationContext.Provider value={useLocationValue}>{children}</UseLocationContext.Provider>;
  }

  export const useLocation = () => useContext(UseLocationContext);