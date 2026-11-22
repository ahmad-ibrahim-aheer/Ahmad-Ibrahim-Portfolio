import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const username = "ahmad-ibrahim-aheer";
let token = process.env.GITHUB_TOKEN;

if (!token) {
  try {
    token = execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    throw new Error("Set GITHUB_TOKEN or authenticate GitHub CLI with: gh auth login");
  }
}
if (!token) throw new Error("A GitHub token is required.");

const query = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query, variables: { login: username } }),
});

if (!response.ok) {
  throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
}
const payload = await response.json();
if (payload.errors?.length) {
  throw new Error(payload.errors.map((error) => error.message).join("\n"));
}

const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
if (!calendar) throw new Error(`GitHub user not found or contribution calendar unavailable: ${username}`);

const days = calendar.weeks.flatMap((week) =>
  week.contributionDays.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: Number(day.contributionLevel.replace("CONTRIBUTION_LEVEL_", "")),
  })),
);

const output = {
  username,
  totalContributions: calendar.totalContributions,
  updatedAt: new Date().toISOString(),
  days,
};

const destination = resolve("public/github-contributions.json");
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Updated ${days.length} days and ${output.totalContributions} contributions for @${username}.`);
