import React, { useState } from 'react';
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomMarker from '../../components/CustomMarker';

import places from '../../../assets/data/feed';
import PostCarouselItem from '../../components/PostCarouselItem';

const SearchResultsMap = () => {
  const [selectedPlaceId, setSelectedPlaceid] = useState(null);

  const width = useWindowDimensions().width;

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 54.8985,
          longitude: 23.9036,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
      >
        {places.map((place) => (
          <CustomMarker
            key={place.id}
            coordinate={place.coordinate}
            price={place.newPrice}
            isSelected={place.id === selectedPlaceId}
            onPress={() => setSelectedPlaceid(place.id)}
          />
        ))}
      </MapView>

      <View style={{ position: 'absolute', bottom: 28 }}>
        <FlatList
          data={places}
          renderItem={({ item }) => <PostCarouselItem post={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={'center'}
          decelerationRate={'fast'}
        />
      </View>
    </View>
  );
};

export default SearchResultsMap;