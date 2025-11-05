import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const tailwindImportantPlugin = {
  rules: {
    "no-trailing-important": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow trailing !important syntax in Tailwind classes; use the prefix form instead.",
        },
        schema: [],
        messages: {
          trailingImportant:
            "Use the prefix form (e.g. `!{{tokenWithoutBang}}`) instead of the trailing important syntax `{{token}}`.",
        },
      },
      create(context) {
        const reportMatches = (text, node) => {
          const tokens = text
            .split(/\s+/)
            .map((token) => token.trim())
            .filter(Boolean);

          for (const rawToken of tokens) {
            const token = rawToken.replace(/["',;]+$/g, "");

            if (!token.endsWith("!")) {
              continue;
            }

            if (token.startsWith("!")) {
              continue;
            }

            const tokenWithoutBang = token.slice(0, -1);

            context.report({
              node,
              messageId: "trailingImportant",
              data: {
                token,
                tokenWithoutBang,
              },
            });
          }
        };

        const inspectAttribute = (attribute) => {
          if (attribute.name?.name !== "className" || !attribute.value) {
            return;
          }

          const valueNode = attribute.value;

          if (valueNode.type === "Literal" && typeof valueNode.value === "string") {
            reportMatches(valueNode.value, valueNode);
            return;
          }

          if (valueNode.type !== "JSXExpressionContainer") {
            return;
          }

          const expression = valueNode.expression;

          if (expression.type === "Literal" && typeof expression.value === "string") {
            reportMatches(expression.value, expression);
            return;
          }

          if (expression.type === "TemplateLiteral") {
            for (const quasi of expression.quasis) {
              reportMatches(quasi.value.raw, quasi);
            }
          }
        };

        return {
          JSXAttribute: inspectAttribute,
        };
      },
    },
  },
};

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      "tailwind-important": tailwindImportantPlugin,
    },
    rules: {
      "tailwind-important/no-trailing-important": "error",
    },
  },
];

export default config;
