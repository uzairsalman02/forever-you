export interface ReleaseConfig {
  releaseDate: string;
  timezone: string;
  developmentMode: boolean;
}

export const RELEASE_CONFIG: ReleaseConfig = {
  // Set the target release date (ISO format string)
  releaseDate: "2026-08-14T00:00:00Z",
  // Preferred timezone for display reference
  timezone: "UTC",
  // When true, bypasses countdown and shows the website
  developmentMode: false,
};
