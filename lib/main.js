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

  disposables: null,
  selectedPaths: null,
  
  deserialize(state) {
    return HexerEditor.deserialize(state)
  },

  activate(state) {
    this.disposables = new CompositeDisposable();
    this.disposables.add(atom.workspace.addOpener(openHexer));
    this.disposables.add(atom.commands.add('atom-workspace', {
      'hexer:dump': () => this.dump(),
    }));
  },

  consumeTreeView(treeView) {
    this.selectedPaths = treeView.selectedPaths;
  },
    
  deactivate() {
    this.disposables.dispose();
  },

  dump() {
    const selectedPaths = this.selectedPaths()
    for (const selectedPath of selectedPaths) {
      const uri = `${selectedPath}${HEXER_EXT}`;
      atom.workspace.open(uri);
    }
  }
};
