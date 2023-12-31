import m from 'mithril';
import stream from 'mithril/stream';
import Urbit from '@urbit/http-api';

import { urb, botsObj, botID } from './allStreams';
import { getCookie, setCookie } from './helperFunctions';
import { popupBox } from './popupBox';
import { helpBox } from './helpBox';
import { botDriver } from './botDriver';
import { adminView } from './adminView';

import { scryUrbit, pokeUrbit } from './urbitFunctions';

var showPopupBox = false;
var showBotDriver = false;

var viewType = stream('model')
var showHelp = stream(false)

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

  async function closeHelpBox() {
    setCookie("help");
    showHelp(false);
  }

  return {
    oninit: () => {
      // check cookies
      const help = (!(getCookie("help")) || getCookie("help") === undefined || getCookie("help") === null) ? true : false;
      showHelp(help);

      // scry urbit for data
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
            <div class="dropdown">
              <button class="dropbtn" onclick={() => {showHelp(true)}}>?</button>
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
          <div>
            {!(showHelp()) ? null :
              m(helpBox, {close: closeHelpBox})
            }
          </div>
        </main>
      )
    }
  };
}

export { App };
