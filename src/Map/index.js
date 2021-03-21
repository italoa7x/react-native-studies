import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';

const Map = () => {
  const [coordinations] = useState({
    latitude: -7.8953709,
    longitude: -37.1365796,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const users = [
    {
      id: 1,
      title: 'Praça da vila',
      description: 'Praça que tem tudo de pneu',
      latitude: -7.8929756,
      longitude: -37.1323,
    },
    {
      id: 2,
      title: 'Canil Cariri Imperial',
      description: 'Caniel de dogs',
      latitude: -7.8929756,
      longitude: -37.1323,
    },
    {
      id: 3,
      title: 'Escola José Leite',
      description: 'conhecida como o estadual',
      latitude: -7.8958385,
      longitude: -37.1348629,
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
          mapRef.animateCamera({
            center: {
              latitude: latitude,
              longitude: longitude,
            },
          });
        }}>
        {users &&
          users.map(user => (
            <View key={user.id} style={styles.place}>
              <View style={styles.containerInfo}>
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
              <TouchableOpacity
                style={styles.matchContainer}
                onPress={() => alert(`match with ${users[userSelect].title}`)}>
                <Text style={{fontSize: 30, color: '#FFFF'}}>X</Text>
              </TouchableOpacity>

              <View style={styles.containerAvatar}>
                <Image
                  style={{width: 70, height: 70}}
                  source={{
                    uri:
                      'https://styles.redditmedia.com/t5_12jjxa/styles/profileIcon_snooaedcff45-e6ba-43d5-a7fb-1ba5162cb42b-headshot.png?width=256&height=256&crop=256:256,smart&s=0f6528cf2274f6bc3fd47d895a7f7e0fe9b83835',
                  }}
                />
              </View>
            </View>
          ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Map;
