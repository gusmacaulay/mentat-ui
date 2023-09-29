import m from 'mithril';

// View box for the three screens
// models, compendium, contexts

function contextView(initialVnode) {

  return {
    view: function(vnode) {
      return (
        <div>
          <h3>context view</h3>
        </div>
      )
    }
  }
}

export {contextView};