import m from 'mithril';
import stream from 'mithril/stream';

import { sidebar } from './sidebar';
import { contentbox } from './contentbox';


var modelsList = stream([]);  // probably make it an app level stream variable
var selectedModel = stream(''); 

function modelView(initialVnode) {

  return {
    view: function(vnode) {
      return (
        <div id="model-view">
          {m(sidebar, {
                       heading: "Models",
                       content: modelsList()
                      }
          )}
          {m(contentbox, {
                           heading: "Models",
                           content: selectedModel()
          })}
        </div>
      )
    }
  }
}

export {modelView};