import { moduleLoaderInit } from './loader/module-loader';
import globalCss from './style.css';

console.info('Loading MSH finance helper');

document.head.append(VM.m(<style>{globalCss}</style>));
moduleLoaderInit();
