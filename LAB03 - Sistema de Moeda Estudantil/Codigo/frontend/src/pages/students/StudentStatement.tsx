import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudent } from "../../api/students";
import { getExtratoAluno } from "../../api/transactions";
import type { Aluno, Transacao } from "../../types";

export default function StudentStatement() {
    const { id } = useParams();
    const [aluno, setAluno] = useState<Aluno | null>(null);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    useEffect(() => {
        (async () => {
            const alunoData = await getStudent(id!);
            setAluno(alunoData);
            const extrato = await getExtratoAluno(id!);
            setTransacoes(extrato);
        })();
    }, [id]);

    if (!aluno) return <div className="card">Carregando...</div>;

    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Coluna da esquerda — informações básicas */}
            <div className="card">
                <div className="text-xl font-bold mb-4">Extrato do Aluno</div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div><dt className="text-white/60">Nome</dt><dd>{aluno.nome}</dd></div>
                    <div><dt className="text-white/60">Email</dt><dd>{aluno.email}</dd></div>
                    <div><dt className="text-white/60">CPF</dt><dd>{aluno.cpf}</dd></div>
                    <div><dt className="text-white/60">Curso</dt><dd>{aluno.curso}</dd></div>
                    <div><dt className="text-white/60">Instituição</dt><dd>{aluno.instituicaoEnsino?.nome}</dd></div>
                    <div><dt className="text-white/60">Saldo Atual</dt><dd>{aluno.saldoMoedas} moedas</dd></div>
                </dl>

                <div className="mt-6 flex gap-3">
                    <Link to={`/alunos/${aluno.id}/carteira`} className="btn btn-primary">
                        Voltar à Carteirinha
                    </Link>
                    <Link to="/alunos" className="btn">
                        Voltar à Lista
                    </Link>
                </div>
            </div>

            {/* Coluna da direita — extrato de transações */}
            <div className="card">
                <div className="text-xl font-bold mb-4">Movimentações</div>
                {transacoes.length === 0 ? (
                    <p>Nenhuma transação encontrada.</p>
                ) : (
                    <ul className="space-y-3">
                        {transacoes.map((t) => (
                            <li
                                key={t.id}
                                className="border border-white/10 rounded-lg p-3 flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-semibold">{t.descricao}</div>
                                    <div className="text-sm text-white/60">
                                        Recebido de: {t.professor?.nome || "—"}
                                    </div>
                                    <div className="text-xs text-white/40">
                                        {new Date(t.data).toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-green-400 font-bold">+{t.valor}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}