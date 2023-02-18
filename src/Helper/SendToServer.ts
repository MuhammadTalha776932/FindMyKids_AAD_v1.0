import {Alert} from 'react-native';
import * as React from 'react';
import axios from 'axios';
import {coordinateContext} from '../StateManagement/useCoordinateStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userStore from '../StateManagement/userStore';

export const sendPostRequest = async (
  user: object,
  deviceID?: string,
  code?: string,
) => {
  try {
    axios
      .post(
        `https://findmykids.cyclic.app/users`,
        {
          data: {
            user,
            deviceID,
            code: code, //|| 'A!b024'
          },
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        },
      )
      .then(async res => {
        if (
          res.data.deviceID === 'Child' &&
          Object.keys(res.data).includes('curr_coordinate')
        ) {
          coordinateContext.updateTheCoordinate([res.data]);
          userStore.setIsPaired(res.data?.isPaired);
        }

        if (Object.keys(res.data).includes('code')) {
          userStore.setIsPairingCode(res.data?.code);
        }
      });
  } catch (error) {
    console.error(error);
  }
};
