declare module "axios";
declare module "*.css";
declare module "*.jpg";
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
