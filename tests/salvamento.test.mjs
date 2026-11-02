import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
const source = p => readFileSync(new URL('../src/' + p, import.meta.url), 'utf8');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const quiet = { log(){}, error(){} };
function storage(name, reject = false) {
  const calls = [];
  const body = source(`firebase/${name}.js`).split('export async function')[1];
  const fail = new Error('permission-denied');
  const fn = new Function('collection','addDoc','updateDoc','doc','db','console',
    'async function' + body + `; return ${name};`)(
    (...args)=>args,
    async (ref,data)=>{ if(reject) throw fail; calls.push({kind:'create',data});return {id:'new-id'}; },
    async (ref,data)=>{ if(reject) throw fail; calls.push({kind:'update',data}); },
    (...args)=>args, {}, quiet);
  return {fn,calls,fail};
}
for (const name of ['saveBudget','saveLead']) {
  test(`${name}: cria e devolve ID`, async()=>{
    const {fn,calls}=storage(name);assert.equal(await fn({nome:'Teste'}),'new-id');assert.equal(calls[0].kind,'create');
  });
  test(`${name}: atualiza o mesmo ID`, async()=>{
    const {fn,calls}=storage(name);assert.equal(await fn({nome:'Teste'},'old-id'),'old-id');assert.equal(calls[0].kind,'update');
  });
  for (const id of [null,'old-id']) test(`${name}: propaga falha ${id?'atualizando':'criando'}`,async()=>{
    const {fn,fail}=storage(name,true);await assert.rejects(fn({},id),e=>e===fail);
  });
}
test('orçamento: criação tem status Pendente',async()=>{
  const {fn,calls}=storage('saveBudget');await fn({});assert.equal(calls[0].data.status,'Pendente');
});
test('orçamento: edição sem status preserva o status existente',async()=>{
  const {fn,calls}=storage('saveBudget');await fn({clientName:'Novo nome'},'old-id');assert.equal(Object.hasOwn(calls[0].data,'status'),false);
  const database={status:'Aprovado',...calls[0].data};assert.equal(database.status,'Aprovado');
});
test('orçamento: status explícito é mantido',async()=>{
  const {fn,calls}=storage('saveBudget');await fn({status:'Enviado'},'old-id');assert.equal(calls[0].data.status,'Enviado');
});
const action = source('components/ui/ActionButtons.jsx');
const actionBody = action.split('const handleSave = async () => {')[1].split('// =========================')[0].replace(/};\s*$/,'');
async function clickSave(saveBudget,id='old-id',clientName='Teste',phone='75999999999') {
  const state={id,loading:false,alerts:[]};
  const fn=new AsyncFunction('clientName','phone','setLoading','saveBudget','budgetData','currentBudgetId','setCurrentBudgetId','alert','console',actionBody);
  await fn(clientName,phone,v=>state.loading=v,saveBudget,{},id,v=>state.id=v,v=>state.alerts.push(v),quiet);
  return state;
}
for (const value of [undefined,null,'','   ',12]) test(`interface: rejeita ID inválido ${JSON.stringify(value)}`,async()=>{
 const state=await clickSave(async()=>value);assert.equal(state.id,'old-id');assert.equal(state.loading,false);assert.deepEqual(state.alerts,['Erro ao salvar orçamento.']);
});
test('interface: falha mantém ID e libera botão',async()=>{
 const s=await clickSave(async()=>{throw Error('permission-denied')});assert.equal(s.id,'old-id');assert.equal(s.loading,false);assert.deepEqual(s.alerts,['Erro ao salvar orçamento.']);
});
test('interface: criação bem-sucedida mantém novo ID',async()=>{
 const s=await clickSave(async()=>'new-id',null);assert.equal(s.id,'new-id');assert.equal(s.loading,false);assert.deepEqual(s.alerts,['Orçamento salvo com sucesso.']);
});
test('interface: nome vazio impede gravação',async()=>{
 let called=false;const s=await clickSave(async()=>{called=true},null,'   ');assert.equal(called,false);assert.deepEqual(s.alerts,['Preencha nome e telefone.']);
});
const sidebar=source('components/LeadSidebar.jsx');
const sidebarBody=sidebar.split('async function handleSave(formData) {')[1].split('\n  return (')[0].replace(/}\s*$/,'');
test('lead: falha mantém formulário aberto e chega ao formulário',async()=>{
 let editing=true;
 const fn=new AsyncFunction('formData','lead','updateLead','setIsEditing','console',sidebarBody);
 await assert.rejects(fn({}, {id:'lead-id'},async()=>{throw Error('denied')},v=>editing=v,quiet));assert.equal(editing,true);
});
const kanban=source('pages/HistoricoLeads.jsx');
const kanbanBody=kanban.split('async function updateLeadStatus(id, oldStatus, newStatus, lead) {')[1].split('  const sensors')[0].replace(/}\s*$/,'');
for (const reject of [false,true]) test(`Kanban: lote ${reject?'rejeitado não altera os dados':'grava status e histórico juntos'}`,async()=>{
 const pending=[],database=[],alerts=[];
 const batch={update:(...a)=>pending.push(['update',...a]),set:(...a)=>pending.push(['set',...a]),commit:async()=>{if(reject)throw Error('denied');database.push(...pending)}};
 const fn=new AsyncFunction('id','oldStatus','newStatus','lead','doc','db','writeBatch','collection','console','alert',kanbanBody);
 await fn('lead-id','Novo','Em Contato',{nome:'Teste'},(...a)=>a,{},()=>batch,(...a)=>a,quiet,v=>alerts.push(v));
 assert.equal(database.length,reject?0:2);assert.equal(alerts.length,reject?1:0);
});
