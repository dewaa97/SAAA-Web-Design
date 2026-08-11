import { describe, expect, it } from "vitest";
import { milestones } from "@/lib/content/milestones";

function buildMilestoneEventKeys() {
  return milestones.flatMap((decade) =>
    decade.events.map((event, index) => `${decade.decade}-${event.year}-${index}`),
  );
}

describe("milestones content", () => {
  it("uses unique React keys for events within each decade", () => {
    const keys = buildMilestoneEventKeys();
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("includes duplicate years in 2010s without key collisions", () => {
    const decade2010s = milestones.find((decade) => decade.decade === "2010s");
    expect(decade2010s).toBeDefined();
    const years2016 = decade2010s!.events.filter((event) => event.year === "2016");
    expect(years2016.length).toBeGreaterThan(1);
    const keys = decade2010s!.events.map((event, index) => `2010s-${event.year}-${index}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
