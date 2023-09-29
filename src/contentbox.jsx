import m from 'mithril';
import stream from 'mithril/stream';

// content box for model, compendium, and context screens
// display item selected from sidebar

function contentbox(initialVnode) {

  return {
    view: function(vnode) {
      return (
        <div id="content-box">
          <h3>{vnode.attrs.heading}</h3>
          {/*unpack array of data here, each with an edit and a remove button */}
        </div>
      )
    }
  }
}

export {contentbox};