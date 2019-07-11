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

export { CarregaTarefas, ConcluirTarefas };
