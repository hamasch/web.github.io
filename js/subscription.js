!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("SMSBumpKlaviyoForms",[],e):"object"==typeof exports?exports.SMSBumpKlaviyoForms=e():t.SMSBumpKlaviyoForms=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let o;const i=new Uint8Array(16);function u(){if(!o&&(o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!o))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(i)}const a=[];for(let t=0;t<256;++t)a.push((t+256).toString(16).slice(1));function c(t,e=0){return(a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]).toLowerCase()}var f=function(t,e,n){if(r.randomUUID&&!e&&!t)return r.randomUUID();const o=(t=t||{}).random||(t.rng||u)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e){n=n||0;for(let t=0;t<16;++t)e[n+t]=o[t];return e}return c(o)};const l=Date.now(),s=()=>l,d=(t,e,n,r,o)=>{const i=((t,e,n,r,o)=>{if(!o||""===t)return"";const i=s(),u=i.toString().charAt(i.toString().length-3),a=encodeURIComponent(n);let c=r?+r.charAt(u):parseInt((a.charCodeAt(u)-96)/2);for(let t=u;t>0&&""===c;t--)c=r?+r.charAt(t):(a.charCodeAt(t)-96)/2;c=Math.abs(c),c=Math.max(c,3),c=Math.min(c,15);const l=new RegExp(`(.{${c}}).`,"g"),d=f()+e;return t.replace(l,(t,e)=>{const n=t.slice(-1);return""+(e+d[Math.floor(Math.random()*d.length)]+String.fromCharCode(n.charCodeAt(0)+1)+d[Math.floor(Math.random()*d.length)])})})(t,(Math.random()+1).toString(36).substring(7),e,n,o),u={"Access-Control-Allow-Origin":"*","Content-Type":"application/json;charset=UTF-8"};return""===i?u:{...u,"X-Amzn-Perf-Id":i,"X-Smsbump-Key":s()}};(function(){let t={},e=function(){try{let t=__st.cid;if(null!=t&&""!==t)return t}catch(t){return 0}try{let t=window.ShopifyAnalytics.meta.page.customerId;if(null!=t&&""!==t)return t}catch(t){return 0}try{let t=window.meta.page.customerId;if(null!=t&&""!==t)return t}catch(t){return 0}return 0},n=function(){let t="";return"undefined"!=typeof Shopify&&(null!=Shopify.shop?t=Shopify.shop:null!=Shopify.Checkout.apiHost&&(t=Shopify.Checkout.apiHost)),t||(t=window.location.host),t},r=function(e=!1){return e?!!t.hasOwnProperty(e)&&t[e]:t},o=function(t,e,n=0){let r={customer_id:n,store:t};for(const[t,n]of Object.entries(e))r[t]=n;return JSON.stringify(r)},i=function(e){t=e},u=function(t){return t&&t.$phone_number},a=function(t){return t&&t.$email},c=t=>{let i=t.metaData,c=n(),f=u(i),l=a(i),p=!(!f&&!l);if(Object.keys(i).length<=0||!1===p)return!1;let m=e(),h=r("url");if(Object.assign(i,y(t)),!1!==h){let e=f||"";"+"===e.charAt(0)&&(e=e.substring(1));let n=l||"";const r=((t,e,n,r)=>r?btoa(`/${s()}/${t}/${encodeURIComponent(e)}/${n}/`):"")(e,n,t.formId?t.formId:i.$consent_form_id?i.$consent_form_id:"",1);return fetch(h,{method:"post",body:o(c,i,m),keepalive:!0,headers:d(r,n,e,0,1)}).then(t=>{if(t.ok){let t=new CustomEvent("SMSKlaviyoFormSubmit",{detail:{store:c,subscriber_data:i,customer_id:m}});window.dispatchEvent(t);try{window.Shopify.analytics.publish("yotpo_subscriber_collected",{phone:i.$phone_number,email:i.$email})}catch(t){}}return t}).catch(t=>{console.error("There has been a problem with your fetch operation:",t)}),!0}return!1};var f=function(t){t&&"function"==typeof t?"ie"!=(document.attachEvent&&void 0!==document.attachEvent?"ie":"not-ie")?window.addEventListener("klaviyoForms",(function(e){return t(e)})):window.attachEvent("klaviyoForms",(function(e){if("complete"===window.readyState)return t(e)})):console.error("The callback is not a function!")};let l={},p={},m={},y=function(t){return m[h(t)]},h=function(t){return t.formId},b=function(t){let e=u(t.metaData),n=a(t.metaData),r=h(t);return JSON.stringify([r,e,n])};const g=["POPUP","FLYOUT"];let S=function(t){let e=t.type,n=h(t),r=m[n]=m[n]||{};if(r._y_eventType=e,"close"===e)return!0;if("stepSubmit"===e){let e=u(t.metaData),n=a(t.metaData),o=function(t){let e=`[data-testid="klaviyo-form-${h(t)}"]`,n=document.querySelector(e);if(n&&"FORM"==n.nodeName){let t=10,e=n.parentNode;for(;e&&t--;){let t=e.getAttribute("data-testid");if(t&&"DIV"==e.nodeName)return-1!=g.indexOf(t)?"POPUP":"EMBEDED";if(e=e.parentNode,"BODY"==e.nodeName)return"EMBEDED"}}return!1}(t);return r._y_formType=o,"EMBEDED"==o||!1===o?!!e||!!n:!(!e||!n)}return!1},w=function(t){i(t),f((function(t){let e=t.detail;e.metaData=Object.assign(e.metaData||{},function(t){let e=h(t);if(!1!==e){let n=u(t.metaData),r=a(t.metaData);return l[e]=Object.assign(Object.assign(l[e]||{},t.metaData)||{},n&&{$phone_number:n},r&&{$email:r}),l[e]}return{}}(e)),S(e)&&!1===function(t){let e=b(t);return!1!==e&&!0===p[e]}(e)&&!0===c(e)&&function(t){let e=b(t);!1!==e&&(p[e]=!0)}(e)}))};return{init:function(t){return w(t)}}})().init({url:"https://sqs-webhooks.smsbump.com/forms-subscription"})}])}));