import m from 'mithril';
import stream from 'mithril/stream';

const adding = stream(false);
const returnObj = stream({});


// sidebar for model, compendium, and context screens

function sidebar(initialVnode) {

  return {
    view: function(vnode) {
      
      // addItem needs to trigger the popup in the contentbox??
      // just duplicate it here!

      return (
        <div id="sidebar">
          <div className="heading sidebar-heading">
            <h3 className="text-align-centre">{vnode.attrs.heading}</h3>
            {(vnode.attrs.add) ?
              <a className="add" onclick={() => {adding(true)}}>+</a>
            : 
              null
            }
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
                  <div className={(key == vnode.attrs.selectedItem && item == vnode.attrs.selectedSubItem) ? "selected sidebarItemBoxContent" : "sidebarItemBoxContent"} 
                       onclick={(ev) => {return vnode.attrs.subItemAction(ev, key, item)}}>
                    <a>{"• " + item}</a>
                  </div>)}
                )}
              </div>}
            </div>
          )})}
          </div>

          {(!adding()) ? null :
          <div class="overlay">
            <div id="editBox">
              <h4 className="text-align-centre">{vnode.attrs.addHeading}</h4>
              <div className="editContent">
                {Object.entries(vnode.attrs.addObjShape).map(([key, value]) => {
                  return ((typeof value === 'object') ? 
                            <div className="editEntry">
                                {Object.entries(value).map(([subKey, subVal]) => {
                                  return (
                                    <div className="editSubEntry">
                                      <label for={subKey}>{subKey}: </label>
                                      <input id={subKey} name={subKey} placeholder={subVal} oninput={(e) => {
                                        const newObj = {};
                                        newObj[subKey] = e.target.value;
                                        returnObj()[key] = {...returnObj()[key], ...newObj}
                                      }}></input>
                                    </div>
                                  )
                                })}
                              </div>
                            :
                            <div className="editEntry">
                              <label for={key}>{key}: </label>
                              <input id={key} name={key} placeholder={value} oninput={(e) => {returnObj()[key] = e.target.value}}></input>
                            </div>
                          )
                })}
              </div>
              <div className="editButtons">
                <a id="confirm" onclick={(e) => {vnode.attrs.addItem(e, {...vnode.attrs.addObjShape, ...returnObj()}); adding(false);}}>Confirm</a>
                <a id="cancel" onclick={(e) => {returnObj({}); adding(false);}}>Cancel</a>
              </div>
            </div>
          </div>
          }

        </div>
      )
    }
  }
}

export {sidebar};