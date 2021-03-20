import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';

const Map = () => {
  const [coordinations] = useState({
    latitude: -27.210671,
    longitude: -49.63627,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const users = [
    {
      id: 1,
      title: 'Bar do Sivirino',
      description: 'Pinga com cuscuz e tripa',
      latitude: -27.210671,
      longitude: -49.63627,
    },
    {
      id: 2,
      title: 'Lanchonete do Japa',
      description: 'Pastel de flango',
      latitude: -27.200671,
      longitude: -49.63627,
    },
    {
      id: 3,
      title: 'Praça do centro',
      description: 'pracinha nova',
      latitude: -27.200671,
      longitude: -49.62627,
    },
  ];
  let mapRef = useRef();
  const [userSelect, setUserSelect] = useState(0);

  return (
    <View style={styles.container}>
      <MapView
        ref={map => (mapRef = map)}
        style={styles.map}
        initialRegion={{
          latitude: coordinations.latitude,
          longitude: coordinations.longitude,
          latitudeDelta: coordinations.latitudeDelta,
          longitudeDelta: coordinations.longitudeDelta,
        }}>
        <Marker
          title="Italo"
          coordinate={{
            latitude: coordinations.latitude,
            longitude: coordinations.longitude,
            latitudeDelta: coordinations.latitudeDelta,
            longitudeDelta: coordinations.longitudeDelta,
          }}
        />
        {users.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={user.title}
          />
        ))}
      </MapView>

      <Animated.ScrollView
        style={styles.placesContainer}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const scrolled = event.nativeEvent.contentOffset.x;

          const place =
            scrolled > 0 ? scrolled / Dimensions.get('window').width : 0;
          const {latitude, longitude} = users[place];
          setUserSelect(place);
          mapRef.animateCamera({latitude, longitude});
        }}>
        {users.map(user => (
          <View key={user.id} style={styles.place}>
            <Text style={styles.title}>{user.title}</Text>
            <Text style={styles.description}>{user.description}</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Perfil de:', users[userSelect].title, [
                  {
                    label: 'Ok',
                  },
                ])
              }>
              <Text style={styles.btn}>ver perfil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Map;
