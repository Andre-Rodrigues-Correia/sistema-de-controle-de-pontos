import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface FuncionarioState {
    horasTrabalhadasHoje: number;
    horasTrabalhadasSemana: {
        [key: string]: number;
    };
}

const initialState: FuncionarioState = {
    horasTrabalhadasHoje: 0,
    horasTrabalhadasSemana: {},
};

const funcionarioSlice = createSlice({
    name: 'funcionario',
    initialState,
    reducers: {
        setHorasTrabalhadasHoje(state, action: PayloadAction<number>) {
            state.horasTrabalhadasHoje = action.payload;
        },
        setHorasTrabalhadasSemana(state, action: PayloadAction<{ dia: string; horas: number }>) {
            state.horasTrabalhadasSemana[action.payload.dia] = action.payload.horas;
        },
        saveFuncionarioToBackend(state) {
            const hoje = new Date();
            const dataFormatada = hoje.toLocaleDateString('pt-BR');
            const horasTrabalhadas = state.horasTrabalhadasHoje;

            axios.post('/api/funcionario', {
                data: dataFormatada,
                horas: horasTrabalhadas,
            }).then(response => {
                console.log('Dados enviados com sucesso:', response.data);
            }).catch(error => {
                console.error('Erro ao enviar dados:', error);
            });
        },
    },
});

export const { setHorasTrabalhadasHoje, setHorasTrabalhadasSemana, saveFuncionarioToBackend } = funcionarioSlice.actions;
export default funcionarioSlice.reducer;
