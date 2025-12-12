// 📁 src/pages/companies/CompanyVantagensForm.tsx

import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

type VantagemForm = {
    nome: string;
    descricao: string;
    custoEmMoedas: number;
    foto: string; // pode ser URL ou Base64
};

export default function CompanyVantagensForm() {
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const navigate = useNavigate();

    const empresaId = Number(localStorage.getItem("empresaId")); // PEGAMOS O ID DA EMPRESA

    const [form, setForm] = useState<VantagemForm>({
        nome: "",
        descricao: "",
        custoEmMoedas: 0,
        foto: "",
    });

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    /* Carregar vantagem para edição */
    useEffect(() => {
        if (!isEdit) return;

        async function carregarVantagem() {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:8080/vantagens/${id}`);
                if (!res.ok) throw new Error("Erro ao carregar vantagem");

                const data = await res.json();

                setForm({
                    nome: data.nome ?? "",
                    descricao: data.descricao ?? "",
                    custoEmMoedas: data.custoEmMoedas ?? 0,
                    foto: data.foto ?? "",
                });
            } catch (e) {
                console.error(e);
                setErro("Erro ao carregar dados da vantagem.");
            } finally {
                setLoading(false);
            }
        }

        carregarVantagem();
    }, [id, isEdit]);

    /* Manipular inputs */
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "custoEmMoedas"
                    ? Number(value.replace(/\D/g, "")) || 0
                    : value,
        }));
    }

    /* Upload de arquivo → Base64 */
    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                foto: String(reader.result),
            }));
        };
        reader.readAsDataURL(file);
    }

    /* Enviar formulário */
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErro(null);

        if (!form.nome.trim()) return setErro("O nome da vantagem é obrigatório.");
        if (!form.descricao.trim()) return setErro("A descrição é obrigatória.");
        if (form.custoEmMoedas <= 0)
            return setErro("O custo em moedas deve ser maior que zero.");
        if (!form.foto.trim()) return setErro("A imagem é obrigatória.");

        try {
            setLoading(true);

            const method = isEdit ? "PUT" : "POST";
            const url = isEdit
                ? `http://localhost:8080/vantagens/${id}`
                : "http://localhost:8080/vantagens";

            // AQUI ESTÁ O PAYLOAD CORRIGIDO
            const payload = {
                ...form,
                empresaParceira: { id: empresaId },
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Erro ao salvar vantagem");

            navigate("/empresas/vantagens");
        } catch (e) {
            console.error(e);
            setErro("Erro ao salvar vantagem.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Fundo FULL HD */}
            <div
                className="fixed inset-0 bg-cover bg-center -z-10 brightness-70"
                style={{ backgroundImage: "url('/images/cadastrar_editar.jpg')" }}
            />

            <div className="card max-w-2xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4 text-white">
                    {isEdit ? "✏️ Editar Vantagem" : "➕ Nova Vantagem"}
                </h1>

                {erro && <p className="text-red-400 mb-3">{erro}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Nome */}
                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            Nome da vantagem
                        </label>
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            className="input w-full"
                        />
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            Descrição
                        </label>
                        <textarea
                            name="descricao"
                            value={form.descricao}
                            onChange={handleChange}
                            className="input w-full min-h-[80px]"
                        />
                    </div>

                    {/* Custo */}
                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            Custo em moedas
                        </label>
                        <input
                            type="number"
                            name="custoEmMoedas"
                            value={form.custoEmMoedas}
                            onChange={handleChange}
                            className="input w-full"
                        />
                    </div>

                    {/* URL da foto */}
                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            URL da imagem
                        </label>
                        <input
                            type="text"
                            name="foto"
                            value={form.foto}
                            onChange={handleChange}
                            className="input w-full"
                        />
                    </div>

                    {/* Upload */}
                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            Ou envie uma imagem
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="input w-full bg-[#0b1636]"
                        />
                    </div>

                    {form.foto && (
                        <img
                            src={form.foto}
                            alt="Prévia"
                            className="mt-3 h-32 object-contain rounded bg-slate-900/70 p-2"
                        />
                    )}

                    <div className="flex justify-between mt-4">
                        <Link to="/empresas/vantagens" className="btn">
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}