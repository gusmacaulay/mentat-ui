import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { urb, botsArray, botID } from './allStreams';
import { popupBox } from './popupBox';
import { adminView } from './adminView';

import { scryUrbit, pokeUrbit } from './urbitFunctions';

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

  const body = () => {return (
    <a>Each bot will run as a separate %gato thread, with its own models, chat history, and context windows.</a>
  )}

  return {
    oninit: () => {
      scryUrbit('get-bots-set.json').then((value) => {
        alert('bots array is: ' + JSON.stringify(value));
        if(value['get-bots-set'] === null) {
          // TODO...
        } else {
          botsArray(value['get-bots-set'])
          // set initial bot view
          botID(botsArray()[0]);
        }
      });
    },  
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
              <div id="viewSelector" class="dropdown-content">
                <a onclick={() => {viewType('model')}}>Models</a>
                <a onclick={() => {viewType('compendium')}}>Compendium</a>
                <a onclick={() => {viewType('context')}}>Context</a>
              </div>
            </div>
            <div class="dropdown">
              <button class="dropbtn">bot</button>
              <div id="botSelector" class="dropdown-content">
                {botsArray().map((el) => {return (
                  <a onclick={() => {botID(el)}}>{el}</a>
                )})}
                <hr></hr>
                <a onclick={() => {showPopupBox = (showPopupBox) ? false : true}}>Start|Stop</a>
              </div>
            </div>
          </div>
          <div id="body-container">
            {m(adminView, {viewType: viewType(), botID: botID()})}
          </div>
          <div>
            {m(popupBox, {
                 open: showPopupBox, 
                 heading: "Bot Control", 
                 body: body,
                 init: popupBoxInit,
                 cancelText: "Cancel", 
                 confirmText: "Confirm", 
                 confirm: popupBoxConfirm, 
                 cancel: popupBoxCancel
               }
            )}
          </div>  
        </main>
      )
    }
  };
}

export { App };
