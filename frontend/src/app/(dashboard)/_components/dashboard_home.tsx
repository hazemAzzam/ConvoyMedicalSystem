export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Bedaya Medical System</h1>
        <p className="text-muted-foreground">
          Manage your medical practice efficiently with our comprehensive
          dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Patients</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground text-sm">Total patients</p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Appointments</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground text-sm">Today's appointments</p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Clinics</h3>
          <p className="text-2xl font-bold">12</p>
          <p className="text-muted-foreground text-sm">Active clinics</p>
        </div>
      </div>
    </div>
  );
}
