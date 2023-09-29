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
          // get model data
          const modelData = scryUrbit('get-conversation', {bot: 'mentat', centag: 'chat', label: 'default'})
          return (<div id="admin-view">{m(modelView)}</div>)
        case 'compendium':
          return (<div id="admin-view">{m(compendiumView)}</div>)
        case 'context':
          return (<div  id="admin-view">{m(contextView)}</div>)
        default:
          return (<div id="admin-view">{m(modelView)}</div>)
      }
    }
  }
}

export {adminView};