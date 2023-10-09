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
          <h4 className="text-align-centre">{vnode.attrs.subHeading}</h4>
          <div className="content">
          {(vnode.attrs.contentArr.length === 0) ? null :
            <div className="contentBox">
              {vnode.attrs.contentArr.map((el) => {
                return (
                  <div className="contentEntries">
                    {Object.entries(el).map((kv) => {
                      return (<div className="contentEntry"><a id={"entry-" + kv[0]}>{kv[0]} : {kv[1]}</a></div>)})
                    }
                  </div>)
              })}
            </div> 
          }
          </div>
          {(vnode.attrs.contentArr.length === 0 || vnode.attrs.buttons === false) ? null :
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

/*
*/


export {contentbox};
