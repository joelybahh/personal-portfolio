/**
 * My Roadmap: the data behind the timeline on the home page.
 * Dates are decimal years (2018.27 is early April 2018). Items with `to: "now"` run to today.
 * Sources: git history across the Inspace Bitbucket workspace and GitHub, DEPOT vaults, and Joel.
 * This file is the markdown-style fallback; a Supabase `roadmap` table can replace it later.
 */

export type LaneId = "eng" | "work" | "lead" | "prod" | "life";

export type RoadmapLane = { id: LaneId; name: string; accent: "marker" | "teal" | "violet" | "leaf" | "coral" };

export type RoadmapItem = {
  lane: LaneId;
  title: string;
  /** Shown on the detail card, e.g. "May 2021 to now". */
  when: string;
  text: string;
  /** Single-day event. */
  at?: number;
  /** Range start. */
  from?: number;
  /** Range end, or "now". */
  to?: number | "now";
  /** A goal with no date: dashed ring with a question mark, drawn after today. */
  goal?: boolean;
  /** A planned piece of work: dashed bar after today. */
  plan?: boolean;
  /** Project slugs this item relates to, for filtering the Work grid later. */
  projects?: string[];
};

export const roadmapStart = 2013;
export const roadmapEnd = 2031;

export const roadmapLanes: RoadmapLane[] = [
  { id: "eng", name: "Engineering", accent: "marker" },
  { id: "work", name: "Inspace", accent: "teal" },
  { id: "lead", name: "People", accent: "violet" },
  { id: "prod", name: "Side projects", accent: "leaf" },
  { id: "life", name: "Life", accent: "coral" },
];

export const roadmapItems: RoadmapItem[] = [
  // Engineering: education, eras, compliance
  { lane: "eng", at: 2013.5, title: "First code, year 10", when: "2013, aged 15", text: "Certificate II and III in Information, Digital Media and Technology: a 2D game in C# and MonoGame, then a 3D game in Unity." },
  { lane: "eng", at: 2014.05, title: "First commit", when: "14 January 2014", text: "A Java game called myGame. Two commits. The trail starts here." },
  { lane: "eng", from: 2015.0, to: 2015.15, title: "Ice-Cream Tycoon", when: "January to February 2015", text: "The HSC major project, C# and MonoGame. Finalist, NSW Year 12 Industrial Technology competition." },
  { lane: "eng", at: 2015.85, title: "HSC", when: "2015", text: "Graduated at 17 with standout results in Computer Science and Digital Media." },
  { lane: "eng", from: 2016.1, to: 2018.0, title: "AIE, Advanced Diploma of Games Development", when: "2016 to 2018", text: "Outstanding Programmer Award and top of the cohort. 244k lines of C# in 2017: Space Escape Room, Welcome To Wonderland VR, Game Jam 6.0." },
  { lane: "eng", from: 2018.08, to: "now", title: "Riverfox, then Inspace", when: "29 January 2018 to now", text: "Started straight out of AIE. First Riverfox commit 29 January 2018. 4,876 of 11,789 monorepo commits since July 2022." },
  { lane: "eng", at: 2026.05, title: "ISO 27001 Stage 1 audit", when: "January 2026", text: "All 93 Annex A controls implemented." },

  // Inspace products and experiments (dates from git)
  { lane: "work", from: 2018.08, to: 2019.9, title: "Riverfox: Immerse VR app", when: "Jan 2018 to Dec 2019", text: "The Unity VR app. 1,390 of its 1,862 commits. Updater, WPF launcher, FBX pipeline, Zapier hooks." },
  { lane: "work", from: 2017.8, to: 2019.7, title: "Revit plugin", when: "Oct 2017 to Sep 2019", text: "C# plugin that pushes models into Riverfox. Nick led; 22 of 147 commits here plus the 2020 rewrite." },
  { lane: "work", from: 2018.75, to: 2019.42, title: "Installer build pipeline", when: "Sep 2018 to Jun 2019", text: "Inno Setup and Unity build pipeline for shipping the desktop VR app. 146 of 195 commits." },
  { lane: "work", from: 2019.15, to: 2019.7, title: "ITK and Rhino plugins", when: "Feb to Sep 2019", text: "An ITK plugin for Unity (82 commits) and a Rhino plugin for Riverfox." },
  { lane: "work", from: 2019.6, to: 2020.7, title: "Unity package split", when: "Aug 2019 to Sep 2020", text: "Geometry, common, VR interaction, media, accounts and build packages pulled out of the app." },
  { lane: "work", from: 2019.7, to: 2020.8, title: "Inspace Unity app", when: "Sep 2019 to Oct 2020", text: "The Inspace desktop and VR app: 457 of 715 commits. The SketchUp Ruby plugin lived alongside it." },
  { lane: "work", from: 2020.55, to: 2021.2, title: "Web pivot: web 3D viewer", when: "Jul 2020 to Feb 2021", text: "BabylonJS viewer, the Investa, ESR and Barangaroo demos, inspace-api v1, the shop." },
  { lane: "work", from: 2020.7, to: "now", title: "Inspace Stack (viewer app)", when: "Sep 2020 to now", text: "The 3D viewer buyers use. Took it over in November 2025; v2.0.0 to v3.1.1 in October 2026.", projects: ["stack-cms"] },
  { lane: "work", from: 2021.4, to: 2022.9, title: "Stack CMS", when: "May 2021 to 2022", text: "Editor for personalised 3D stacks. 928 of its 1,057 commits.", projects: ["stack-cms"] },
  { lane: "work", from: 2022.55, to: "now", title: "Monorepo", when: "July 2022 to now", text: "7 apps, 12 Azure Function apps, about 37 packages. 1,490 commits in 2023 alone." },
  { lane: "work", from: 2023.2, to: "now", title: "Inventory, Experiences, Reporting", when: "2023 to now", text: "All three still ship in 2026.", projects: ["inventory", "dxp", "reporting"] },
  { lane: "work", from: 2024.3, to: "now", title: "Mapping platform", when: "April 2024 to now", text: "Schema-driven mapping UI over Mapbox and BabylonJS.", projects: ["mapping"] },
  { lane: "work", from: 2025.17, to: 2025.3, title: "Intelligence: predictive leasing", when: "March to April 2025", text: "An API scoring tenant to space matches on building grade, zone and transport." },
  { lane: "work", from: 2025.25, to: 2026.6, title: "Map AI tier: summaries", when: "2025 to 2026", text: "AI summaries on the map behind an AI tier, with privacy scrubbing of the inputs.", projects: ["mapping"] },
  { lane: "work", from: 2026.2, to: "now", title: "Insights platform", when: "March 2026 to now", text: "Lead intelligence on analytics visits. v1.0.0 in September, v1.1.0 in October 2026.", projects: ["inspace-insights"] },
  { lane: "work", from: 2026.45, to: 2026.7, title: "Insights MCP", when: "June to September 2026", text: "Remote MCP server with its own OAuth layer over Auth0.", projects: ["inspace-insights"] },
  { lane: "work", plan: true, from: 2026.85, to: 2027.0, title: "Insights v1.2: web reports", when: "Planned, staged", text: "Staged in DEPOT, not yet released." },

  // People: roles, and when colleagues arrived (first commit in the workspace)
  { lane: "lead", at: 2017.85, title: "Nick", when: "November 2017", text: "Nick Stevens, first Riverfox engineer on the trail. 568 commits to June 2020." },
  { lane: "lead", at: 2018.2, title: "Eric", when: "March 2018", text: "Eric Fear, 236 commits to March 2020. Owned the SketchUp Ruby plugin." },
  { lane: "lead", at: 2019.03, title: "Jason joins", when: "January 2019", text: "Jason Smith, 3,127 commits across 102 repos. The other constant." },
  { lane: "lead", at: 2021.17, title: "Lakshay", when: "March 2021", text: "1,799 commits to June 2025." },
  { lane: "lead", from: 2021.5, to: 2022.9, title: "Lead Developer", when: "2021 to 2022", text: "Stack CMS." },
  { lane: "lead", at: 2022.25, title: "Ethan", when: "March 2022", text: "817 commits and counting." },
  { lane: "lead", at: 2022.4, title: "Farid", when: "May 2022", text: "1,198 commits to June 2025." },
  { lane: "lead", at: 2022.73, title: "Ben and Kevin", when: "September 2022", text: "Ben Zotti led the mapping rewrite; Kevin Osborn 761 commits to October 2023." },
  { lane: "lead", at: 2023.6, title: "Jose", when: "August 2023", text: "327 commits to July 2024." },
  { lane: "lead", from: 2024.3, to: 2026.0, title: "Engineering Manager", when: "2024 to 2026", text: "On the Mapping platform." },
  { lane: "lead", at: 2025.3, title: "SOC 2 Type I secured", when: "2025", text: "Took the engineering seat in the compliance push: controls, policy set, evidence and auditor walkthroughs." },
  { lane: "lead", at: 2025.7, title: "AI efficiency rollout", when: "2025", text: "AI capability without a cost blowout." },
  { lane: "lead", from: 2026.0, to: "now", title: "Tech Lead", when: "2026 to now", text: "Leads the engineers at Inspace, still on the tools most weeks." },

  // Side projects
  { lane: "prod", from: 2023.68, to: 2026.3, title: "Code Buddy", when: "Sep 2023 to Apr 2026", text: "Commit messages from staged changes. 6 stars.", projects: ["code-buddy"] },
  { lane: "prod", from: 2025.35, to: "now", title: "Roll With It", when: "May 2025 to now", text: "Household budget built with Erica. Seven mobile releases in 2026.", projects: ["roll-with-it"] },
  { lane: "prod", from: 2025.6, to: "now", title: "GoWith", when: "Aug 2025 to now", text: "1.x in both stores; v2.0.0 rebuild in testing.", projects: ["gowith"] },
  { lane: "prod", from: 2026.17, to: 2026.3, title: "Mailman", when: "Mar to Apr 2026", text: "Rust desktop API client, v0.1.0 to v0.5.1.", projects: ["mailman"] },
  { lane: "prod", from: 2026.69, to: "now", title: "DEPOT", when: "Sep 2026 to now", text: "1.0.0-beta on 20 October, v1.2.3-beta on 27 October, 75 release records.", projects: ["depot"] },
  { lane: "prod", plan: true, from: 2026.83, to: 2026.9, title: "GoWith v2.0.0", when: "Planned, 31 October 2026", text: "The rebuild ships.", projects: ["gowith"] },
  { lane: "prod", plan: true, from: 2026.85, to: 2027.4, title: "DEPOT v1.4 to v1.7", when: "Planned", text: "Every AI session visible, Ask DEPOT anywhere, specialist agents, handoffs, release workflows.", projects: ["depot"] },
  { lane: "prod", plan: true, from: 2027.0, to: 2027.5, title: "Roll With It v2: security, Budget MCP", when: "Planned", text: "Row-level security, revocable sessions, a budget MCP.", projects: ["roll-with-it"] },
  { lane: "prod", goal: true, at: 2027.9, title: "DEPOT public release", when: "Goal", text: "Out of beta, signed builds, public repo.", projects: ["depot"] },
  { lane: "prod", goal: true, at: 2028.8, title: "A side project pays real money", when: "Goal", text: "Decent side income from one of these." },

  // Life
  { lane: "life", at: 2013.33, title: "Met Erica", when: "29 April 2013", text: "Aged 15. The start of everything on this row." },
  { lane: "life", at: 2018.27, title: "Became a dad at 20", when: "10 April 2018", text: "First of three boys." },
  { lane: "life", at: 2019.5, title: "Bought our first home", when: "2019", text: "The mortgage Roll With It now tracks." },
  { lane: "life", at: 2020.95, title: "Beau arrives, dad of two", when: "12 December 2020", text: "Born in the erased bit. The one part of it we kept." },
  { lane: "life", at: 2023.56, title: "Dad of three", when: "24 July 2023", text: "All boys. 8, 5 and 3 in late 2026." },
  { lane: "life", from: 2025.0, to: "now", title: "Sober", when: "1 January 2025 to now", text: "Quit drinking on New Year's Day 2025." },
  { lane: "life", goal: true, at: 2027.7, title: "Travel with the boys", when: "Goal", text: "Hard with three kids. Still on the list." },
  { lane: "life", goal: true, at: 2027.9, title: "Get married at 30", when: "Goal, November 2027", text: "Eventually. Fourteen years in, seems like enough time." },
  { lane: "life", goal: true, at: 2030.0, title: "Pay off the house", when: "Goal", text: "The Journeys forecast in Roll With It points at this one." },
];

/** The stretch the eraser rubs out. */
export const erasedSpan = { from: 2020.2, to: 2021.5, line1: "404: Covid year not found", line2: "Beau was the only real thing that happened in it" };
