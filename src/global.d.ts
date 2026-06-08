// Ambient-декларация для глобальных CSS-импортов (side-effect), напр.
// `import "./tokens.css"`. CSS-модули (*.module.css) уже типизированы Next,
// а для обычного *.css нужна эта декларация, иначе tsc выдаёт TS2882.
declare module "*.css";
