import {
    setDefaults,
    fromPlaceId,
  } from "react-geocode";
  
  setDefaults({
    key: "AIzaSyDADPU9J-aWvFLdC89ATilYATJaTSZZF4o", // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });


export async function getGeofromPlaceId(placeId) {
    try {
      const result = await fromPlaceId(placeId);
      const { lat, lng } = result.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error('Error:', error);
      return {lat: 0, lng: 0};
    }
  }
  