export const queryKeys = {
  repository: (name: string, owner: string) => ["repository", name, owner],
  repositories: (query: string) => ["repositories", query],
};
