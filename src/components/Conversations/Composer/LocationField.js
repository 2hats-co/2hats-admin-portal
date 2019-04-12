import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import IntegrationReactSelect from '../../IntegrationReactSelect';

const LocationSearchInput = props => {
  const { changeHandler } = props;
  const [address, setAddress] = useState('');
  const handleChange = address => {
    console.log(address);
    changeHandler(address.value);
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const searchOptions = {
    location: { lat: () => -34, lng: () => 151 },
    radius: 2000,
    types: ['address'],
  };

  return (
    <PlacesAutocomplete
      searchOptions={searchOptions}
      value={address}
      onChange={handleChange}
      //onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <IntegrationReactSelect
            inputProps={getInputProps({
              placeholder: 'Search Places ...',
              //className: 'location-search-input',
            })}
            placeholder="Address"
            autoFocus
            changeHandler={handleChange}
            suggestions={suggestions.map(suggestion => ({
              label: suggestion.description,
              value: suggestion.description,
            }))}
          />
        );
      }}
      {/* {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
