
// ==UserScript==
// @name        MSH finance helper
// @namespace   marcuson
// @description Helpers for MSH finance.
// @match       https://digital.mps.it/
// @match       https://digital.mps.it/*
// @version     1.0.0
// @author      marcuson
// @license     GPL-3.0-or-later
// @downloadURL https://github.com/marcuson/msh-finance-helpers/raw/gh-pages/index.user.js
// @supportURL  https://github.com/marcuson/msh-finance-helpers/issues
// @homepageURL https://github.com/marcuson/msh-finance-helpers
// @require     https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@2,npm/@violentmonkey/ui@0.7
// @grant       GM.addStyle
// @grant       GM.getValue
// @grant       GM.setValue
// ==/UserScript==

(function () {
'use strict';

var styles$1 = {"mshBtn":"cc-transactions-module_mshBtn__Em-SE"};
var stylesheet$1=".cc-transactions-module_mshBtn__Em-SE{background:none;border:none;color:#ee1a52;cursor:pointer;font-size:46px;margin-right:10px}";

/**
 * lucide v0.104.0 - ISC
 */

const createElement = (tag, attrs, children = []) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });
  if (children.length) {
    children.forEach((child) => {
      const childElement = createElement(...child);
      element.appendChild(childElement);
    });
  }
  return element;
};
var createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);

/**
 * lucide v0.104.0 - ISC
 */


const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
  attrs[attr.name] = attr.value;
  return attrs;
}, {});
const getClassNames = (attrs) => {
  if (typeof attrs === "string")
    return attrs;
  if (!attrs || !attrs.class)
    return "";
  if (attrs.class && typeof attrs.class === "string") {
    return attrs.class.split(" ");
  }
  if (attrs.class && Array.isArray(attrs.class)) {
    return attrs.class;
  }
  return "";
};
const combineClassNames = (arrayOfClassnames) => {
  const classNameArray = arrayOfClassnames.flatMap(getClassNames);
  return classNameArray.map((classItem) => classItem.trim()).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index).join(" ");
};
const toPascalCase = (string) => string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
const replaceElement = (element, { nameAttr, icons, attrs }) => {
  const iconName = element.getAttribute(nameAttr);
  if (iconName == null)
    return;
  const ComponentName = toPascalCase(iconName);
  const iconNode = icons[ComponentName];
  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`
    );
  }
  const elementAttrs = getAttrs(element);
  const [tag, iconAttributes, children] = iconNode;
  const iconAttrs = {
    ...iconAttributes,
    "icon-name": iconName,
    ...attrs,
    ...elementAttrs
  };
  const classNames = combineClassNames(["lucide", `lucide-${iconName}`, elementAttrs, attrs]);
  if (classNames) {
    Object.assign(iconAttrs, {
      class: classNames
    });
  }
  const svgElement = createElement$1([tag, iconAttrs, children]);
  return element.parentNode?.replaceChild(svgElement, element);
};

/**
 * lucide v0.104.0 - ISC
 */

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

/**
 * lucide v0.104.0 - ISC
 */


const Settings = [
  "svg",
  defaultAttributes,
  [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ]
];

/**
 * lucide v0.104.0 - ISC
 */


const UploadCloud = [
  "svg",
  defaultAttributes,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "M12 12v9" }],
    ["path", { d: "m16 16-4-4-4 4" }]
  ]
];

/**
 * lucide v0.104.0 - ISC
 */


const createIcons = ({ icons = {}, nameAttr = "icon-name", attrs = {} } = {}) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
    );
  }
  if (typeof document === "undefined") {
    throw new Error("`createIcons()` only works in a browser environment.");
  }
  const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
  Array.from(elementsToReplace).forEach(
    (element) => replaceElement(element, { nameAttr, icons, attrs })
  );
};

function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

async function askFileToRead() {
  const input = document.createElement('input');
  input.type = 'file';
  const prom = new Promise((res, rej) => {
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = readerEvent => {
        const content = readerEvent.target.result;
        res(content);
      };
      reader.onerror = err => {
        rej(err);
      };
    };
  });
  input.setAttribute('style', 'display:none;');
  document.body.appendChild(input); // required for firefox
  input.click();
  const res = await prom;
  input.remove();
  return res;
}

async function getOpts() {
  return await GM.getValue('options', undefined);
}
async function saveOpts(opts) {
  await GM.setValue('options', opts);
}
function exportOpts(opts) {
  downloadObjectAsJson(opts, 'msh-finance-options');
}
async function importOpts() {
  const optsStr = await askFileToRead();
  const opts = JSON.parse(optsStr);
  return opts;
}

var css_248z = "";

let panel = undefined;
let panelOptions = undefined;
let uploadUrlInput;
async function showOptions() {
  if (panel) {
    return;
  }
  panelOptions = await getOpts();
  if (!panelOptions) {
    panelOptions = {
      uploadUrl: ''
    };
  }
  uploadUrlInput = VM.m(VM.h("input", {
    type: "text",
    name: "uploadurl",
    onchange: onUploadUrlChange,
    value: panelOptions.uploadUrl
  }));
  panel = VM.getPanel({
    content: VM.m(VM.h("div", null, VM.h("form", null, VM.h("label", {
      for: "uploadurl"
    }, "Upload URL"), uploadUrlInput, VM.h("br", null)), VM.h("button", {
      onclick: onSaveBtnClick
    }, "Save"), VM.h("button", {
      onclick: onCancelBtnClick
    }, "Cancel"), VM.h("hr", null), VM.h("button", {
      onclick: onExportBtnClick
    }, "Export"), VM.h("button", {
      onclick: onImportBtnClick
    }, "Import"))),
    style: [css_248z].join('\n')
  });
  writeOptionsIntoInputs();
  panel.wrapper.style.top = '100px';
  panel.wrapper.style.left = '100px';
  panel.show();
}
function onUploadUrlChange(e) {
  e.preventDefault();
  const inp = e.currentTarget;
  panelOptions.uploadUrl = inp.value;
}
function onExportBtnClick(e) {
  e.preventDefault();
  exportOpts(panelOptions);
}
async function onImportBtnClick(e) {
  e.preventDefault();
  panelOptions = await importOpts();
  writeOptionsIntoInputs();
}
function writeOptionsIntoInputs() {
  uploadUrlInput.value = panelOptions.uploadUrl;
}
function onCancelBtnClick(e) {
  e.preventDefault();
  closePanel();
}
function closePanel() {
  panel.hide();
  panel.dispose();
  panel = undefined;
  panelOptions = undefined;
}
async function onSaveBtnClick(e) {
  e.preventDefault();
  console.debug('Options to save:', panelOptions);
  await saveOpts(panelOptions);
  closePanel();
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var styles = {"error":"toast-module_error__eKgSe","warning":"toast-module_warning__jGWiH","success":"toast-module_success__cuSIT"};
var stylesheet=".toast-module_error__eKgSe{color:red}.toast-module_warning__jGWiH{color:orange}.toast-module_success__cuSIT{color:green}";

function toast(type, msg, options) {
  const clz = styles[type];
  const st = [(options == null ? void 0 : options.style) || '', css_248z, stylesheet].join('\n');
  return VM.showToast(VM.h("div", {
    class: clz
  }, VM.h("p", null, msg)), _extends({}, options, {
    style: st
  }));
}

let domThreadDisconnector;
let domThreadImagesDisconnector;
function startObserveDOM() {
  domThreadDisconnector = listenForDOMThread();
}
function stopObserveDOM() {
  domThreadDisconnector();
  domThreadImagesDisconnector();
}
function listenForDOMThread() {
  return VM.observe(document.body, () => {
    const transactionHeader = document.querySelector('div#sezListaMovimenti .wd_content_nav_cube .wd_icons_nav_cube');
    if (!transactionHeader) {
      return;
    }
    console.debug('Transactions header loaded, add buttons');
    const optionsBtn = VM.m(VM.h("button", {
      class: styles$1.mshBtn,
      onclick: async e => {
        await onOptionsBtnClick(e);
      }
    }, VM.h("i", {
      "icon-name": "settings"
    })));
    const uploadBtn = VM.m(VM.h("button", {
      class: styles$1.mshBtn,
      onclick: async e => {
        e.preventDefault();
        e.stopPropagation();
        await onUploadBtnClick(e);
      }
    }, VM.h("i", {
      "icon-name": "upload-cloud"
    })));
    transactionHeader.insertBefore(optionsBtn, transactionHeader.firstChild);
    transactionHeader.insertBefore(uploadBtn, transactionHeader.firstChild);
    createIcons({
      icons: {
        UploadCloud,
        Settings
      }
    });
    return true;
  });
}
async function onUploadBtnClick(e) {
  e.preventDefault();
  e.stopPropagation();
  const opts = await getOpts();
  if (!(opts != null && opts.uploadUrl)) {
    toast('error', 'Configure upload URL first!');
    return;
  }
  const qif = await downloadQIF();
  await fetch(opts.uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/qif'
    },
    body: qif
  });
}
async function onOptionsBtnClick(e) {
  e.preventDefault();
  e.stopPropagation();
  showOptions();
}
async function downloadQIF() {
  const url = document.querySelector('a#saveQIFMovimenti').getAttribute('data-form-action');
  const qif = await fetch(url).then(x => x.text());
  return qif;
}

// function listenForDOMThreadImages(inboxThread: Element): () => void {
//   return VM.observe(inboxThread, () => {
//     const imageNodes = [
//       ...document.querySelectorAll('div[role=img][data-testid^=image-asset-]'),
//     ].filter(
//       (x) =>
//         x.getAttribute('data-mfh-augmented') !== 'true' &&
//         x.getAttribute('data-testid') !== 'image-asset-undefined'
//     );

//     if (imageNodes.length <= 0) {
//       return;
//     }

//     for (const imageNode of imageNodes) {
//       const imageUrlUnprocessed = imageNode.getAttribute('data-testid');
//       const actualWidthMatches = imageUrlUnprocessed.match(/im_w=(?<w>[0-9]+)/);
//       if (actualWidthMatches.length <= 0) {
//         continue;
//       }

//       const actualWidth = parseInt(actualWidthMatches.groups.w);
//       const newWidth = actualWidth * 3;
//       const newImageUrl = imageUrlUnprocessed
//         .replace('image-asset-', '')
//         .replace(actualWidthMatches[0], `im_w=${newWidth}`);

//       const downloadBtn = VM.m(
//         <button
//           class={styles.imgDownloadBtn}
//           onclick={async (e: Event) => {
//             e.preventDefault();
//             e.stopPropagation();
//             await downloadImg(newImageUrl);
//           }}
//         >
//           <i icon-name="download"></i>
//         </button>
//       );

//       const addImageToPdfBtn = VM.m(
//         <button
//           class={styles.imgDownloadBtn}
//           onclick={async (e: Event) => {
//             e.preventDefault();
//             e.stopPropagation();
//             addImageToPdfConvert(newImageUrl);
//           }}
//         >
//           <i icon-name="file-text"></i>
//         </button>
//       );

//       imageNode.classList.add(styles.imgContainer);
//       imageNode.appendChild(downloadBtn);
//       imageNode.appendChild(addImageToPdfBtn);
//       imageNode.setAttribute('data-mfh-augmented', 'true');
//     }

//     createIcons({ icons: { Download, FileText } });
//   });
// }

const moduleDef = {
  name: 'cc-transactions',
  css: stylesheet$1,
  initFn: () => {
    startObserveDOM();
  },
  stopFn: () => {
    stopObserveDOM();
  }
};

function unloadModule(mod) {
  if (!mod) {
    console.info(`No module to unload`);
    return;
  }
  console.info(`Unloading module ${mod.name}`);
  const cssToRemove = document.querySelector('#mfh-current-module-style-' + mod.name);
  if (cssToRemove) {
    cssToRemove.remove();
  }
  if (mod.stopFn) {
    mod.stopFn();
  }
}
function loadModule(mod) {
  console.info(`Loading ${mod.name} module`);
  if (mod.css) {
    document.head.append(VM.m(VM.h("style", {
      id: 'mfh-current-module-style-' + mod.name
    }, mod.css)));
  }
  if (mod.initFn) {
    mod.initFn();
  }
}
function getCorrectModule(path) {
  // choose module to load according to current path
  if (path.startsWith('/pri/pr/3l/action/banking/listaMovimenti.action')) {
    return moduleDef;
  }
  return undefined;
}
function moduleLoaderInit() {
  let currentPath = '';
  let currentModule = undefined;
  const observer = new MutationObserver(() => {
    if (window.location.pathname === currentPath) {
      return;
    }
    currentPath = window.location.pathname;
    console.info(`Path changed to ${currentPath}`);
    if (currentModule !== undefined) {
      unloadModule(currentModule);
    }
    currentModule = getCorrectModule(currentPath);
    if (currentModule === undefined) {
      console.info(`No module to load for path ${currentPath}`);
      return;
    }
    loadModule(currentModule);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: false
  });
}

console.info('Loading MSH finance helper');
document.head.append(VM.m(VM.h("style", null, css_248z)));
moduleLoaderInit();

})();
