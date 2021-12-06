/* —————————————— Copyright (c) 2021 1Lighty, All rights reserved ——————————————
*
* Get rid of those annoying new buttons
*
* ————————————————————————————————————————————————————————————————————————————— */

import { before, unpatchAll } from '@patcher';
import { getByDisplayName } from '@webpack';
import { suppressErrors } from '@util';
import { Plugin } from '@classes';

export default class NoDMButtons extends Plugin {
  start() {
    suppressErrors(this.patchPrivateChannelsList.bind(this))();
  }
  stop() {
    unpatchAll('no-dm-buttons');
  }
  patchPrivateChannelsList() {
    const ConnectedPrivateChannelsList = getByDisplayName('ConnectedPrivateChannelsList', { ret: 'exports' });
    before('no-dm-buttons', ConnectedPrivateChannelsList, 'default', (_, [props]) => {
      props.showNitroTab = false;
      props.showLibrary = false;
      const nitroButtonIdx = props.children.findIndex(e => e?.type?.displayName === 'NitroButton');
      if (nitroButtonIdx !== -1) props.children.splice(nitroButtonIdx, 1, null);
      const libraryButtonIdx = props.children.findIndex(e => e?.type?.displayName === 'LibraryButton');
      if (libraryButtonIdx !== -1) props.children.splice(libraryButtonIdx, 1, null);
      const snowsgivingButtonIdx = props.children.findIndex(e => e?.type?.displayName === 'SnowsgivingButton');
      if (snowsgivingButtonIdx !== -1) props.children.splice(snowsgivingButtonIdx, 1, null);
    });
  }
}
