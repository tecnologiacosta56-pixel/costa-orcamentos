export default function ServiceTable({ items, setItems }) {

  function formatCurrency(value) {

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function addItem() {

    const newItem = {
      id: Date.now(),
      type: "Serviço",
      name: "",
      quantity: 1,
      price: 0,
    }

    setItems([...items, newItem])
  }

  function removeItem(id) {

    setItems(
      items.filter(item => item.id !== id)
    )
  }

  function updateItem(id, field, value) {

    setItems(
      items.map(item =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    )
  }

  return (

    <div className="mt-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

        <h3 className="text-2xl font-bold text-cyan-400">
          Serviços e Produtos
        </h3>

        <button
          onClick={addItem}
          className="bg-cyan-500 hover:bg-cyan-400 transition-all px-5 py-3 rounded-xl font-semibold text-black shadow-lg shadow-cyan-500/20 w-full md:w-auto"
        >
          + Adicionar
        </button>

      </div>

      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-cyan-500/20">

        <table className="w-full">

          <thead className="bg-[#081120]">

            <tr>

              <th className="text-left p-4 text-gray-300">
                Tipo
              </th>

              <th className="text-left p-4 text-gray-300">
                Descrição
              </th>

              <th className="text-left p-4 text-gray-300">
                Qtd
              </th>

              <th className="text-left p-4 text-gray-300">
                Valor
              </th>

              <th className="text-left p-4 text-gray-300">
                Subtotal
              </th>

              <th className="text-left p-4 text-gray-300">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item) => {

              const subtotal =
                item.quantity * item.price

              return (

                <tr
                  key={item.id}
                  className="border-t border-cyan-500/10"
                >

                  <td className="p-4">

                    <select
                      value={item.type}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "type",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white"
                    >

                      <option>
                        Serviço
                      </option>

                      <option>
                        Produto
                      </option>

                    </select>

                  </td>

                  <td className="p-4">

                    <input
                      type="text"
                      placeholder="Descrição"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
                    />

                  </td>

                  <td className="p-4">

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="w-24 bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
                    />

                  </td>

                  <td className="p-4">

                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "price",
                          Number(e.target.value)
                        )
                      }
                      className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
                    />

                  </td>

                  <td className="p-4 text-green-400 font-bold">

                    {formatCurrency(subtotal)}

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="bg-red-500 hover:bg-red-400 transition-all px-4 py-2 rounded-xl font-semibold text-black"
                    >
                      Remover
                    </button>

                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col gap-5">

        {items.map((item) => {

          const subtotal =
            item.quantity * item.price

          return (

            <div
              key={item.id}
              className="bg-[#081120] border border-cyan-500/20 rounded-2xl p-4 space-y-4"
            >

              <div>

                <label className="text-sm text-gray-400 mb-2 block">
                  Tipo
                </label>

                <select
                  value={item.type}
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "type",
                      e.target.value
                    )
                  }
                  className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white"
                >

                  <option>
                    Serviço
                  </option>

                  <option>
                    Produto
                  </option>

                </select>

              </div>

              <div>

                <label className="text-sm text-gray-400 mb-2 block">
                  Descrição
                </label>

                <input
                  type="text"
                  placeholder="Descrição"
                  value={item.name}
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="text-sm text-gray-400 mb-2 block">
                    Quantidade
                  </label>

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-400 mb-2 block">
                    Valor
                  </label>

                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "price",
                        Number(e.target.value)
                      )
                    }
                    className="w-full bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
                  />

                </div>

              </div>

              <div className="flex items-center justify-between pt-2">

                <div>

                  <p className="text-sm text-gray-400">
                    Subtotal
                  </p>

                  <p className="text-xl font-bold text-green-400">
                    {formatCurrency(subtotal)}
                  </p>

                </div>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  className="bg-red-500 hover:bg-red-400 transition-all px-4 py-3 rounded-xl font-semibold text-black"
                >
                  Remover
                </button>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}