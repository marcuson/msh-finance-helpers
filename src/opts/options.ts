import { downloadObjectAsJson } from '../utils/dwl-utils';
import { askFileToRead } from '../utils/file.utils';

export interface Options {
  uploadUrl: string;
}

export async function getOpts(): Promise<Options | undefined> {
  return (await GM.getValue('options', undefined)) as Options | undefined;
}

export async function saveOpts(opts: Options) {
  await GM.setValue('options', opts);
}

export function exportOpts(opts: Options): void {
  downloadObjectAsJson(opts, 'msh-finance-options');
}

export async function importOpts(): Promise<Options> {
  const optsStr = await askFileToRead();
  const opts = JSON.parse(optsStr) as Options;
  return opts;
}
