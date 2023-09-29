import m from 'mithril';

function setCookie(name, value, expires, path, domain) {
  var cookie = name + "=" + escape(value) + "; ";

  if (expires) {
    // If it's a date
    if(expires instanceof Date) {
      // If it isn't a valid date
      if (isNaN(expires.getTime())) {
        expires = new Date();
      } else {
        expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
      }
      cookie += "expires=" + expires.toGMTString() + "; ";
    }
  }

  if (path) {
    cookie += "path=" + path + "; ";
  }

  if (domain) {
    cookie += "domain=" + domain + "; ";
  }

  document.cookie = cookie;
}


function getCookie(name) {
//  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
//  var result = regexp.exec(document.cookie);
//  alert("Result is: " + result);  //<--- we're getting "null" so the regex is probably wrong

  const result = document.cookie
  .split('; ')
  .find((row) => row.startsWith(name+"="))
  ?.split('=')[1];

  return result;
}


function deleteCookie(name, path, domain) {
  // If the cookie exists
  if (getCookie(name)) {
    createCookie(name, "", -1, path, domain);
  }
}


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


function concatenateBufferArrays(resultConstructor, ...arrays) {
  var totalLength = 0;
  var offset = 0;

  for (const arr of arrays) {
    totalLength += arr.length;
  }

  const result = new resultConstructor(totalLength);

  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}


export { setCookie, getCookie, deleteCookie, delay, concatenateBufferArrays };

