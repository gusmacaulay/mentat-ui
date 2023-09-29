import m from 'mithril';
import stream from 'mithril/stream';

// sidebar for model, compendium, and context screens

function sidebar(initialVnode) {
  const add = () => {
    alert("adding a thing")
  }

  return {
    view: function(vnode) {
      return (
        <div id="sidebar">
         <div className="heading">
          <h3>{vnode.attrs.heading}</h3>
          <a className="add" onclick={() => add()}>+</a>
         </div>
         <div className="content">
          {/*unpack array of data here, each with an edit and a remove button */}
         </div>
        </div>
      )
    }
  }
}

export {sidebar};