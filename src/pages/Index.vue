<template>
  <q-page class="q-pa-md q-gutter-sm full-width justify-center">
    <q-btn label="Nova Tarefa" color="primary" @click="prompt = true" />

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Nova Tarefa</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="tituloTarefa" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup @click="limpaInput()" />
          <q-btn flat :label= 'adic ? "Adicionar" : "Editar"' v-close-popup @click="addtarefa()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-list bordered separator style="width: 40%">
      <q-item
        v-bind:class="{'bg-green-2' : tarefa.status, 'bg-red-2' : !tarefa.status}" :key="tarefa.titulo" v-for="(tarefa) in Tarefas" clickable v-ripple>
        <q-item-section @click="finalizaTarefa(tarefa)">{{tarefa.titulo}}          
        </q-item-section>        
        <q-btn flat color="red-8" icon="delete" @click="excluirTarefa(tarefa)" size="md"/>

        <q-btn flat color="yellow-10" icon="edit" @click="editarTarefa(tarefa)" size="md"/>
      </q-item>
    </q-list>   
  </q-page>
</template>
<style></style>

<script>
const alerts = [
  { color: 'positive', message: 'Adicionado com sucesso!', icon: 'thumb_up' },
  { color: 'teal', message: 'Alterado com sucesso!', icon: 'thumb_up' },
  { color: 'purple', message: 'Tarefa concluída com sucesso!', icon: 'tag_faces' },
  { color: 'positive', message: 'Excluído com sucesso!', icon: 'delete' },
  
]
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "PageIndex",
  data() {
    return {
      prompt: false,
      tarefas: [],
      tituloTarefa: "", 
      id:0,     
      info: null,
      loading: true,
      errored: false,
      adic: true,
      alert: 0,
    };
  },
  computed: {  
     Tarefas() {
       return this.$store.state.Tarefas.Tarefas.filter(function(tarefa){
         return tarefa.excluido == false
       });
     },

     ...mapGetters("Tarefas", ["ativas", "todas", "porId", "maxId"])
  },
  mounted () {
    this.BuscarTarefas();
  },
  methods: {
    ...mapActions('Tarefas', ['BuscarTarefas', 'AdicionarTarefa', 'AlterarTarefa', 'DeletarTarefa']),
    ...mapMutations('Tarefas', ['ConcluirTarefas']),

    addtarefa() {      
      let tarefa = {};
      
      tarefa.id = 0;
      tarefa.titulo = this.tituloTarefa;
      tarefa.status = false;
      tarefa.excluido = false;
      
      this.limpaInput();

      if (this.adic) {        
        tarefa.id = this.maxId+1;
        this.AdicionarTarefa(tarefa);
        this.alert = 0;
        this.showNotif('center');
      }
      else{
        tarefa.id = this.id;
        this.AlterarTarefa(tarefa);
        this.alert = 1;
        this.showNotif('center');
        this.adic = true;
      }

    },
    editarTarefa(tarefa){
      this.prompt = true;
      this.adic = false;
      this.id = tarefa.id;
      this.tituloTarefa = tarefa.titulo;      
    },
    excluirTarefa(tarefa){      
      this.DeletarTarefa(tarefa);
      this.alert = 3;
      this.showNotif('center');
    },
    finalizaTarefa(tarefa) {        
      this.ConcluirTarefas(tarefa);
      this.alert = 2;
      this.showNotif('center');
    },  
    exibe() {
      this.limpaInput();
    },
    limpaInput() {
      this.tituloTarefa = "";
    },
    showNotif (position) {
      const { color, textColor, multiLine, icon, message, avatar } = alerts[ this.alert ]      

      this.$q.notify({
        color,
        textColor,
        icon: icon,
        message,
        position,
        avatar,
        multiLine,
        actions: null,
        timeout: 3000
      })
    }
  }
};
</script>
