import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { urb, TheGame } from './allStreams';
import { popupBox } from './popupBox';
import { adminView } from './adminView';

var showPopupBox = false;

var viewType = stream('model')


function App(initialVnode) {

  async function popupBoxInit() {
    return true;
  }

  async function popupBoxConfirm() {
    showPopupBox = false;
  }

  async function popupBoxCancel() {
    showPopupBox = false;
  }

  return {
    oninit: () => {},  
    onupdate: () => {},  
    oncreate: () => {},
    onremove: () => {},

    view: function(vnode) {
      return (
        <main className="main">
          <div id="header-container">
            <h2 id="admin-heading">%mentat admin</h2>
              <div class="dropdown">
              <button class="dropbtn">︙</button>
              <div class="dropdown-content">
                <a onclick={() => {viewType('model')}}>Models</a>
                <a onclick={() => {viewType('compendium')}}>Compendium</a>
                <a onclick={() => {viewType('context')}}>Context</a>
              </div>
            </div> 
          </div>
          <div id="body-container">
            {m(adminView, {viewType: viewType()})}
          </div>
        </main>
      )

//            <a id="game-button" onclick={() => {showPopupBox = (showPopupBox) ? false : true}}></a>
//            {m(popupBox, {
//                           open: showPopupBox, 
//                           heading: "Journey into Nostalgia", 
//                           body: body,
//                           init: popupBoxInit,
//                           cancelText: "Cancel", 
//                           confirmText: "Confirm", 
//                           confirm: popupBoxConfirm, 
//                           cancel: popupBoxCancel
//                         }
//            )}
    }
  };
}

export { App };
