import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  "Novo",
  "Em Contato",
  "Proposta Enviada",
  "Fechado",
  "Perdido",
];

export default function LeadForm({
  lead = {},
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    servico: "",
    descricao: "",
    origem: "",
    status: "Novo",
  });

  useEffect(() => {
    setFormData({
      nome: lead?.nome || "",
      telefone: lead?.telefone || "",
      cidade: lead?.cidade || "",
      servico: lead?.servico || "",
      descricao: lead?.descricao || "",
      origem: lead?.origem || "",
      status: lead?.status || "Novo",
    });
  }, [lead]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (onSave) {
      onSave(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="mb-1 block text-sm font-medium">
          Nome
        </label>

        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Telefone
        </label>

        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Cidade
        </label>

        <input
          type="text"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Serviço
        </label>

        <input
          type="text"
          name="servico"
          value={formData.servico}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Origem
        </label>

        <input
          type="text"
          name="origem"
          value={formData.origem}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Descrição
        </label>

        <textarea
          rows={4}
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full rounded-lg border border-cyan-500/20 bg-[#0B1220] px-3 py-2"
        />
      </div>

      <div className="flex gap-3 pt-2">

        <button
          type="submit"
          className="flex-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 py-2"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-cyan-500/20"
        >
          Cancelar
        </button>

      </div>

    </form>
  );
}