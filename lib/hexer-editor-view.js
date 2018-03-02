/** @babel */
/** @jsx etch.dom */

import fs from 'fs'
import {Emitter, CompositeDisposable, Disposable} from 'atom'
import etch from 'etch'

export class HexerEditorView {
  constructor(editor) {
    this.editor = editor;
    this.disoposables = new CompositeDisposable();
    this.emiiter = new Emitter();
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