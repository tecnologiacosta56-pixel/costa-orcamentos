import PropTypes from "prop-types";

// Inputs may temporarily contain an empty string while being edited.
export const numericInputPropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

export const budgetItemPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  quantity: numericInputPropType.isRequired,
  price: numericInputPropType.isRequired,
});

export const leadPropType = PropTypes.shape({
  id: PropTypes.string,
  nome: PropTypes.string,
  telefone: PropTypes.string,
  cidade: PropTypes.string,
  servico: PropTypes.string,
  descricao: PropTypes.string,
  origem: PropTypes.string,
  status: PropTypes.string,
});
