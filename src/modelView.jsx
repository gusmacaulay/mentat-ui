import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const models = stream({});
const modelsOutline = stream({});
const selectedModel = stream([]); 
const currentBot = stream();

const selectedCentag = stream("");
const selectedLabel = stream("");

const getModels = () => {
  if (!currentBot()) {return true};

  const url = 'get-models/' + currentBot() + '.json';
  scryUrbit(url).then((value) => {
    const dataObj = value['get-models'];  // {chat: {default: {model}, blah: {model}, ...}, query: {default: {model}}}

    // Summarise data for sidebar by removing model details
    const modelSummary = Object.fromEntries(
      Object.entries(dataObj).map(([key, value]) => [key, Object.keys(value)])
    )

    modelsOutline(modelSummary);
    models(dataObj);
  });
}

const sidebarItemClick = (event, centag, label) => {
  selectedCentag(centag);
  selectedLabel(label);
  selectedModel([models()[centag][label]]);  //return an array for consistency in contentbox
}

const contentEditItem = (objModel) => {
  // take in some object data and send out a poke
  alert("Edit click")
}

function modelView(initialVnode) {

  return {

    oninit: () => {},
    oncreate: () => {},

    view: function(vnode) {
      if (currentBot() !== vnode.attrs.botID) {
        currentBot(vnode.attrs.botID);
        getModels();
      }

      return (
        <div id="model-view">
          {m(sidebar, {
                         heading: "Models",
                         botID: vnode.attrs.botID,
                         contentObj: modelsOutline(),
                         itemAction: () => {return true},
                         subItemAction: sidebarItemClick,
                         selectedItem: selectedCentag(),
                         selectedSubItem: selectedLabel()
                        }
          )}
          {m(contentbox, {
                           heading: "Models",
                           subHeading: selectedCentag() + " => " + selectedLabel(),
                           contentArr: selectedModel(),
                           itemAction: contentEditItem,
                           buttons: true
          })}
        </div>
      )
    }
  }
}

export {modelView};