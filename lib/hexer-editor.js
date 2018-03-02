/** @babel */
import path from 'path';
import {Emitter, File, CompositeDisposable} from 'atom';
import {HexerEditorView} from './hexer-editor-view.js';

export class HexerEditor {
  constructor(fileUri) {
    this.file = new File(fileUri);
  }
  destroy() {
  }
  get element () {
    return this.view && this.view.element || document.createElement('div')
  }
  getAllowedLocations () {
    return ['center'];
  }
  getTitle() {
    const filePath = this.file.getPath();
    if (filePath) {
      return path.basename(filePath);
    } else {
      return 'untitled';
    }
  }
  get view () {
    if (!this.editorView) {
      try {
        this.editorView = new HexerEditorView(this)
      } catch (e) {
        console.warn(`Could not create HexerEditorView. This can be intentional in the event of an image file being deleted by an external program.`)
        return
      }
    }
    return this.editorView
}}
