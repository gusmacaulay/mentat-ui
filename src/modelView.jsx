import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit, updateBots } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const models = stream({});
const modelsOutline = stream({});
const selectedModel = stream([]); 
const currentBot = stream("");

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

    // Redraw contentbox if already being displayed
    if(selectedCentag() && selectedModel()) {
      sidebarItemClick(null, selectedCentag(), selectedLabel())
    }

  });
}

const sidebarItemClick = (event, centag, label) => {
  selectedCentag(centag);
  selectedLabel(label);
  selectedModel([models()[centag][label]]);  //return an array for consistency in contentbox
}

const editModel = (event, modelObj) => {
  const updModel = {'add-model': {'bot-id': currentBot(),
                    'centag': selectedCentag(),
                    'label': selectedLabel(),
                    'inference-model': modelObj}};

  pokeUrbit('mentat-action', updModel);
  getModels();  // refresh data
}

const addModel = (event, modelObj) => {
  const addModel = {'add-model': modelObj};
  pokeUrbit('mentat-action', addModel);
  // do we need this here as well??
  // Yes, but this won't do it - need to get bots in case a new bot has been added
  updateBots().then(getModels());  // refresh data
}

const modelShape = {'bot-id': '',
                    'centag': '',
                    'label': '',
                    'inference-model': {
                       'view': '',
                       'model-id': '',
                       'api-key': '',
                       'timeout': 0,
                       'tokens': 0
                    }};

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
                         addHeading: "Add a model",
                         addItem: addModel,
                         addObjShape: modelShape,
                         contentObj: modelsOutline(),
                         itemAction: () => {return true},
                         subItemAction: sidebarItemClick,
                         selectedItem: selectedCentag(),
                         selectedSubItem: selectedLabel(),
                         add: true
                        }
          )}
          {m(contentbox, {
                           heading: "Models",
                           subHeading: selectedCentag() + " => " + selectedLabel(),
                           contentArr: selectedModel(),
                           itemAction: editModel,
                           buttons: true
          })}
        </div>
      )
    }
  }
}

export {modelView};