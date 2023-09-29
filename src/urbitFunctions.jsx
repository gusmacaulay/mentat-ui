import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { popupBox } from './popupBox';

import _ from 'lodash';


export async function scryUrbit(path, params) {
  m.request({
    method: "GET",
    url: "../../~/scry/mentat/" + path,
    params: params,
    //or...
    // body: params,
    //url: "../../~/scry/dukebox/bundle/"+TheGame().title.toLowerCase()+".mime",
    responseType: "json",
  })
  .then(async function(response) {
    alert("response is: " + response);
    console.log("response is: " + response);

//    if (response.byteLength == 0) {
//      //  4. No bundle exists
//      console.log("[Dukebox] title not found.  Poking for bundle.");
//
//      //start twizzler here
//      document.getElementById("twizzler").style.visibility = "visible";
//    }
  })
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
