import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { saveBudget } from "../../firebase/saveBudget";

export default function ActionButtons({
  clientName,
  phone,
  address,
  items,
  discount,
  total,
}) {

  // =========================
  // PDF
  // =========================
  const generatePDF = async () => {

    const input =
      document.getElementById("budget-pdf");

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      "orcamento-costa-automation.pdf"
    );
  };

  // =========================
  // WHATSAPP
  // =========================
  const handleWhatsApp = async () => {

    try {

      // =========================
      // VALIDAÇÃO
      // =========================
      if (!clientName || !phone) {

        alert(
          "Preencha nome e telefone."
        );

        return;
      }

      // =========================
      // DADOS DO ORÇAMENTO
      // =========================
      const budgetData = {

        clientName:
          clientName || "",

        phone:
          phone || "",

        address:
          address || "",

        items:
          items || [],

        discount:
          Number(discount || 0),

        total:
          Number(total || 0),

      };

      console.log(
        "SALVANDO:",
        budgetData
      );

      // =========================
      // SALVA FIRESTORE
      // =========================
      const budgetId =
        await saveBudget(budgetData);

      console.log(
        "ID GERADO:",
        budgetId
      );

      // =========================
      // URL PÚBLICA
      // =========================
      const budgetUrl =
        `https://costa-orcamentos.vercel.app/orcamento/${budgetId}`;

      // =========================
      // TELEFONE LIMPO
      // =========================
      const cleanPhone =
        phone.replace(/\D/g, "");

      // =========================
      // MENSAGEM LIMPA
      // =========================
      const message = `
Olá ${clientName} 👋

Seu orçamento da Costa Automation foi gerado com sucesso.

📄 Acesse seu orçamento:

${budgetUrl}

Obrigado pelo contato.
Costa Automation
`;

      // =========================
      // URL WHATSAPP
      // =========================
      const whatsappUrl =
        `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;

      console.log(
        "WHATSAPP:",
        whatsappUrl
      );

      // =========================
      // ABRE WHATSAPP
      // =========================
      setTimeout(() => {

        window.open(
          whatsappUrl,
          "_blank"
        );

      }, 500);

    } catch (error) {

      console.error(
        "ERRO COMPLETO:",
        error
      );

      alert(
        "Erro ao salvar orçamento."
      );
    }
  };

  return (

    <div className="flex flex-wrap gap-4 mt-8">

      {/* PDF */}
      <button
        onClick={generatePDF}
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"
      >
        Gerar PDF
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition"
      >
        WhatsApp
      </button>

      {/* Imprimir */}
      <button
        onClick={() => window.print()}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl transition"
      >
        Imprimir
      </button>

    </div>
  );
}