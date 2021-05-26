/* —————————————— Copyright (c) 2021 1Lighty, All rights reserved ——————————————
*
* Get rid of those annoying new buttons
*
* ————————————————————————————————————————————————————————————————————————————— */

import { PromisesObject, UPlugin } from '@classes';
import { after, unpatchAll } from '@patcher';
import { getComponent, suppressErrors } from '@util';
import type { React } from '@webpack';
import type { ReactComponent } from '@classes';

export default class NoDMButtons extends UPlugin {
  _PrivateChannelsList: ReactComponent
  start(): void {
    suppressErrors(this.patchPrivateChannelsList.bind(this))(this.promises);
  }
  stop(): void {
    unpatchAll('no-dm-buttons');
    if (this._PrivateChannelsList) this._PrivateChannelsList.forceUpdateAll();
  }
  async patchPrivateChannelsList(promiseState: PromisesObject): Promise<void> {
    const PrivateChannelsList = await getComponent('PrivateChannelsList', '[id="private-channels"]');
    if (promiseState.cancelled) return;
    this._PrivateChannelsList = PrivateChannelsList;
    after('no-dm-buttons', PrivateChannelsList.component, 'getDerivedStateFromProps', (_, __, ret: { preRenderedChildren: number, nonNullChildren: React.FunctionComponent[] }) => {
      ret.nonNullChildren = ret.nonNullChildren.filter(e => e && (e.toString().indexOf('key:"stage-discovery"') === -1 && e.toString().indexOf('key:"premium"') === -1));
    });
    PrivateChannelsList.forceUpdateAll();
  }
}