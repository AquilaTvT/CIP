import {basicSetup, EditorView} from 'codemirror';
import {EditorState, Prec, StateEffect} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {indentWithTab} from '@codemirror/commands';
import {python} from '@codemirror/lang-python';
import {HighlightStyle, indentUnit, syntaxHighlighting} from '@codemirror/language';
import {tags} from '@lezer/highlight';

// Colours come from CSS custom properties, so light and dark appearance switch without a reconfigure.
const highlight = HighlightStyle.define([
  {tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword, tags.moduleKeyword, tags.operatorKeyword, tags.self, tags.bool, tags.null], color: 'var(--syntax-keyword)', fontWeight: '600'},
  {tag: [tags.string, tags.special(tags.string)], color: 'var(--syntax-string)'},
  {tag: [tags.number, tags.integer, tags.float], color: 'var(--syntax-number)'},
  {tag: [tags.comment, tags.lineComment], color: 'var(--syntax-comment)', fontStyle: 'italic'},
  {tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: 'var(--syntax-function)'},
  {tag: [tags.definition(tags.variableName), tags.definition(tags.function(tags.variableName))], color: 'var(--syntax-definition)'},
  {tag: [tags.className, tags.definition(tags.className), tags.standard(tags.variableName)], color: 'var(--syntax-type)'},
  {tag: [tags.propertyName, tags.attributeName], color: 'var(--syntax-property)'},
  {tag: [tags.operator, tags.punctuation, tags.bracket], color: 'var(--syntax-punctuation)'},
  {tag: tags.invalid, color: 'var(--red)'}
]);

const theme = dark =>
  EditorView.theme(
    {
      '&': {height: '100%', fontSize: 'var(--editor-size, 14px)', backgroundColor: 'var(--editor-bg)', color: 'var(--text)'},
      '.cm-scroller': {fontFamily: 'var(--mono)', lineHeight: '1.7', overflow: 'auto'},
      '.cm-content': {padding: '14px 0', caretColor: 'var(--accent)'},
      '.cm-line': {padding: '0 16px 0 10px'},
      '.cm-gutters': {border: 'none', backgroundColor: 'var(--editor-bg)', color: 'var(--quaternary)', fontSize: '12px'},
      '.cm-gutterElement': {padding: '0 6px 0 14px'},
      '.cm-activeLineGutter': {backgroundColor: 'transparent', color: 'var(--secondary)'},
      '.cm-activeLine': {backgroundColor: 'var(--editor-line)'},
      '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {backgroundColor: 'var(--editor-selection) !important'},
      '&.cm-focused': {outline: 'none'},
      '.cm-cursor': {borderLeftColor: 'var(--accent)', borderLeftWidth: '2px'},
      '.cm-matchingBracket, &.cm-focused .cm-matchingBracket': {backgroundColor: 'var(--editor-match)', outline: 'none'},
      '.cm-foldGutter .cm-gutterElement': {padding: '0 4px'},
      '.cm-panels': {backgroundColor: 'var(--fill)', color: 'var(--text)', fontSize: '13px', borderColor: 'var(--separator)'},
      '.cm-panels.cm-panels-bottom': {borderTop: '1px solid var(--separator)'},
      '.cm-textfield': {border: '1px solid var(--field-border)', borderRadius: '6px', background: 'var(--field)', color: 'var(--text)', padding: '3px 6px'},
      '.cm-button': {border: '1px solid var(--field-border)', borderRadius: '6px', backgroundImage: 'none', background: 'var(--control)', color: 'var(--text)'},
      '.cm-tooltip': {border: '1px solid var(--separator)', backgroundColor: 'var(--elevated)', color: 'var(--text)', borderRadius: '8px', fontSize: '13px'},
      '.cm-tooltip-autocomplete > ul > li[aria-selected]': {backgroundColor: 'var(--accent)', color: '#fff'},
      '.cm-searchMatch': {backgroundColor: 'var(--editor-match)', outline: '1px solid var(--accent)'},
      '.cm-searchMatch.cm-searchMatch-selected': {backgroundColor: 'var(--editor-selection)'}
    },
    {dark}
  );

const sessions = new Map();
let sessionGeneration = 0;

window.CIEditor = {
  clearSessions() {
    sessionGeneration++;
    sessions.clear();
  },
  mount(textarea, {onChange, onRun, onJudge, dark = false, problemKey = '', tabSize = 4, lineWrapping = false}) {
    const generation = sessionGeneration;
    const host = document.createElement('div');
    host.className = 'code-editor-host';
    textarea.before(host);
    textarea.hidden = true;
    const unit = tabSize === 2 ? 2 : 4;
    const shortcuts = [{key: 'Mod-Enter', run: () => (onRun(), true)}, indentWithTab];
    if (onJudge) shortcuts.unshift({key: 'Shift-Mod-Enter', run: () => (onJudge(), true)});
    const extensions = [
      basicSetup,
      python(),
      indentUnit.of(' '.repeat(unit)),
      EditorState.tabSize.of(unit),
      lineWrapping ? EditorView.lineWrapping : [],
      theme(dark),
      syntaxHighlighting(highlight),
      EditorView.contentAttributes.of({'aria-label': 'Python editor', spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off'}),
      Prec.highest(keymap.of(shortcuts)),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          textarea.value = update.state.doc.toString();
          onChange(textarea.value);
        }
      })
    ];
    const cached = sessions.get(problemKey);
    const initial =
      cached?.state.doc.toString() === textarea.value
        ? cached.state.update({effects: StateEffect.reconfigure.of(extensions)}).state
        : EditorState.create({doc: textarea.value, extensions});
    const view = new EditorView({parent: host, state: initial});
    if (cached) view.scrollDOM.scrollTop = cached.scrollTop;
    return {
      destroy() {
        // An editor mounted before an import/reset must not restore its old undo history.
        if (problemKey && generation === sessionGeneration) {
          sessions.delete(problemKey);
          sessions.set(problemKey, {state: view.state, scrollTop: view.scrollDOM.scrollTop});
          if (sessions.size > 12) sessions.delete(sessions.keys().next().value);
        }
        view.destroy();
        host.remove();
        textarea.hidden = false;
      },
      focus() {
        view.focus();
      },
      value() {
        return view.state.doc.toString();
      }
    };
  }
};
