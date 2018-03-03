/** @babel */
/** @jsx etch.dom */

import fs from 'fs-plus'
import {Emitter, CompositeDisposable, Disposable} from 'atom'
import _ from 'lodash'
import etch from 'etch'

const WORD_WIDTH = 32

function render_offset(is, l) {
  return <div>{_.padStart(is.toString(16), l, '0').toUpperCase()}0</div>
}

function render_hex(hs) {
  return (
    <div>
      {_.chunk(hs, 2).map((c) => <span>{c.join('').toUpperCase()}</span>)}
    </div>
  )
}

function hex2Ascii(hs) {
  const char = String.fromCharCode(parseInt(hs[0] + hs[1], 16))
  if (/[^\x20-\x7E]/.test(char)) {
    return '·'
  }
  return char
}

function render_ascii(hs) {
  return <div>{_.chunk(hs, 2).map(hex2Ascii)}</div>
}

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
    const stat = fs.statSync(this.editor.getPath());
    const offset_length = Math.floor(Math.log(stat.size) / Math.log(16))
    const data = _.chunk(fs.readFileSync(this.editor.getPath(), {encoding: "hex"}), WORD_WIDTH)
    return (
      <div className="hexer native-key-bindings" tabIndex="-1">
        <div className="hexer__offset">
          {data.map((hs, i) => render_offset(i, offset_length))}
        </div>
        <div className="hexer__hex">
          {data.map((hs, i) => render_hex(hs))}
        </div>
        <div className="hexer__ascii">
          {data.map((hs, i) => render_ascii(hs))}
        </div>
      </div>
    )
  }
}