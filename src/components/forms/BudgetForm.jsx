export default function BudgetForm({
  clientName,
  setClientName,
  phone,
  setPhone,
  address,
  setAddress,
  description,
  setDescription,
}) {

  return (

    <div className="space-y-6 mb-10">

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Nome do Cliente
          </label>

          <input
            type="text"
            value={clientName}
            onChange={(e) =>
              setClientName(e.target.value)
            }
            placeholder="Digite o nome do cliente"
            className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Telefone
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="(75) 99999-9999"
            className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
        </div>

      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Endereço
        </label>

        <input
          type="text"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          placeholder="Digite o endereço"
          className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Descrição do Serviço
        </label>

        <textarea
          rows="4"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Descreva o serviço..."
          className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>

    </div>
  )
}