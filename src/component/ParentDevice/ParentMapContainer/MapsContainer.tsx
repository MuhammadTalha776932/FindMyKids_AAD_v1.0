import React, { useRef, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "../../../../APIs_Keys";
import Modals from "../Modals/modals.index";
import { MapIndicators } from "../../../Helper/MapHelpers/MapIndicators";
import { useCalculateLatAndLngDelta } from "../../../Helper/UseScreenOrientation";
import { Observer, observer } from "mobx-react";
import { childCoordinate, coordinateContext, CoordinateProvider } from "../../../StateManagement/useCoordinateStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { UserContext } from "../../../StateManagement/userStore";
import { handleFNChildLocation } from "../BackgroundTask/NotificationBGT";



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapsContainer = observer((): JSX.Element => {

  const { latDelta, lngDelta } = useCalculateLatAndLngDelta();
  const { CoordinateState } = useContext(CoordinateProvider);
  const [initializing, setInitializing] = React.useState(true);
  const { ispaired, storePairingCode, updateData, users } = React.useContext(UserContext);


  const mapsRef = useRef<MapView>(null);

  React.useEffect(() => {
    if (initializing) setInitializing(false);
    if (users && ispaired) handleFNChildLocation();
  }, []);

  if (initializing) return <ActivityIndicator style={{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }} animating={true} color={MD2Colors.red800} />;

  const Markers = (CoordinateState: childCoordinate[]) => {

    return CoordinateState?.map((coordinate, index) => {
      return (
        <React.Fragment key={coordinate?.uid}>
          <Marker
            title="Start" 
            description="Starting Points" 
            coordinate={{
              latitude: coordinate?.init_coordinate?.latitude,
              longitude: coordinate?.init_coordinate?.longitude
            }} />
          <Circle
            center={{
              latitude: coordinate?.init_coordinate?.latitude,
              longitude: coordinate?.init_coordinate?.longitude
            }}
            radius={5}
            fillColor="rgba(0, 255, 0, 0.5)"
          />
          <Marker key={index} title="Destinations" description="Finishing Points" coordinate={
            {
              latitude: coordinate?.curr_coordinate?.latitude,
              longitude: coordinate?.curr_coordinate?.longitude
            }} />
          <Circle
            center={{
              latitude: coordinate?.curr_coordinate?.latitude,
              longitude: coordinate?.curr_coordinate?.longitude
            }}
            radius={5}
            fillColor="rgba(0, 255, 0, 0.5)"
          />

          <MapViewDirections
            origin={{
              latitude: coordinate?.init_coordinate?.latitude,
              longitude: coordinate?.init_coordinate?.longitude
            }}
            destination={{
              latitude: coordinate?.curr_coordinate?.latitude,
              longitude: coordinate?.curr_coordinate?.longitude
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={false}
            onReady={result => {
              mapsRef?.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  top: 300,
                  left: 30,
                  bottom: 100
                }
              });
            }}
          />
        </React.Fragment>
      )
    })
  }

  return (
    <View style={styles.container}>
      {
        CoordinateState ? (
          <>
            <View style={styles.container}>
              <MapView
                ref={mapsRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: CoordinateState[0]?.init_coordinate?.latitude,
                  longitude: CoordinateState[0]?.init_coordinate?.longitude,
                  latitudeDelta: latDelta,
                  longitudeDelta: lngDelta,
                }}
                children={Markers(CoordinateState)}
              />

              {/* <Marker title="Start" description="Starting Points" coordinate={{
                  latitude: CoordinateState?.init_coordinate?.latitude,
                  longitude: CoordinateState?.init_coordinate?.longitude
                }} />
                <Circle
                  center={{
                    latitude: CoordinateState?.init_coordinate?.latitude,
                    longitude: CoordinateState?.init_coordinate?.longitude
                  }}
                  radius={5}
                  fillColor="rgba(0, 255, 0, 0.5)"
                />
                <Marker title="Destinations" description="Finishing Points" coordinate={
                  {
                    latitude: CoordinateState?.curr_coordinate?.latitude,
                    longitude: CoordinateState?.curr_coordinate?.longitude
                  }} />
                <Circle
                  center={{
                    latitude: CoordinateState?.curr_coordinate?.latitude,
                    longitude: CoordinateState?.curr_coordinate?.longitude
                  }}
                  radius={5}
                  fillColor="rgba(0, 255, 0, 0.5)"
                />

                <MapViewDirections
                  origin={{
                    latitude: CoordinateState?.init_coordinate?.latitude,
                    longitude: CoordinateState?.init_coordinate?.longitude
                  }}
                  destination={{
                    latitude: CoordinateState?.curr_coordinate?.latitude,
                    longitude: CoordinateState?.curr_coordinate?.longitude
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="hotpink"
                  optimizeWaypoints={false}
                  onReady={result => {
                    mapsRef?.current?.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: 30,
                        top: 300,
                        left: 30,
                        bottom: 100
                      }
                    });
                  }}
                /> */}
              {/* </MapView> */}
            </View>

            <MapIndicators title={"currentLocation"}
              refs={mapsRef}
              landscapeBottom={"20%"}
              landscapeRight={"5%"}
              bottom={"20%"}
              right={"5%"}
              ionicons={"location-sharp"}
              iconSize={25}
              lIconSize={20} />
            <MapIndicators
              landscapeBottom={"35%"}
              landscapeRight={"5%"}
              bottom={"28%"}
              right={"5%"}
              ionicons={"time-sharp"}
              iconSize={25}
              lIconSize={20} />


            <View style={{ flexDirection: "column", width: "100%", backgroundColor: "white" }}>
              <Modals />
            </View>
          </>

        ) : null}
    </View>
  );
})



export default MapsContainer;