const API = "https://qa-tooling.xite.com/api";

async function enhancedFetch<T>(url: string): Promise<T> {
  return await fetch(url).then(res => res.json());
}

async function fetchProject(projectKey: string) {
  const path = `/worklogs?team=${projectKey}`;
  return await enhancedFetch(API + path);
}

export async function fetchTicketHours(
  projectKey: string,
  username: string
): Promise<{ hoursLogged: number, numberOfTickets: number }> {
  const project = await fetchProject(projectKey);
  const ownerTickets = project.filter(
    ticket => ticket.owner === username.toLowerCase()
  );
  const hoursLogged =
    ownerTickets.reduce((acc, curr) => acc + curr.effort, 0) / 60 / 60;

  return { hoursLogged, numberOfTickets: ownerTickets.length };
}

export async function syncProject(projectKey: string): Promise<void> {
  return await fetch("https://qa-tooling.xite.com/api/teams/XA/sync");
}
