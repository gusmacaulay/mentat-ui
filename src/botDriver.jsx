import m from 'mithril';

import { botsObj, botID } from './allStreams';
import { pokeUrbit, updateBots } from './urbitFunctions';

// Bot driver - standalone

function botDriver(initialVnode) {

  const botSwitch = (e, key) => {
    const currVal = botsObj()[key]
    // set to waiting until urbit returns confirmed change
    botsObj()[key] = "waiting";

    // poke status change to Urbit
    if (currVal === "running") {
      const pokeData = {'stop-bot': {'bot-id': key}}
      pokeUrbit('mentat-action', pokeData);
      updateBots();
    } else if (currVal === "stopped") {
      const pokeData = {'start-bot': {'bot-id': key}}
      pokeUrbit('mentat-action', pokeData);
      updateBots();
    }
  }


  return {
 
    view: function(vnode) {

      function close(e) {
        vnode.attrs.close();
      }

      return (
          (!vnode.attrs.open) ? ""
          :
          <div class="overlay">
            <div id="botDriver">
              <h4 className="text-align-centre">{vnode.attrs.addHeading}</h4>
              <div className="botContent">
              {Object.entries(botsObj()).map(([key, val]) => {return (
                <div className="botListItem">
                  <a className="botLabel">{key}</a>
                  <a id={"botButton-" + key} 
                    className={(val === "running") ? "botButton botOn" : (val === "stopped") ? "botButton botOff" : "botButton botWait"} 
                    onclick={(e) => {botSwitch(e, key)}}>{(val === "running") ? "ON" : (val === "stopped") ? "OFF" : "...wait..."}</a>
                </div>
              )})}
              </div>
              <div className="botDriverButtons">
                <a id="close" onclick={(e) => {close(e)}}>Close</a>
              </div>
            </div>
          </div>
          )
    }
  };
};

export { botDriver };

