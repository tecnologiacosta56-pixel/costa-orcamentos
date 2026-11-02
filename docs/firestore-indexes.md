# Índice do histórico dos leads

A consulta em `src/components/LeadTimeline.jsx` filtra `lead_history` por igualdade de `leadId` e ordena por `createdAt` decrescente. Ela requer o índice composto registrado em `firestore.indexes.json`:

| Campo | Ordem |
|---|---|
| leadId | ASCENDING |
| createdAt | DESCENDING |
| __name__ | DESCENDING |

Escopo: COLLECTION. Projeto utilizado pelo Costa CRM: `costa-orcamentos`, banco `(default)`.

O índice foi criado no Console Firebase e sua ativação foi confirmada pelo responsável em 02/11/2026. Após ativado, o histórico passou a exibir tanto a movimentação de teste quanto registros anteriores. O arquivo versionado documenta esse índice; não constitui uma exportação completa dos índices ou regras do projeto remoto.

## Reconstrução em outro ambiente

1. Entre no Console Firebase com a conta administradora do projeto de destino e confira o projeto e o banco selecionados.
2. Em Firestore → Índices, confira se já existe um índice equivalente. Se não existir, crie-o com os campos e ordens acima, ou use o link de índice gerado pela própria consulta.
3. Aguarde a criação terminar antes de testar o histórico. Não recrie o índice enquanto estiver em construção.
4. Abra um lead que já possua movimentações e confira o histórico. Se houver erro, consulte o Console do navegador para diferenciar falta de índice de falha de permissão.

Este registro não publica configurações no Firebase e não modifica dados, regras de acesso ou índices existentes. Para um futuro fluxo de implantação por CLI, primeiro exporte e concilie o inventário remoto completo; não use este arquivo parcial para excluir outros índices.

Referências oficiais:
- https://firebase.google.com/docs/firestore/query-data/indexing
- https://firebase.google.com/docs/reference/firestore/indexes
