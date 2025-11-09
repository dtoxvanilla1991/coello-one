# Chroma Collection – Component Structure Rule (2025-11-08)

- **Rule**: Keep top-level UI component files under roughly 300 lines. When a component grows beyond that boundary, extract child components and move static data, mock payloads, and type/interface/enum declarations into sibling modules (`constants.ts`, `types.ts`, etc.).
- **Purpose**: Preserve readability, support reuse across the app, and make it easier for embeddings/agents consuming this collection to retrieve focused context chunks.
- **Exceptions**: Document any unavoidable breaches (for example, generated files or framework constraints) in Serena before merging.
