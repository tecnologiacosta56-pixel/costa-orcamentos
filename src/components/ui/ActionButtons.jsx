import PropTypes from "prop-types";
import { budgetItemPropType } from "../../types/propTypes";
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
  
  projectPresentationUrl,

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
  // PDF MULTIPÁGINA
  // =========================
  const generatePDF = async () => {

    try {

      const input =
        document.getElementById("budget-pdf");

      if (!input) {

        alert(
          "Elemento PDF não encontrado."
        );

        return;
      }

      // =========================
      // CANVAS
      // =========================
      const canvas =
        await html2canvas(input, {

          scale: 2,

          useCORS: true,

          logging: false,

          scrollY: -window.scrollY,
        });

      const imgData =
        canvas.toDataURL("image/png");

      // =========================
      // PDF
      // =========================
      const pdf =
        new jsPDF(
          "p",
          "mm",
          "a4"
        );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      // =========================
      // DIMENSÕES
      // =========================
      const imgWidth =
        pdfWidth;

      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width;

      let heightLeft =
        imgHeight;

      let position = 0;

      // =========================
      // PRIMEIRA PÁGINA
      // =========================
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;

      // =========================
      // NOVAS PÁGINAS
      // =========================
      while (heightLeft > 0) {

        position =
          heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pdfHeight;
      }

      // =========================
      // SALVAR
      // =========================
      pdf.save(
        "orcamento-costa-automation.pdf"
      );

    } catch (error) {

      console.error(
        "ERRO PDF:",
        error
      );

      alert(
        "Erro ao gerar PDF."
      );
    }
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
      
      projectPresentationUrl:
  projectPresentationUrl || "",

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

      if (!String(clientName || "").trim() || !String(phone || "").replace(/\D/g, "")) {

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

      if (typeof savedBudgetId !== "string" || !savedBudgetId.trim()) {
        throw new Error("O salvamento não retornou um ID de orçamento válido.");
      }

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

ActionButtons.propTypes = {
  budgetId: PropTypes.string,
  clientName: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  projectCategory: PropTypes.string,
  projectObjective: PropTypes.string,
  serviceScope: PropTypes.string,
  installationLocations: PropTypes.string,
  technicalNotes: PropTypes.string,
  includedServices: PropTypes.string,
  generalConditions: PropTypes.string,
  projectPresentationUrl: PropTypes.string,
  priorityLevel: PropTypes.string,
  proposalValidity: PropTypes.string,
  technicalResponsible: PropTypes.string,
  items: PropTypes.arrayOf(budgetItemPropType),
  discount: PropTypes.number,
  total: PropTypes.number,
};
