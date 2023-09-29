import m from 'mithril';

// View box for the three screens
// models, compendium, contexts

function compendiumView(initialVnode) {

  return {
    view: function(vnode) {
      return (
        <div>
          <h3>compendium view</h3>
        </div>
      )
    }
  }
}

export {compendiumView};