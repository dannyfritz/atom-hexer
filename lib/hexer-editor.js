/** @babel */
import path from 'path';
import fs from 'fs-plus';
import {Emitter, File, CompositeDisposable} from 'atom';
import {HexerEditorView} from './hexer-editor-view.js';

export class HexerEditor {
  static deserialize ({filePath}) {
    if (fs.isFileSync(filePath)) {
      return new HexerEditor(filePath)
    } else {
      console.warn(`Could not deserialize hexer editor for path '${filePath}' because that file no longer exists`)
    }
  }
  constructor(fileUri) {
    this.file = new File(fileUri);
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter()
  }
  destroy() {
    this.disposables.dispose()
    if (this.view) {
      this.view.destroy()
    }
  }
  serialize () {
      return {filePath: this.file.getPath(), deserializer: this.constructor.name}
  }
  get element () {
    return this.view && this.view.element || document.createElement('div')
  }
  get view () {
    if (!this.editorView) {
      try {
        this.editorView = new HexerEditorView(this)
      } catch (e) {
        console.warn(`Could not create HexerEditorView. This can be intentional in the event of a file being deleted by an external program.`)
        console.error(e);
        return
      }
    }
    return this.editorView
  }
  getAllowedLocations () {
    return ['center'];
  }
  getURI () {
    return this.getPath()
  }
  getEncodedURI () {
    return `file://${encodeURI(this.getPath().replace(/\\/g, '/')).replace(/#/g, '%23').replace(/\?/g, '%3F')}`
  }
  getPath() {
    return this.file.getPath()
  }
  getTitle() {
    const filePath = this.getPath();
    if (filePath) {
      return `${path.basename(filePath)} (hex)`;
    } else {
      return 'untitled';
    }
  }
  isEqual (other) {
    return other instanceof HexerEditor && (this.getURI() === other.getURI())
  }
  copy () {
    return new HexerEditor(this.getPath())
  }
}
