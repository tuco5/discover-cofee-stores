import { useContext, useState } from 'react';
import { ACTION_TYPES, StoreContext } from '../context/store-context';

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const latitud = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitud},${longitude}` },
    });
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
  return { handleTrackLocation, locationErrorMsg, isFindingLocation };
};

export default useTrackLocation;
