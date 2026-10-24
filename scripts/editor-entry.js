import {basicSetup, EditorView} from 'codemirror';
import {EditorState, Prec, StateEffect} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {indentWithTab} from '@codemirror/commands';
import {python} from '@codemirror/lang-python';
import {indentUnit} from '@codemirror/language';
import {oneDark} from '@codemirror/theme-one-dark';

const theme = EditorView.theme({
  '&': {height:'100%', fontSize:'var(--editor-size, 14px)', backgroundColor:'var(--surface)', color:'var(--text)'},
  '.cm-scroller': {fontFamily:'var(--mono)', lineHeight:'1.85', overflow:'auto'},
  '.cm-content': {padding:'18px 0', caretColor:'var(--accent)'},
  '.cm-line': {padding:'0 18px 0 12px'},
  '.cm-gutters': {border:'none', backgroundColor:'var(--surface)', color:'var(--tertiary)', fontSize:'10px'},
  '.cm-gutterElement': {padding:'0 8px 0 15px'},
  '.cm-activeLineGutter': {backgroundColor:'var(--surface-soft)', color:'var(--text)'},
  '.cm-activeLine': {backgroundColor:'var(--surface-soft)'},
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {backgroundColor:'var(--accent-soft)'},
  '&.cm-focused': {outline:'none'},
  '.cm-cursor': {borderLeftColor:'var(--accent)'},
  '.cm-foldGutter .cm-gutterElement': {padding:'0 3px'},
  '.cm-panels': {backgroundColor:'var(--surface-soft)', color:'var(--text)', fontSize:'11px'},
  '.cm-textfield, .cm-button': {border:'1px solid var(--line-strong)', borderRadius:'5px', background:'var(--surface)', color:'var(--text)'},
  '.cm-tooltip': {border:'1px solid var(--line)', backgroundColor:'var(--surface)', color:'var(--text)', borderRadius:'7px', fontSize:'11px'},
  '.cm-searchMatch': {backgroundColor:'var(--accent-soft)', outline:'1px solid var(--accent)'},
});

const sessions = new Map();
let sessionGeneration = 0;

window.CIEditor = {
  clearSessions() {
    sessionGeneration++;
    sessions.clear();
  },
  mount(textarea, {onChange, onRun, dark = false, problemKey = '', tabSize = 4, lineWrapping = false}) {
    const generation = sessionGeneration;
    const host = document.createElement('div');
    host.className = 'code-editor-host';
    textarea.before(host);
    textarea.hidden = true;
    const extensions = [
          basicSetup, python(), indentUnit.of(' '.repeat(tabSize === 2 ? 2 : 4)), EditorState.tabSize.of(tabSize === 2 ? 2 : 4),
          lineWrapping ? EditorView.lineWrapping : [],
          dark ? oneDark : [], theme,
          EditorView.contentAttributes.of({'aria-label':'Python editor', 'spellcheck':'false'}),
          Prec.highest(keymap.of([{key:'Mod-Enter', run:() => {onRun(); return true;}}, indentWithTab])),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              textarea.value = update.state.doc.toString();
              onChange(textarea.value);
            }
          }),
        ];
    const cached = sessions.get(problemKey);
    const initial = cached?.state.doc.toString() === textarea.value
      ? cached.state.update({effects:StateEffect.reconfigure.of(extensions)}).state
      : EditorState.create({doc:textarea.value,extensions});
    const view = new EditorView({parent:host,state:initial});
    if (cached) view.scrollDOM.scrollTop = cached.scrollTop;
    return {
      destroy() {
        // An editor mounted before an import/reset must not restore its old undo history.
        if (problemKey && generation === sessionGeneration) {
          sessions.delete(problemKey);
          sessions.set(problemKey, {state:view.state,scrollTop:view.scrollDOM.scrollTop});
          if (sessions.size > 12) sessions.delete(sessions.keys().next().value);
        }
        view.destroy(); host.remove(); textarea.hidden = false;
      },
      focus() {view.focus();},
      value() {return view.state.doc.toString();},
    };
  },
};
