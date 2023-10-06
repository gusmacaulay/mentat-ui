import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const compendium = stream({})
const selectedConversation = stream(undefined); 
const selectedConversationKey = stream("");
const currentBot = stream();

const getCompendium = () => {
  if (!currentBot()) {return true};

  const url = 'get-compendium/' + currentBot() + '.json';
  scryUrbit(url).then((value) => {
    // scry returns {"key": [{"key": {val}, {"key": {val}, ...}}]}
    // remove outer key and convert to: {{"key": {val}, {"key": {val},...}}} i.e. obj not array

    const dataArray = value['get-compendium'];  // [{key: obj}, {key: obj}]
    alert(JSON.stringify(dataArray));
    const dataObj = {}
    //dataArray.forEach((i) => {
    //  const key = Object.keys(i)[0]
    //  const value = Object.values(i)[0]
    //  dataObj[key] = value;
    //})

    models(dataObj)
  });
}

const sidebarItemClick = (event, conversationKey) => {
  selectedConversationKey(conversationKey)
  selectedConversation(models()[conversationKey])
}

const contentEditItem = (objModel) => {
  // take in some object data and send out a poke
  alert("Edit click")
}

function compendiumView(initialVnode) {

  return {

    oninit: () => {},
    oncreate: () => {},

    view: function(vnode) {
      if (currentBot() !== vnode.attrs.botID) {
        currentBot(vnode.attrs.botID);
        getCompendium();
      }

      return (
        <div id="model-view">
          {m(sidebar, {
                         heading: "Models",
                         botID: vnode.attrs.botID,
                         contentObj: compendium(),
                         itemAction: sidebarItemClick,
                         selectedItem: selectedConversationKey()
                        }
          )}
          {m(contentbox, {
                           heading: "Models",
                           contentObj: selectedConversation(),
                           itemAction: contentEditItem
          })}
        </div>
      )
    }
  }
}

export {compendiumView};