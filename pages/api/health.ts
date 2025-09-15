import type { NextApiRequest, NextApiResponse } from "next";
import { loadUnitsAll } from "@/lib/loadUnits";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const units = await loadUnitsAll();
  const missing = units.filter(u => !u.id || !u.building || !u.unit || !u.area);
  res.status(200).json({
    total: units.length,
    missingCritical: missing.length,
    sampleMissing: missing.slice(0, 10).map(u => ({ id: u.id, building: u.building, unit: u.unit, area: u.area })),
  });
}
