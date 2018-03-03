/** @babel */
/** @jsx etch.dom */

import fs from 'fs-plus'
import {Emitter, CompositeDisposable, Disposable} from 'atom'
import etch from 'etch'

export class HexerEditorView {
  constructor(editor) {
    this.editor = editor;
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();
    etch.initialize(this)
  }
  destroy () {
    this.disposables.dispose()
    this.emitter.dispose()
    return etch.destroy(this)
  }
  update () {}
  render () {
    return (
      <div>Hello</div>
    )
  }
}