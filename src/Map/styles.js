import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  place: {
    width: Dimensions.get('window').width - 40,
    height: 150,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 40,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  description: {
    color: '#999',
    fontSize: 16,
    marginTop: 5,
  },

  placesContainer: {
    width: '100%',
    maxHeight: 200,
    marginTop: Dimensions.get('window').width + 10,
  },
  btn: {
    marginTop: 10,
    fontSize: 15,
    color: '#F1F5F3',
    borderRadius: 10,
    backgroundColor: '#010101',
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  matchContainer: {
    left: 140,
    top: -65,
    backgroundColor: '#010101',
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  containerAvatar: {
    top: -130,
    left: -120,
    width: 100,
    height: 100,
  },
  containerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
});
