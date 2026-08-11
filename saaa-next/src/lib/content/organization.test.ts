import { describe, expect, it } from "vitest";
import { secretariat } from "@/lib/content/organization";

describe("organization content", () => {
  it("uses unique staff keys when emails are shared", () => {
    const staffKeys = secretariat.branches.flatMap((branch) =>
      branch.departments.flatMap((department) =>
        department.staff.map((person) => `${person.name}-${person.email}`),
      ),
    );

    expect(new Set(staffKeys).size).toBe(staffKeys.length);
  });

  it("includes Business Operations staff with shared scs email", () => {
    const bizOps = secretariat.branches
      .flatMap((branch) => branch.departments)
      .find((department) => department.pill === "Business Operations");

    expect(bizOps).toBeDefined();
    const sharedEmailStaff = bizOps!.staff.filter((person) => person.email === "scs@saaa.org.sg");
    expect(sharedEmailStaff.length).toBeGreaterThan(1);
  });
});
