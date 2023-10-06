// import m from 'mithril';
import stream from 'mithril/stream';

// The Urbit connection structure
export const urb = stream();

// This ship... exactly what it says on the box
export const TheShip = stream(window.ship);
export const TheSigil = stream("");

export const botID = stream("");

// To allow msgBox to be used with Urbit callbacks
export const msgBoxCallback = stream({
                                      open: false,
                                      heading: "",
                                      cancelText: "",
                                      confirmText: "",
                                      cancelFunction: "",
                                      confirmFunction: ""
                                     });

// Twizzler (loading image) to be used with Urbit callbacks
export const twizzlerCallback = stream(false);
