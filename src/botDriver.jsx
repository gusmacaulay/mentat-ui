import m from 'mithril';

import { botsObj, botID } from './allStreams';

// Bot driver - standalone

function botDriver(initialVnode) {

  const botSwitch = (e, key) => {
    alert("botsObj()[key] " + botsObj()[key]);
    botsObj()[key] = (botsObj()[key] === "running") ? "stopped" : "running";
    alert("switched to: " + botsObj()[key]);
    //poke urbit
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
                    className={(val === "running") ? "botButton botOn" : "botButton botOff"} 
                    onclick={(e) => {botSwitch(e, key)}}>{(val === "running") ? "ON" : "OFF"}</a>
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

