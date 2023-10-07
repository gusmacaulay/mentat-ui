import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const models = stream({});
const modelsOutline = stream({});
const selectedModel = stream(undefined); 
const selectedModelKey = stream("");
const currentBot = stream();

const getModels = () => {
  if (!currentBot()) {return true};

  const url = 'get-models/' + currentBot() + '.json';
  scryUrbit(url).then((value) => {
    const dataArray = value['get-models'];  // [{key: obj}, {key: obj}]
    const modelSummary = {};
    const modelFull = {};

    dataArray.forEach((i) => {
      const key = Object.keys(i)[0];
      const value = Object.values(i)[0]["model-id"];      // send model-id only as data for sidebar     
      modelSummary[key] = [value]                         // Array for consistency, needed in sidebar
      modelFull[key] = Object.values(i)[0]                // full inference-model for contentbox
    })

    modelsOutline(modelSummary)
    models(modelFull)
  });
}

const sidebarItemClick = (event, modelKey) => {
  selectedModelKey(modelKey)
  selectedModel(models()[modelKey])
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
                         itemAction: sidebarItemClick,
                         selectedItem: selectedModelKey()
                        }
          )}
          {m(contentbox, {
                           heading: "Models",
                           contentObj: selectedModel(),
                           itemAction: contentEditItem
          })}
        </div>
      )
    }
  }
}

export {modelView};