import { AdminDashboardClient } from "./admiiinDashboardClient";
import { getBookings } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const { data } = await getBookings();
  const initialBookings = data || [];

  return <AdminDashboardClient initialBookings={initialBookings} />;
}
