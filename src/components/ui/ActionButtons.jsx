import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export default function ActionButtons({
  clientName,
  phone,
  address,
  description,
  items,
  discount,
}) {

  const total = items.reduce((acc, item) => {
    return acc + item.quantity * item.price
  }, 0)

  const finalTotal = total - discount

  const generatePDF = async () => {

    const input = document.getElementById("budget-pdf")

    const canvas = await html2canvas(input)

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = pdf.internal.pageSize.getWidth()

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    )

    pdf.save("orcamento-costa-automation.pdf")
  }

  const sendWhatsApp = () => {

    const message = `
Olá ${clientName} 👋

Segue seu orçamento da Costa Automation 🚀

📍 Endereço:
${address}

🛠️ Serviço:
${description}

💰 Valor total:
R$ ${finalTotal.toFixed(2)}

Sistema inteligente de automação e tecnologia.
`

    const url =
      `https://wa.me/?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  return (

    <div className="flex flex-wrap gap-4 mt-8">

      <button
        onClick={generatePDF}
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"
      >
        Gerar PDF
      </button>

      <button
        onClick={sendWhatsApp}
        className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition"
      >
        WhatsApp
      </button>

      <button
        onClick={() => window.print()}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl transition"
      >
        Imprimir
      </button>

    </div>
  )
}