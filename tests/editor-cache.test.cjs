/* Use CodeMirror's real history state; only its DOM view is replaced for this test. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {EditorState,Prec,StateEffect,Transaction}=require('@codemirror/state');
const {history,undo,undoDepth}=require('@codemirror/commands');
const source=fs.readFileSync(path.join(__dirname,'../scripts/editor-entry.js'),'utf8').replace(/^import .*;\s*$/gm,'');
function fixture(){
  const views=[];
  class View{
    static theme(){return []}
    static contentAttributes={of:()=>[]};
    static updateListener={of:()=>[]};
    static lineWrapping=[];
    constructor({state}){this.state=state;this.scrollDOM={scrollTop:0};this.dispatch=this.dispatch.bind(this);views.push(this)}
    destroy(){}
    focus(){}
    dispatch(transaction){this.state=transaction.state}
  }
  const context={window:{},document:{createElement:()=>({remove(){}})},Map,
    EditorState,Prec,StateEffect,EditorView:View,basicSetup:history(),python:()=>[],oneDark:[],
    indentUnit:{of:()=>[]},keymap:{of:()=>[]},indentWithTab:{}};
  vm.runInNewContext(source,context);
  const api=context.window.CIEditor;
  const mount=(key='problem')=>{const textarea={value:'',hidden:false,before(){}};const editor=api.mount(textarea,{problemKey:key,onChange(){},onRun(){}});return {editor,view:views.at(-1)}};
  const editThenErase=view=>{
    view.state=view.state.update({changes:{from:0,insert:'print("old private code")'},annotations:Transaction.time.of(1000)}).state;
    view.state=view.state.update({changes:{from:0,to:view.state.doc.length,insert:''},annotations:Transaction.time.of(2000)}).state;
    assert.equal(undoDepth(view.state),2);
  };
  return{api,mount,editThenErase};
}

test('ordinary remounts preserve useful undo history when the document is unchanged',()=>{
  const f=fixture(),a=f.mount();f.editThenErase(a.view);a.editor.destroy();
  const b=f.mount();assert.equal(undoDepth(b.view.state),2);assert.equal(undo(b.view),true);
  assert.equal(b.view.state.doc.toString(),'print("old private code")');
});

test('clearing sessions removes old undo history even when the replacement document is identical',()=>{
  const f=fixture(),a=f.mount();f.editThenErase(a.view);a.editor.destroy();f.api.clearSessions();
  const b=f.mount();assert.equal(b.view.state.doc.toString(),'');assert.equal(undoDepth(b.view.state),0);assert.equal(undo(b.view),false);
});

test('an old mounted editor cannot repopulate the cache after an import or reset',()=>{
  const f=fixture(),old=f.mount('lesson:first-program');f.editThenErase(old.view);
  f.api.clearSessions();old.editor.destroy();
  const replacement=f.mount('lesson:first-program');assert.equal(undoDepth(replacement.view.state),0);assert.equal(undo(replacement.view),false);
});
