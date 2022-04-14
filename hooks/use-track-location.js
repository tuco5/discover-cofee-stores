import { useState } from 'react';

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [latLong, setLatLong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;

    setLatLong(`${latitud},${longitud}`);
    setLocationErrorMsg('');
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg('Unable to retrieve your location');
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLocationErrorMsg = 'Geolocation is not supported by your browser.';
      setIsFindingLocation(false);
    }
  };
  return { latLong, handleTrackLocation, locationErrorMsg, isFindingLocation };
};

export default useTrackLocation;
