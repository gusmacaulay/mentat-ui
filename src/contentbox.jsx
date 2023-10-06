import m from 'mithril';
import stream from 'mithril/stream';

// content box for model, compendium, and context screens
// display item selected from sidebar

function contentbox(initialVnode) {

  return {
    view: function(vnode) {
      return (
        <div id="content-box">
          <h3 className="text-align-centre">{vnode.attrs.heading}</h3>
          <div className="content">
            {(vnode.attrs.contentObj === undefined) ? 
              <div className="contentEntries"><div className="contentEntry"><a>Select a model to see details</a></div></div> : 
              <div className="contentEntries">{Object.entries(vnode.attrs.contentObj).map((kv) => {
                return (<div className="contentEntry"><a id={"entry-" + kv[0]}>{kv[0]} : {kv[1]}</a></div>)})}
              </div>} 
          </div>
          {(vnode.attrs.contentObj === undefined) ? null :
            <div id="contentBoxButtons">
              <a id="edit-button">Edit</a>
              <a id="confirm" onclick={vnode.attrs.itemAction}>Confirm</a>
            </div>
          }
        </div>
      )
    }
  }
}

export {contentbox};
