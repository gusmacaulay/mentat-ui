import m from 'mithril';
import stream from 'mithril/stream';

//import { botID } from './allStreams';


// sidebar for model, compendium, and context screens

function sidebar(initialVnode) {
  const add = () => {
    // Use a popup here to get inputs?  Or open an input in the main window?
    alert("adding a thing")
  }

  return {
    view: function(vnode) {
      
      return (
        <div id="sidebar">
         <div className="heading sidebar-heading">
          <h3 className="text-align-centre">{vnode.attrs.heading}</h3>
          <a className="add" onclick={() => add()}>+</a>
         </div>
         <div className="heading sidebar-subheading">
          <h2 className="text-align-centre">Selected bot: {vnode.attrs.botID}</h2>
         </div>
         <div className="content">
          {Object.keys(vnode.attrs.contentObj).map((key) => {return (
            <div className="sidebarItemBox" onclick={(event) => {return vnode.attrs.itemAction(event, key)}}>{
              <div>
                <div className={(key == vnode.attrs.selectedItem) ? "selected sidebarItemBoxHeader" : "sidebarItemBoxHeader"}>
                  {key} 
                </div>
                {vnode.attrs.contentObj[key].map((item) => {return (
                  <div className="sidebarItemBoxContent">
                    <a>• {item}</a>
                  </div>)}
                )}
              </div>}
            </div>
          )})}
        </div>
      </div>
      )
    }
  }
}

export {sidebar};