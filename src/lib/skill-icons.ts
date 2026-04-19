/** Devicon CDN paths — icons/devicons/devicon */
const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Skill label → devicon relative path under icons/ */
const SKILL_ICON: Record<string, string> = {
  React: "react/react-original.svg",
  Vue: "vuejs/vuejs-original.svg",
  JavaScript: "javascript/javascript-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  Redux: "redux/redux-original.svg",
  Vuex: "vuejs/vuejs-original.svg",
  Tailwind: "tailwindcss/tailwindcss-original.svg",
  HTML: "html5/html5-original.svg",
  CSS: "css3/css3-original.svg",
  Node: "nodejs/nodejs-original.svg",
  Express: "express/express-original.svg",
  SQL: "postgresql/postgresql-original.svg",
  NoSQL: "mongodb/mongodb-original.svg",
  Git: "git/git-original.svg",
  Jest: "jest/jest-plain.svg",
  Cypress: "cypressio/cypressio-original.svg",
  "Cursor AI": "vscode/vscode-original.svg",
  "VS Code": "vscode/vscode-original.svg",
  Storybook: "storybook/storybook-original.svg",
};

export function skillIconUrl(skillName: string): string | null {
  const path = SKILL_ICON[skillName];
  if (!path) return null;
  return `${BASE}/${path}`;
}
