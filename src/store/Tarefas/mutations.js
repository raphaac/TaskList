const CarregaTarefas = (state, payload) => {
  state.Tarefas = [];
  state.Tarefas.push(...payload);
};

const ConcluirTarefas = (state, payload) => {
  state.Tarefas.forEach(tar => {
    if (tar.id === payload.id) {
      tar.status = true;
    }
  });
};

// const AlterarTarefas = (state, payload) => {
//   console.log(payload);
//   state.Tarefas.forEach(tar => {
//     console.log(tar);
//     if (tar.id === payload.id) {
//       tar.titulo = payload.titulo;
//     }
//   });
// };

// const addTarefa = (state, payload) => {
//   state.Tarefa.push({ ...payload });
// };
// const removeTarefa = (state, index) => {
//   state.Tarefa.splice(index, 1);
// };

export { CarregaTarefas, ConcluirTarefas };
