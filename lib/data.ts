import seed from "@/data/demo-seed-data.json";
import mock from "@/data/mock-ai-responses.json";

export const seedData = seed as any;
export const mockAi = mock as any;

export const currentUser = seedData.currentUser;
export const regions = seedData.regions;
export const users = seedData.users;
export const handovers = seedData.handovers;
export const upcomingTransitions = seedData.upcomingTransitions;
export const kpiData = seedData.kpiData;
export const quickStats = seedData.quickStats;
export const notifications = seedData.notifications;

export const aiInsights = mockAi.aiInsights?.dashboard ?? [];
export const handoverSummaries = mockAi.handoverSummaries ?? {};
export const qualityScores = mockAi.qualityScores ?? {};
