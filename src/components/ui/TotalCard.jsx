export default function TotalCard({
  items,
  discount,
  setDiscount,
}) {
  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }
  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.quantity * item.price,
    0
  )

  const total = subtotal - discount

  return (
    <div className="mt-10">

      <div className="bg-[#081120] border border-cyan-500/20 rounded-3xl p-8">

        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">
            Subtotal
          </span>

          <span className="text-xl font-semibold text-white">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between mb-6">

          <span className="text-gray-400">
            Desconto
          </span>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            className="w-40 bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none text-right"
          />

        </div>

        <div className="border-t border-cyan-500/20 pt-5 mt-5">

          <div className="flex items-center justify-between">

            <span className="text-2xl font-bold text-white">
              Total
            </span>

            <span className="text-4xl font-bold text-green-400">
              {formatCurrency(total)}
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}