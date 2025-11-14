import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProfessor } from "../../api/professors";
import type { Professor } from "../../types";

export default function ProfessorProfile() {
    const { id } = useParams();
    const [professor, setProfessor] = useState<Professor | null>(null);

    useEffect(() => {
        (async () => {
            const p = await getProfessor(id!);
            setProfessor(p);
        })();
    }, [id]);

    if (!professor) return <div className="card">Carregando...</div>;

    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Card principal */}
            <div className="card">
                <div className="text-xl font-bold mb-4">Carteirinha do Professor</div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                        <dt className="text-white/60">Nome</dt>
                        <dd>{professor.nome}</dd>
                    </div>
                    <div>
                        <dt className="text-white/60">Email</dt>
                        <dd>{professor.email}</dd>
                    </div>
                    <div>
                        <dt className="text-white/60">CPF</dt>
                        <dd>{professor.cpf}</dd>
                    </div>
                    <div>
                        <dt className="text-white/60">Departamento</dt>
                        <dd>{professor.departamento}</dd>
                    </div>
                    <div>
                        <dt className="text-white/60">Instituição</dt>
                        <dd>{professor.instituicaoEnsino?.nome ?? "—"}</dd>
                    </div>
                    <div>
                        <dt className="text-white/60">Saldo de Moedas</dt>
                        <dd>{professor.saldoMoedas} moedas</dd>
                    </div>
                </dl>

                <div className="mt-6 flex gap-3 flex-wrap">
                    <Link
                        to="/professores/painel"
                        className="btn btn-primary"
                    >
                        Enviar moedas / Extrato
                    </Link>
                    <Link
                        to="/"
                        className="btn"
                    >
                        Voltar ao início
                    </Link>
                </div>
            </div>

            {/* Card lateral (opcional, igual aluno) */}
            <div className="card">
                <div className="text-xl font-bold mb-4">Informações</div>
                <p className="text-white/70 text-sm mb-3">
                    Este professor está vinculado ao sistema de mérito estudantil e pode distribuir até 1.000 moedas por semestre, acumulando o saldo não utilizado.
                </p>
                <ul className="space-y-2 text-sm">
                    <li>• Pode enviar moedas para alunos vinculados à instituição.</li>
                    <li>• Deve informar o motivo do reconhecimento.</li>
                    <li>• Pode consultar seu extrato de envios.</li>
                </ul>
            </div>
        </div>
    );
}