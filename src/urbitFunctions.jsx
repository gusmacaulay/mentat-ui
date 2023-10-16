import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { urb, botsArray, botID } from './allStreams';

import _ from 'lodash';

export async function scryUrbit(path, params) {
  const response = await m.request({
    method: "GET",
    url: "../../~/scry/mentat/" + path,
    params: params,
    //or...
    // body: params,
    responseType: "json",
  })

  return response;
}

export async function pokeUrbit(mark, params) {
  //  Poke urbit at mentat app
  await urb().poke({
    app: 'mentat',
    onSuccess: (msg) => {console.log("[mentat] Successful update " + msg)},
    onError: (msg) => {console.error("[mentat] Error: " + msg)},
    mark: mark,
    json: params,
  });
}

export async function updateBots() {
  scryUrbit('get-bots-set.json').then((value) => {
    alert('bots array is: ' + JSON.stringify(value));
    if(value['get-bots-set'] === null) {
      // if required
    } else {
      botsArray(value['get-bots-set'])
      // set initial bot view (don't change?)
      // botID(botsArray()[0]);
    }
  });
}