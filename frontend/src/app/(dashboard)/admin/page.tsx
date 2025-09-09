export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage system settings and user permissions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground text-sm">Total users</p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Staff</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground text-sm">Active staff</p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">System</h3>
          <p className="text-2xl font-bold">Online</p>
          <p className="text-muted-foreground text-sm">System status</p>
        </div>
      </div>
    </div>
  );
}
