export default function BudgetForm({
  clientName,
  setClientName,

  phone,
  setPhone,

  address,
  setAddress,

  description,
  setDescription,

  projectCategory,
  setProjectCategory,

  projectObjective,
  setProjectObjective,

  serviceScope,
  setServiceScope,

  priorityLevel,
  setPriorityLevel,

  proposalValidity,
  setProposalValidity,

  technicalResponsible,
  setTechnicalResponsible,

  installationLocations,
  setInstallationLocations,

  technicalNotes,
  setTechnicalNotes,

  includedServices,
  setIncludedServices,

  generalConditions,
setGeneralConditions,

projectPresentationUrl,
setProjectPresentationUrl,
}) {

  return (

    <div className="space-y-10 mb-10">

      {/* ================================= */}
      {/* DADOS DO CLIENTE */}
      {/* ================================= */}
      <div>

        <h3 className="text-xl font-semibold text-cyan-400 mb-6">

          Dados do Cliente

        </h3>

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

        <div className="mt-6">

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

      </div>

      {/* ================================= */}
      {/* INFORMAÇÕES TÉCNICAS */}
      {/* ================================= */}
      <div>

        <h3 className="text-xl font-semibold text-cyan-400 mb-6">

          Informações Técnicas

        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* CATEGORIA */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Categoria do Projeto
            </label>

            <select
              value={projectCategory}
              onChange={(e) =>
                setProjectCategory(e.target.value)
              }
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            >

              <option value="">
                Selecione
              </option>

              <option value="CFTV">
                CFTV
              </option>

              <option value="Rede Estruturada">
                Rede Estruturada
              </option>

              <option value="Automação">
                Automação
              </option>

              <option value="Elétrica Residencial">
                Elétrica Residencial
              </option>

              <option value="Controle de Acesso">
                Controle de Acesso
              </option>

            </select>

          </div>

          {/* PRIORIDADE */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Prioridade
            </label>

            <select
              value={priorityLevel}
              onChange={(e) =>
                setPriorityLevel(e.target.value)
              }
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            >

              <option value="">
                Selecione
              </option>

              <option value="Baixa">
                Baixa
              </option>

              <option value="Média">
                Média
              </option>

              <option value="Alta">
                Alta
              </option>

              <option value="Urgente">
                Urgente
              </option>

            </select>

          </div>

          {/* VALIDADE */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Validade da Proposta
            </label>

            <input
              type="text"
              value={proposalValidity}
              onChange={(e) =>
                setProposalValidity(e.target.value)
              }
              placeholder="Ex: 15 dias"
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* RESPONSÁVEL */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Responsável Técnico
            </label>

            <input
              type="text"
              value={technicalResponsible}
              onChange={(e) =>
                setTechnicalResponsible(e.target.value)
              }
              placeholder="Nome do responsável"
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* ESCOPO E OBJETIVO */}
      {/* ================================= */}
      <div>

        <h3 className="text-xl font-semibold text-cyan-400 mb-6">

          Escopo da Proposta

        </h3>

        <div className="space-y-6">

          {/* OBJETIVO */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Objetivo do Projeto
            </label>

            <textarea
              rows="4"
              value={projectObjective}
              onChange={(e) =>
                setProjectObjective(e.target.value)
              }
              placeholder="Descreva o objetivo da proposta..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* ESCOPO */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Escopo Técnico
            </label>

            <textarea
              rows="4"
              value={serviceScope}
              onChange={(e) =>
                setServiceScope(e.target.value)
              }
              placeholder="Instalação, configuração, integração, testes..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* LOCAIS */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Locais da Instalação
            </label>

            <textarea
              rows="4"
              value={installationLocations}
              onChange={(e) =>
                setInstallationLocations(e.target.value)
              }
              placeholder="Recepção, corredores, estacionamento..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* SERVIÇOS INCLUSOS */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Serviços Inclusos
            </label>

            <textarea
              rows="4"
              value={includedServices}
              onChange={(e) =>
                setIncludedServices(e.target.value)
              }
              placeholder="Instalação, configuração, suporte inicial..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* OBSERVAÇÕES */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Observações Técnicas
            </label>

            <textarea
              rows="4"
              value={technicalNotes}
              onChange={(e) =>
                setTechnicalNotes(e.target.value)
              }
              placeholder="Necessidade de internet estável, ajustes futuros..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* CONDIÇÕES */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Condições Gerais
            </label>

            <textarea
              rows="4"
              value={generalConditions}
              onChange={(e) =>
                setGeneralConditions(e.target.value)
              }
              placeholder="Garantia, prazo, suporte, validade..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>
{/* VISUALIZAÇÃO DO PROJETO */}
<div>

  <label className="block text-sm text-cyan-400 mb-2 font-semibold">
    🎥 Link do Vídeo de Apresentação
  </label>

  <input
    type="url"
    value={projectPresentationUrl}
    onChange={(e) =>
      setProjectPresentationUrl(e.target.value)
    }
    placeholder="https://youtube.com/watch?v=..."
    className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
  />

  <p className="text-xs text-gray-500 mt-2">
    Opcional. Adicione um vídeo demonstrando a solução proposta para o cliente.
  </p>

</div>
          {/* DESCRIÇÃO */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Descrição Geral
            </label>

            <textarea
              rows="4"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Informações adicionais..."
              className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

          </div>

        </div>

      </div>

    </div>
  )
}