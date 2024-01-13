import * as ccTransactionsModule from '../cc-transactions/cc-transactions.module';
import { ModuleDef } from './module-def';

function unloadModule(mod: ModuleDef) {
  if (!mod) {
    console.info(`No module to unload`);
    return;
  }

  console.info(`Unloading module ${mod.name}`);

  const cssToRemove = document.querySelector(
    '#mfh-current-module-style-' + mod.name
  );
  if (cssToRemove) {
    cssToRemove.remove();
  }

  if (mod.stopFn) {
    mod.stopFn();
  }
}

function loadModule(mod: ModuleDef) {
  console.info(`Loading ${mod.name} module`);

  if (mod.css) {
    document.head.append(
      VM.m(<style id={'mfh-current-module-style-' + mod.name}>{mod.css}</style>)
    );
  }

  if (mod.initFn) {
    mod.initFn();
  }
}

function getCorrectModule(path: string): ModuleDef {
  // choose module to load according to current path
  if (path.startsWith('/pri/pr/3l/action/banking/listaMovimenti.action')) {
    return ccTransactionsModule.moduleDef;
  }

  return undefined;
}

function loadPersistentModules() {}

export function moduleLoaderInit() {
  let currentPath = '';
  let currentModule: ModuleDef = undefined;

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

  observer.observe(document.body, { childList: true, subtree: false });

  loadPersistentModules();
}
