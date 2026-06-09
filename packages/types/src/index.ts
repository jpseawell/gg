export type SurfaceId = "app" | "api" | "marketing";

export interface SurfaceCard {
  id: SurfaceId;
  title: string;
  description: string;
  devCommand: string;
  audience: "product" | "service" | "growth";
}
