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
        console.warn(`Could not create HexerEditorView. This can be intentional in the event of an image file being deleted by an external program.`)
        return
      }
    }
    return this.editorView
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
  copy () {
    return new HexerEditor(this.file.getPath())
  }
}
