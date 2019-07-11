const ativas = state => {
  return state.Tarefas.filter(tarefa => tarefa.status);
};
const todas = state => {
  return state.Tarefas;
};
const porId = state => id => {
  let p = state.Tarefas.filter(tarefa => tarefa.id === id);
  if (p.length > 0) {
    return state.Tarefas.filter(tarefa => tarefa.id === id);
  }
  return `Nenhuma tarefa com ID=${id} encontrada!`;
};
const maxId = state => {
  let maior = 0;
  for (var i = 0; i < state.Tarefas.length; i++) {
    if (state.Tarefas[i].id > maior) {
      maior = state.Tarefas[i].id;
    }
  }

  return maior;
};
export { ativas, todas, porId, maxId };
