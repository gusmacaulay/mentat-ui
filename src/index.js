import m from 'mithril';
import './styles.css';

import { App } from "./App";
import { urb } from './allStreams';
import { urbitAPI } from './urbitAPI';

const body = document.getElementById('body');

async function initialiseUrbitAPI() {
    await urbitAPI();
}

initialiseUrbitAPI();

m.route(body, '/admin', {
  '/admin': {view: () => m(App)},
});