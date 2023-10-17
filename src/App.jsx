import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { urb, botsObj, botID } from './allStreams';
import { popupBox } from './popupBox';
import { botDriver } from './botDriver';
import { adminView } from './adminView';

import { scryUrbit, pokeUrbit } from './urbitFunctions';

var showPopupBox = false;
var showBotDriver = false;

var viewType = stream('model')


function App(initialVnode) {

  async function closeBotDriver() {
    showBotDriver = false
  }

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
    oninit: () => {
      scryUrbit('get-bots-set.json').then((value) => {
        if(value['get-bots-set'] === null) {
          // TODO...
        } else {
          botsObj(value['get-bots-set'])  // {{bot-id: status}, {bot-id: status}, ...}
          // set initial bot view
          botID(Object.keys(botsObj())[0])
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
               {Object.keys(botsObj()).map((key) => {return (
                  <a onclick={() => {botID(key)}}>{key}</a>
                )})}
                <hr></hr>
                <a onclick={() => {showBotDriver = true}}>Start|Stop</a>
              </div>
            </div>
          </div>
          <div id="body-container">
            {m(adminView, {viewType: viewType(), botID: botID()})}
          </div>
          <div>
            {m(botDriver, {
                open: showBotDriver,
                close: closeBotDriver,
                addHeading: "Bot Control"
            })}
          </div>  
        </main>
      )
    }
  };
}
/*
<div id="botSelector" class="dropdown-content">
{botsArray().map((el) => {return (
  <a onclick={() => {botID(el)}}>{el}</a>
)})}
*/

export { App };
