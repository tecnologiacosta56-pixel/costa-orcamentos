import { useState } from "react"

import Header from "./components/layout/Header"
import BudgetForm from "./components/forms/BudgetForm"
import ServiceTable from "./components/tables/ServiceTable"
import TotalCard from "./components/ui/TotalCard"
import ActionButtons from "./components/ui/ActionButtons"

import logo from "./assets/logo.png"

export default function App() {

  const [items, setItems] = useState([
    {
      id: 1,
      type: "Serviço",
      name: "",
      quantity: 1,
      price: 0,
    },
  ])

  const [discount, setDiscount] = useState(0)

  const [clientName, setClientName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")

  // =========================
  // TOTAL
  // =========================
  const subtotal = items.reduce((acc, item) => {

    const quantity =
      Number(item.quantity || 0)

    const price =
      Number(item.price || 0)

    return acc + (quantity * price)

  }, 0)

  const total =
    subtotal - Number(discount || 0)

  return (

    <div className="min-h-screen bg-[#050816] text-white">

      <Header />

      <main className="p-10">

        <div className="max-w-7xl mx-auto">

          <div
            id="budget-pdf"
            className="border border-cyan-500/20 bg-[#0B1120] rounded-3xl p-10 shadow-2xl"
          >

            <div className="flex items-center gap-4 mb-10 border-b border-cyan-500/20 pb-6">

              <img
                src={logo}
                alt="Costa Automation"
                className="w-20 h-20 object-contain"
              />

              <div>

                <h2 className="text-3xl font-bold text-white">
                  Costa <span className="text-cyan-400">Automation</span>
                </h2>

                <p className="text-gray-400">
                  Sistema Inteligente de Orçamentos
                </p>

              </div>

            </div>

            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              Sistema de Orçamentos
            </h2>

            <p className="text-gray-400 mb-10">
              Plataforma premium da Costa Automation.
            </p>

            <BudgetForm
              clientName={clientName}
              setClientName={setClientName}

              phone={phone}
              setPhone={setPhone}

              address={address}
              setAddress={setAddress}

              description={description}
              setDescription={setDescription}
            />

            <ServiceTable
              items={items}
              setItems={setItems}
            />

            <TotalCard
              items={items}
              discount={discount}
              setDiscount={setDiscount}
            />

            <ActionButtons
              clientName={clientName}
              phone={phone}
              address={address}
              description={description}
              items={items}
              discount={discount}
              total={total}
            />

          </div>

        </div>

      </main>

    </div>
  )
}