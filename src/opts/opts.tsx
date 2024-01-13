import { IPanelResult } from '@violentmonkey/ui';
import globalCss from '../style.css';
import { exportOpts, getOpts, importOpts, Options, saveOpts } from './options';

let panel: IPanelResult = undefined;
let panelOptions: Options = undefined;

let uploadUrlInput: HTMLInputElement;

export async function showOptions() {
  if (panel) {
    return;
  }

  panelOptions = await getOpts();
  if (!panelOptions) {
    panelOptions = {
      uploadUrl: '',
    };
  }

  uploadUrlInput = VM.m(
    <input
      type="text"
      name="uploadurl"
      onchange={onUploadUrlChange}
      value={panelOptions.uploadUrl}
    ></input>
  ) as HTMLInputElement;

  panel = VM.getPanel({
    content: VM.m(
      <div>
        <form>
          <label for="uploadurl">Upload URL</label>
          {uploadUrlInput}
          <br />
        </form>
        <button onclick={onSaveBtnClick}>Save</button>
        <button onclick={onCancelBtnClick}>Cancel</button>
        <hr></hr>
        <button onclick={onExportBtnClick}>Export</button>
        <button onclick={onImportBtnClick}>Import</button>
      </div>
    ),
    style: [globalCss].join('\n'),
  });

  writeOptionsIntoInputs();

  panel.wrapper.style.top = '100px';
  panel.wrapper.style.left = '100px';
  panel.show();
}

function onUploadUrlChange(e: Event) {
  e.preventDefault();
  const inp = e.currentTarget as HTMLInputElement;
  panelOptions.uploadUrl = inp.value;
}

function onExportBtnClick(e: Event) {
  e.preventDefault();
  exportOpts(panelOptions);
}

async function onImportBtnClick(e: Event) {
  e.preventDefault();
  panelOptions = await importOpts();
  writeOptionsIntoInputs();
}

function writeOptionsIntoInputs() {
  uploadUrlInput.value = panelOptions.uploadUrl;
}

function onCancelBtnClick(e: Event) {
  e.preventDefault();
  closePanel();
}

function closePanel() {
  panel.hide();
  panel.dispose();
  panel = undefined;
  panelOptions = undefined;
}

async function onSaveBtnClick(e: Event) {
  e.preventDefault();
  console.debug('Options to save:', panelOptions);
  await saveOpts(panelOptions);
  closePanel();
}
