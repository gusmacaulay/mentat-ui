import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { popupBox } from './popupBox';

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
  //return JSON.stringify(response)
//  
//  m.request({
//    method: "GET",
//    url: "../../~/scry/mentat/" + path,
//    params: params,
//    //or...
//    // body: params,
//    responseType: "json",
//  })
//  .then(async function(response) {
//    alert("response is: " + JSON.stringify(response));
//    console.log("response is: " + JSON.stringify(response));
//    return JSON.stringify(response);
//  })
}


export async function pokeUrbit(mark, params) {
  //  Poke urbit for game
  await urb().poke({
    app: 'mentat',
    onSuccess: () => {},
    onError: (msg) => {console.error("[mentat] Error: " + msg)},
    mark: mark,
    json: params,
  });
}
