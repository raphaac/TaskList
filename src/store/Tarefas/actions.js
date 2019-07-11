import axios from "axios";

async function BuscarTarefas({ commit }) {
  axios
    .get("http://localhost:3000/tarefas")
    .then(response => {
      //   this.info = response.data;
      commit("CarregaTarefas", response.data);
    })
    .catch(error => {
      console.log(error);
      //   this.errored = true;
    })
    .finally();
}

async function AdicionarTarefa({ dispatch }, novaTarefa) {
  axios
    .post("http://localhost:3000/tarefas", novaTarefa)
    .then(() => {
      //   this.info = response.data;
      dispatch("BuscarTarefas");
    })
    .catch(error => {
      console.log(error);
      //   this.errored = true;
    })
    .finally();
}

async function AlterarTarefa({ dispatch }, tarefa) {
  axios
    .put("http://localhost:3000/tarefas/" + tarefa.id, tarefa)
    .then(() => {
      //   this.info = response.data;
      dispatch("BuscarTarefas");
    })
    .catch(error => {
      console.log(error);
      //   this.errored = true;
    })
    .finally();
}

async function DeletarTarefa({ dispatch }, tarefa) {
  axios
    .delete("http://localhost:3000/tarefas/" + tarefa.id, tarefa)
    .then(() => {
      //   this.info = response.data;
      dispatch("BuscarTarefas");
    })
    .catch(error => {
      console.log(error);
      //   this.errored = true;
    })
    .finally();
}

export { BuscarTarefas, AdicionarTarefa, AlterarTarefa, DeletarTarefa };
