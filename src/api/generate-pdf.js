// src/components/ui/ActionButtons.jsx
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function ActionButtons({
  clientName,
  phone,
  address,
  items,
  discount,
  total,
}) {

  const generatePDF = async () => {
    const input = document.getElementById("budget-pdf");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("orcamento-costa-automation.pdf");
  };

  const handleWhatsApp = async () => {
    // 1️⃣ Salvar histórico
    const budgetData = { clientName, phone, address, items, discount, total };
    await fetch("/api/save-budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetData),
    });

    // 2️⃣ Enviar link do PDF
    const pdfLink = `${window.location.origin}/api/generate-pdf`;
    const message = encodeURIComponent(
      `Olá ${clientName}, seu orçamento está disponível: ${pdfLink}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="flex flex-wrap gap-4 mt-8">

      <button
        onClick={generatePDF}
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"
      >
        Gerar PDF
      </button>

      <button
        onClick={handleWhatsApp}
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
  );
}