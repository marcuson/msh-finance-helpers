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

  try {
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

    toast('success', 'Data updated!');
  } catch (e) {
    console.error(e);
    toast('error', JSON.stringify(e));
  }
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
