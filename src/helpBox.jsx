import m from 'mithril';

// Simple help screen

function helpBox(initialVnode) {
  return {
    view: function(vnode) {
      function close(e) {
        vnode.attrs.close();
      }

      return (
          <div className="greyout-box">
             <div id="helpBox" className="border light-background text-align-centre">
                <h3 className="text-align-centre">How to use %mentat</h3>
                <div>
                  <h4 className="text-align-centre">Summary</h4>
                  <div>
                  <a>%mentat is an interface to a selection of LLMs from replicate.com.
                    It currently supports queries, chat, image generation (%turf integration soon!), 
                    todo list management, and reminders (message notifications also coming soon).  
                  </a>
                  </div>
                  <div>
                  <a>You can find models to use, and get an api key at https://replicate.com/
                  </a>
                  </div>
                  <div>
                  <a>%mentat uses %gato to watch Groups Chats, Silo to store images, and outputs
                    all its todo lists to Notebooks.  While the image generation will work without
                    Silo, %gato is a dependency.
                  </a>
                  </div>
                  <div>
                  <a>From this UI you can manage your LLM chatbot, setting up different models to run for 
                    different requests.
                    You'll be making those requests in any Groups Chats that are yours, as %gato will be
                    watching and waiting for requests.  Making requests is simple, just call the bot and 
                    the model and tell it what you want, like so...
                  </a>
                  </div>
                  <div>
                  <a className="tab">/mentat %img Draw me a picture of a cat</a>
                  </div>
                  <div>
                  <a className="tab">/mentat %chat Talk to me like pirate</a>
                  </div>
                  <div>
                  <a className="tab">/mentat %todo Please add 'pick up Hackathon merch' to my list</a>
                  </div>               
                  <div>
                  <a className="tab">/mentat %remind Remind me in five minutes to take a break</a>
                  </div>               
                </div>
                <div>
                  <h4 className="text-align-centre">Using %mentat</h4>
                  <a>%mentat comes with a number of helpful models pre-loaded for current demonstration purposes - 
                    so you can use it right out of the box.  To set it up for yourself, you can simply update the 
                    api-key with your replicate.com api-key and leave the models the way they are (probably best, there's
                    a lot going on under the hood).  Or if you want to play around with it, you can set up your preferred
                    replicate.com models to run for each centag (%img, %todo %query, %chat, %remind).
                  </a>
                </div>
                <div>
                  <h4 className="text-align-centre">Menus</h4>
                  <h5>Bot menu</h5>
                  <a>The bot menu gives you access to the models that have been set up for each bot, you can
                    see that the /mentat bot has already been added, and has a number of models pre-loaded. 
                  </a>
                  <div>
                  <a>The bot menu also has a start|stop option, this allows you to turn your bots on and off
                    by stopping the %gato threads they're running on.
                  </a>
                  </div>
                  <h5>︙ menu</h5>
                  <a>This menu lets you switch between Model and Compendium screens.  The models screen lets you
                    add or edit models for the selected bot.  The Compendium screen shows a history of all your
                    LLM-human interactions 
                  </a>
                </div>
                <div>
                  <h4 className="text-align-centre">What now?</h4>
                  <a>Make sure you have models for a bot and that the bot is running.</a>
                  <div>
                  <a>Then head on over to a Groups Chat and try it out!</a>
                  </div>
                </div>
                <a className="helpbox-button border" onclick={close}>Close</a>
             </div>
          </div>
      );
    }
  };
}

export {helpBox};

