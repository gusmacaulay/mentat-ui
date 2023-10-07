import m from 'mithril';
import stream from 'mithril/stream';

import { scryUrbit, pokeUrbit } from './urbitFunctions';
import { sidebar } from './sidebar';
import { contentbox } from './contentbox';

const compendium = stream({});
const conversations = stream({});
const selectedDialogue = stream(undefined); 
const selectedDialogueKey = stream("");
const currentBot = stream();

const getCompendium = () => {
  if (!currentBot()) {return true};

  const url = 'get-compendium/' + currentBot() + '.json';
  scryUrbit(url).then((value) => {
    // scry returns {"key": [{"key": {val}, {"key": {val}, ...}}]}
    // remove outer key and convert to: {{"key": {val}, {"key": {val},...}}} i.e. obj not array

    // compendium is:
    // Nested arrays of objects
    // => would be better as an object of objects??
//    [{"chat": [{'default': [{dialogue pairs}, {dialogue pairs}, ...]},
//               {'2nd conv': [{dialogue pairs},...]}
//              ]},
 //     {"query": [{'default': ...}]}
 //   ]

//actual data
//    [{"chat":
//             [{"default":
//                         [{"participant":"user","modelId":"2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1","date":1696576319644,"text":"%chat tell me something about dogs, in a single short sentence"},
//                          {"participant":"ai","modelId":"2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1","date":1696576319644,"text":" Dogs are known for their loyalty and ability to understand and respond to human emotions, making them beloved companions for many people."}]}]}]

// how do display on screen:
// sidebar has:
//  chat
//    - default        |         Selected Dialogue         
//    - 2nd convo      |   time: %user:  |-----------------|
//    - 3rd convo      |   model-id      |                 |
//  query              |                 |    text         |
//    - default        |                 |                 |
//    - 2nd query      |                 |-----------------| 
//  notes              |   time: %ai:
//    -...             |

    compendium(value['get-compendium']);  // [{key: obj}, {key: obj}]
    alert("compendium is: " + JSON.stringify(compendium()));  //structured as above

    const dataObj = {}  //{{centag: [label, label, label]}, {centag: [label, label, label]}, ...}
    compendium().forEach((i) => {
      const centag = Object.keys(i)[0]     // key is the centag
      const valArray = i[centag]           // array of labelled dialogues
      const labels = []

      valArray.forEach((e) => {            // key of each obj in array is the dialogue label
        labels.push(Object.keys(e)[0])
      })

      dataObj[centag] = labels
    })

    conversations(dataObj)  // {centag: [label label label], centag: [label, label, label], ...}
    alert("conversations is: " + JSON.stringify(conversations()))
  });
}

const sidebarItemClick = (event, centag, label) => {
  selectedDialogueKey([centag, label])     // double key
  const conversation = compendium[centag]  // array of dialogue objects
  selectedDialogue(conversation.find((el) => {Object.keys(el)[0] === label}))  //array of interaction objects  
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
                         contentObj: conversations(),
                         itemAction: sidebarItemClick,
                         selectedItem: selectedDialogueKey()
                        }
          )}
          {m(contentbox, {
                           heading: "Compendium",
                           contentObj: selectedDialogue(),
                           itemAction: null
          })}
        </div>
      )
    }
  }
}

export {compendiumView};