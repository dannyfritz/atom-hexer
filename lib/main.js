/** @babel */

import path from 'path';
import { CompositeDisposable } from 'atom';
import {HexerEditor} from './hexer-editor';

const HEXER_EXT = ".hexer"

function openHexer(uriToOpen) {
  const uriExtension = path.extname(uriToOpen).toLowerCase();
  if (uriExtension == HEXER_EXT) {
    return new HexerEditor(uriToOpen.replace(RegExp(`${HEXER_EXT}$`), ''));
  }
}

export default {

  subscriptions: null,
  selectedPaths: null,
  
  consumeTreeView(treeView) {
    this.selectedPaths = treeView.selectedPaths;
  },
    
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.workspace.addOpener(openHexer));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hexer:dump': () => this.dump()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  dump() {
    const selectedPaths = this.selectedPaths()
    for (const selectedPath of selectedPaths) {
      const uri = `file://${selectedPath}${HEXER_EXT}`;
      atom.workspace.open(uri);
    }
  }
};
