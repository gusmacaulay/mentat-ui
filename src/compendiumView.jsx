import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const compendium = stream([]);
const compendiumOutline = stream({});

const selectedDialogue = stream([]); 
const currentBot = stream();

const selectedCentag = stream("");
const selectedLabel = stream("");

const getCompendium = () => {
  if (!currentBot()) {return true};

  const url = 'get-compendium/' + currentBot() + '.json';
  scryUrbit(url).then((value) => {
    const dataObj = (value['get-compendium']);

    // Summarise data for sidebar by removing dialogue details
    const compendiumSummary = Object.fromEntries(
      Object.entries(dataObj).map(([key, value]) => [key, Object.keys(value)])
    )

    compendiumOutline(compendiumSummary)
    compendium(dataObj);
  });
}

const sidebarItemClick = (event, centag, label) => {
  selectedCentag(centag);
  selectedLabel(label);
  selectedDialogue(compendium()[centag][label])
}

// no editing conversations
//const contentEditItem = (objModel) => {
//  // take in some object data and send out a poke
//  alert("Edit click")
//}

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
        <div id="compendium-view">
          {m(sidebar, {
                         heading: "Compendium",
                         botID: vnode.attrs.botID,
                         contentObj: compendiumOutline(),
                         itemAction: () => {return true},
                         subItemAction: sidebarItemClick,
                         selectedItem: selectedCentag(),
                         selectedSubItem: selectedLabel()
                        }
          )}
          {m(contentbox, {
                           heading: "Compendium",
                           subHeading: selectedCentag() + "=>" + selectedLabel(),
                           contentArr: selectedDialogue(),
                           itemAction: null,
                           buttons: false
          })}
        </div>
      )
    }
  }
}

export {compendiumView};