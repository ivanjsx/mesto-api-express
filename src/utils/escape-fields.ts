import escape from "escape-html";

function escapeFields(fields: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const field in fields) {
    result[field] = escape(fields[field]);
  };
  return result;
};

export default escapeFields;