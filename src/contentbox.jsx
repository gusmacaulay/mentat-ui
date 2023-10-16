import m from 'mithril';
import stream from 'mithril/stream';

// content box for model, compendium, and context screens
// display item selected from sidebar

const editing = stream(false);
const centag = stream("");
const label = stream("");
const returnObj = stream({});

function contentbox(initialVnode) {

  const editItem = (event, lbl) => {
    editing(true);
//    centag(ctg); ///--- error --- how can we get this?
    label(lbl);
  }

  const cancelEdit = (event) => {
    editing(false);
    centag("")
    label("")
  }

  return {
    view: function(vnode) {

      return (
        <div id="content-box">
          <h3 className="text-align-centre">{vnode.attrs.heading}</h3>
          <h4 className="text-align-centre">{vnode.attrs.subHeading}</h4>
          <div className="content">
          {(vnode.attrs.contentArr.length === 0) ? null :
            <div className="contentBox">
              {vnode.attrs.contentArr.map((el) => {
                return (
                  <div className="contentEntries">
                    {Object.entries(el).map(([key, value]) => {
                      return (<div className="contentEntry">
                                <a id={"entry-" + key} className="key">{key} : </a><a className="value">{value}</a>
                              </div>)
                    })}
                    {(vnode.attrs.buttons) ? <a id="edit-button" onclick={(ev) => {editItem(ev, el)}}>Edit</a> : null}
                  </div>)
              })}
            </div> 
          }
          </div>
          {(!editing()) ? null :
          <div class="overlay">
            <div id="editBox">
              <h4 className="text-align-centre">{vnode.attrs.subHeading}</h4>
              <div className="editContent">
                {Object.entries(vnode.attrs.contentArr[0]).map(([key, value]) => {
                  return (<div className="editEntry">
                            <label for={key}>{key}: </label>
                            <input id={key} name={key} placeholder={value} oninput={(e) => {returnObj()[key] = e.target.value}}></input>
                          </div>
                          )
                })}
              </div>
              <div className="editButtons">
                <a id="confirm" onclick={(e) => {vnode.attrs.itemAction(e, {...vnode.attrs.contentArr[0], ...returnObj()}); editing(false);}}>Confirm</a>
                <a id="cancel" onclick={(e) => {cancelEdit(e)}}>Cancel</a>
              </div>
            </div>
          </div>
          }
        </div>
      )
    }
  }
}

/*
*/


export {contentbox};
