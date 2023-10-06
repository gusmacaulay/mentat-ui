import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const models = stream({})
const selectedModel = stream(undefined); 
const selectedModelKey = stream("");
const currentBot = stream();

const getModels = () => {
  if (!currentBot()) {return true};

  const url = 'get-models/' + currentBot() + '.json';
  scryUrbit(url).then((value) => {
    // scry returns {"key": [{"key": {val}, {"key": {val}, ...}}]}
    // remove outer key and convert to: {{"key": {val}, {"key": {val},...}}} i.e. obj not array

    const dataArray = value['get-models'];  // [{key: obj}, {key: obj}]
    const dataObj = {}
    dataArray.forEach((i) => {
      const key = Object.keys(i)[0]
      const value = Object.values(i)[0]
      dataObj[key] = value;
    })

    models(dataObj)
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
                         contentObj: models(),
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