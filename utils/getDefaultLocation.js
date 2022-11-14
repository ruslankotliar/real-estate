import Geocode from 'react-geocode';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export function getDefaultLocation({ coords }, setLocation) {
  const { latitude, longitude } = coords;
  Geocode.setApiKey(apiKey);
  // Enable or disable logs. Its optional.
  Geocode.enableDebug();
  // Get formatted address, city, state, country from latitude & longitude when
  Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      let city, state, country;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case 'locality':
              city = response.results[0].address_components[i].long_name;
              break;
            case 'administrative_area_level_1':
              state = response.results[0].address_components[i].long_name;
              break;
            case 'country':
              country = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }
      const location = `${city}, ${country}`;
      // console.log(city, state, country);
      setLocation(location);
      // console.log(address);
    },
    (error) => {
      console.error(error);
    }
  );
}
