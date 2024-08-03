import React, { useState, useEffect, useRef } from 'react';

// Definindo a estrutura do objeto Funcionário
interface Funcionario {
    horasTrabalhadasHoje: number;
    horasTrabalhadasSemana: {
        [key: string]: number;
    };
}

const RegistroHorario: React.FC = () => {
    const [tempoTrabalhado, setTempoTrabalhado] = useState<number>(0); // Tempo trabalhado em segundos
    const [isWorking, setIsWorking] = useState<boolean>(false); // Indica se o funcionário está trabalhando
    const [ultimoRegistro, setUltimoRegistro] = useState<number | null>(null); // Último valor do temporizador

    const temporizadorRef = useRef<number | null>(null); // Referência para o temporizador

    useEffect(() => {
        if (isWorking) {
            temporizadorRef.current = window.setInterval(() => {
                setTempoTrabalhado(prev => prev + 1);
            }, 1000);
        } else {
            if (temporizadorRef.current) {
                clearInterval(temporizadorRef.current);
            }
        }

        return () => {
            if (temporizadorRef.current) {
                clearInterval(temporizadorRef.current);
            }
        };
    }, [isWorking]);

    const registrarHorario = () => {
        if (isWorking) {
            // Registrar a saída
            setUltimoRegistro(tempoTrabalhado);
            setIsWorking(false);
        } else {
            // Registrar a entrada
            setIsWorking(true);
        }
    };

    const formatarTempo = (segundos: number): string => {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    };

    const salvarFuncionario = () => {
        if (ultimoRegistro !== null) {
            const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }); // Exemplo: "segunda-feira"
            const funcionario: Funcionario = {
                horasTrabalhadasHoje: ultimoRegistro / 3600, // Convertendo segundos para horas
                horasTrabalhadasSemana: {
                    [hoje]: (ultimoRegistro / 3600) // Exemplo para o dia da semana atual
                }
            };

            console.log('Dados do Funcionário:', funcionario);
        }
    };

    useEffect(() => {
        salvarFuncionario();
    }, [ultimoRegistro]);

    return (
        <div>
            <h1>Registro de Horário</h1>
            <p>Tempo Trabalhado Hoje: {formatarTempo(tempoTrabalhado)}</p>
            <button onClick={registrarHorario}>
                {isWorking ? 'Registrar Saída' : 'Registrar Entrada'}
            </button>
        </div>
    );
};

export default RegistroHorario;
