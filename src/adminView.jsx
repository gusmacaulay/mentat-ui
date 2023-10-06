import m from 'mithril';
import { modelView } from './modelView';
import { compendiumView } from './compendiumView';
import { contextView } from './contextView';
import { scryUrbit } from './urbitFunctions';


// View box for the three screens
// models, compendium, contexts

function adminView(initialVnode) {

  return {
    view: function(vnode) {

      switch(vnode.attrs.viewType) {
        case 'models':
          return (<div id="admin-view">{m(modelView, {botID: vnode.attrs.botID})}</div>)
        case 'compendium':
          return (<div id="admin-view">{m(compendiumView, {botID: vnode.attrs.botID})}</div>)
        case 'context':
          return (<div  id="admin-view">{m(contextView, {botID: vnode.attrs.botID})}</div>)
        default:
          return (<div id="admin-view">{m(modelView, {botID: vnode.attrs.botID})}</div>)
      }
    }
  }
}

export {adminView};