import m from 'mithril';

// Simple message box with passed in confirm and cancel functions
// Passed in functions must close the box from the outside

function popupBox(initialVnode) {
  return {
    oninit: function(vnode) {
      return true;
    },

    oncreate: function(vnode) {
      return true;
    },

    view: function(vnode) {

      if (vnode.attrs.open) {
        vnode.attrs.init();
      }

      function cancel(e) {
        vnode.attrs.cancel();
      }

      function confirm(e) {
        vnode.attrs.confirm();
      }

      return (
          (!vnode.attrs.open) ? ""
          :
          <div className="greyout-box">
             <div id="popupbox" className="border light-background text-align-centre">
                <h3 className="text-align-centre">{vnode.attrs.heading}</h3>
                {(vnode.attrs.body())}
                {(vnode.attrs.cancel) ? <a className="popupbox-button popupbox-cancel border" onclick={cancel}>{vnode.attrs.cancelText}</a> : "" }
                {(vnode.attrs.confirm) ? <a className="popupbox-button popupbox-confirm border" onclick={confirm}>{vnode.attrs.confirmText}</a> : ""}
             </div>
          </div>
      );
    }
  };
}

export {popupBox};

