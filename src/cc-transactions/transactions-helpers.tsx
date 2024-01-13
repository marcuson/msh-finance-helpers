import { Settings, UploadCloud, createIcons } from 'lucide';
import { getOpts } from '../opts/options';
import { showOptions } from '../opts/opts';
import { toast } from '../toast/toast';
import styles from './cc-transactions.module.css';

let domThreadDisconnector: () => void;
let domThreadImagesDisconnector: () => void;

export function startObserveDOM() {
  domThreadDisconnector = listenForDOMThread();
}

export function stopObserveDOM() {
  domThreadDisconnector();
  domThreadImagesDisconnector();
}

function listenForDOMThread(): () => void {
  return VM.observe(document.body, () => {
    const transactionHeader = document.querySelector(
      'div#sezListaMovimenti .wd_content_nav_cube .wd_icons_nav_cube'
    );

    if (!transactionHeader) {
      return;
    }

    console.debug('Transactions header loaded, add buttons');

    const optionsBtn = VM.m(
      <button
        class={styles.mshBtn}
        onclick={async (e: Event) => {
          await onOptionsBtnClick(e);
        }}
      >
        <i icon-name="settings"></i>
      </button>
    );

    const uploadBtn = VM.m(
      <button
        class={styles.mshBtn}
        onclick={async (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          await onUploadBtnClick(e);
        }}
      >
        <i icon-name="upload-cloud"></i>
      </button>
    );

    transactionHeader.insertBefore(optionsBtn, transactionHeader.firstChild);
    transactionHeader.insertBefore(uploadBtn, transactionHeader.firstChild);

    createIcons({ icons: { UploadCloud, Settings } });

    return true;
  });
}

async function onUploadBtnClick(e: Event) {
  e.preventDefault();
  e.stopPropagation();

  const opts = await getOpts();
  if (!opts?.uploadUrl) {
    toast('error', 'Configure upload URL first!');
    return;
  }
  const qif = await downloadQIF();

  await fetch(opts.uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/qif',
    },
    body: qif,
  });
}

async function onOptionsBtnClick(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  showOptions();
}

async function downloadQIF(): Promise<string> {
  const url = document
    .querySelector('a#saveQIFMovimenti')
    .getAttribute('data-form-action');
  const qif = await fetch(url).then((x) => x.text());
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
