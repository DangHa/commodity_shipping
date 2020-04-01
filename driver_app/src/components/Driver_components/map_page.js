import React, { Component } from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class Map extends Component {
  state = {
    initialPosition: {
      latitude: 21.0278,
      longitude: 105.8342,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this._map = map}
          style={styles.map}
          initialRegion={this.state.initialPosition}>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});