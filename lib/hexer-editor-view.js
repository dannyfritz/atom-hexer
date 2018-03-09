/** @babel */
/** @jsx etch.dom */

import fs from 'fs-plus'
import {Emitter, CompositeDisposable, Disposable} from 'atom'
import _ from 'lodash'
import etch from 'etch'
import {hex_to_ansi} from './hex-to-ansi.js'

const WORD_WIDTH = 32

function render_offset(offset, digits) {
  return <div>{_.padStart(offset.toString(16), digits, '0').toUpperCase()}0</div>
}

function render_hex(hs) {
  return (
    <div>
      {_.chunk(hs, 2).map((c) => <span>{c.join('').toUpperCase()}</span>)}
    </div>
  )
}

function render_ansi_char(value, offset) {
  return <span data-offset={offset}>{value}</span>
}

function render_ansi(hs, offset) {
  return <div>{_.chunk(hs, 2).map(hex_to_ansi).map((v, i) => render_ansi_char(v, i * 2 + offset))}</div>
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
    const digits = Math.floor(Math.log(stat.size) / Math.log(16))
    const data = _.chunk(fs.readFileSync(this.editor.getPath(), {encoding: "hex"}), WORD_WIDTH)
    return (
      <div className="hexer native-key-bindings" tabIndex="-1">
        <div className="hexer__offset">
          {data.map((hs, offset) => render_offset(offset, digits))}
        </div>
        <div className="hexer__hex">
          {data.map((hs, offset) => render_hex(hs))}
        </div>
        <div className="hexer__ascii">
          {data.map((hs, offset) => render_ansi(hs, offset * (WORD_WIDTH / 2)))}
        </div>
      </div>
    )
  }
}
