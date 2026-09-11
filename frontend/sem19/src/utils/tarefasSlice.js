import { createSlice } from '@reduxjs/toolkit';

const tarefasSlice = createSlice({
  name: 'tarefas',

  initialState: {
    lista: []
  },

  reducers: {
    adicionarTarefa: (state, action) => {
      state.lista.push({
        id: Date.now(),
        titulo: action.payload,
        concluida: false,
      });
    },

    concluirTarefa: (state, action) => {
      const tarefa = state.lista.find(tarefa => tarefa.id === action.payload);
      if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
      }
    },

    removerTarefa: (state, action) => {
      state.lista = state.lista.filter(
        tarefa => tarefa.id !== action.payload
      );
    }
  }
});

export const { adicionarTarefa, removerTarefa, concluirTarefa } = tarefasSlice.actions;
export default tarefasSlice.reducer;
