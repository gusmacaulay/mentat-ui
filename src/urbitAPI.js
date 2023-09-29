import m from 'mithril';
import { urb } from './allStreams';

import _ from 'lodash';
import Urbit from '@urbit/http-api';

const CreateApi = _.memoize(async () => {

    const urb = new Urbit('', '', window.desk);  // Pass in blank strings to connect to the ship that the app is running on
    urb.ship = window.ship;
    urb.verbose = true;
    urb.onError = message => console.log("Urbit error: " + message); // Just log errors if we get any

    return urb;
})


async function urbitAPI() {
  console.log("Creating urbit connection...");
  const api = await new CreateApi();
  urb(api);
  return true;
}

export { urbitAPI }



