import { defineConfig } from "vite";
//import basicSsl from '@vitejs/plugin-basic-ssl'

import { urbitPlugin } from '@urbit/vite-plugin-urbit';

export default defineConfig({
  // Uncomment to use JSX:
  esbuild: {
    jsx: "transform",
    jsxFactory: "m",
    jsxFragment: "'['",
  },
  base: '/apps/mentat/',
//  base: "http://localhost:8080/apps/mentat/",
  server: {
    headers: {  //Problem with these is even if they do work, it's for ALL files served
        "Access-Control-Allow-Origin": "*"
//      "transfer-encoding": "zip", 
//      "text/plain; charset=x-user-defined"
//      "transfer-encoding": "text/plain; charset=x-user-defined"
//      "transfer-encoding": "identity", 
//      "content-encoding": "identity",
    },
    force: true,
  },
});

