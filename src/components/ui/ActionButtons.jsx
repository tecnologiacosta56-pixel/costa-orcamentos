import {
  useState,
  useEffect,
} from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { saveBudget } from "../../firebase/saveBudget";

export default function ActionButtons({

  budgetId,

  clientName,

  phone,

  address,

  description,

  projectCategory,

  projectObjective,

  serviceScope,

  installationLocations,

  technicalNotes,

  includedServices,

  generalConditions,

  priorityLevel,

  proposalValidity,

  technicalResponsible,

  items,

  discount,

  total,

}) {

  // =========================
  // STATES
  // =========================
  const [loading, setLoading] =
    useState(false);

  const [currentBudgetId, setCurrentBudgetId] =
    useState(budgetId || null);

  // =========================
  // SYNC ROUTE ID
  // =========================
  useEffect(() => {

    setCurrentBudgetId(
      budgetId || null
    );

  }, [budgetId]);

  // =========================
  // PDF
  // =========================
  const generatePDF = async () => {

    const input =
      document.getElementById("budget-pdf");

    const canvas =
      await html2canvas(input, {
        scale: 2,
      });

    const imgData =
      canvas.toDataURL("image/png");

    const pdf =
      new jsPDF(
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
  // DADOS ORÇAMENTO
  // =========================
  const budgetData = {

    // =========================
    // CLIENTE
    // =========================
    clientName:
      clientName || "",

    phone:
      phone || "",

    address:
      address || "",

    // =========================
    // DESCRIÇÃO
    // =========================
    description:
      description || "",

    // =========================
    // CAMPOS TÉCNICOS
    // =========================
    projectCategory:
      projectCategory || "",

    projectObjective:
      projectObjective || "",

    serviceScope:
      serviceScope || "",

    installationLocations:
      installationLocations || "",

    technicalNotes:
      technicalNotes || "",

    includedServices:
      includedServices || "",

    generalConditions:
      generalConditions || "",

    priorityLevel:
      priorityLevel || "",

    proposalValidity:
      proposalValidity || "",

    technicalResponsible:
      technicalResponsible || "",

    // =========================
    // ITENS
    // =========================
    items:
      items || [],

    discount:
      Number(discount || 0),

    total:
      Number(total || 0),
  };

  // =========================
  // SALVAR
  // =========================
  const handleSave = async () => {

    try {

      if (!clientName || !phone) {

        alert(
          "Preencha nome e telefone."
        );

        return;
      }

      setLoading(true);

      const savedBudgetId =
        await saveBudget(
          budgetData,
          currentBudgetId
        );

      setCurrentBudgetId(
        savedBudgetId
      );

      alert(
        currentBudgetId
          ? "Orçamento atualizado com sucesso."
          : "Orçamento salvo com sucesso."
      );

    } catch (error) {

      console.error(
        "ERRO AO SALVAR:",
        error
      );

      alert(
        "Erro ao salvar orçamento."
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // WHATSAPP
  // =========================
  const handleWhatsApp = async () => {

    try {

      if (!clientName || !phone) {

        alert(
          "Preencha nome e telefone."
        );

        return;
      }

      if (!currentBudgetId) {

        alert(
          "Salve o orçamento antes de enviar no WhatsApp."
        );

        return;
      }

      const budgetUrl =
        `https://costa-orcamentos.vercel.app/orcamento/${currentBudgetId}`;

      const cleanPhone =
        phone.replace(/\D/g, "");

      const message = `
Olá ${clientName} 👋

Seu orçamento da Costa Automation foi atualizado com sucesso.

📄 Acesse abaixo:

${budgetUrl}

Obrigado pelo contato.
Costa Automation
`;

      const whatsappUrl =
        `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;

      window.open(
        whatsappUrl,
        "_blank"
      );

    } catch (error) {

      console.error(
        "ERRO WHATSAPP:",
        error
      );

      alert(
        "Erro ao abrir WhatsApp."
      );
    }
  };

  return (

    <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-10">

      {/* SALVAR */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-6 py-4 rounded-xl transition w-full md:w-auto"
      >

        {loading
          ? "Salvando..."
          : currentBudgetId
            ? "Atualizar Orçamento"
            : "Salvar Orçamento"}

      </button>

      {/* PDF */}
      <button
        onClick={generatePDF}
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-4 rounded-xl transition w-full md:w-auto"
      >
        Gerar PDF
      </button>

      {/* WHATSAPP */}
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-4 rounded-xl transition w-full md:w-auto"
      >
        WhatsApp
      </button>

      {/* PRINT */}
      <button
        onClick={() =>
          window.print()
        }
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-4 rounded-xl transition w-full md:w-auto"
      >
        Imprimir
      </button>

    </div>
  );
}