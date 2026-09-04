import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

export default function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setUsers(await base44.entities.User.list("-created_date", 500));
    } catch (e) {
      toast({ title: "Failed to load users", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const invite = async () => {
    const email = prompt("Enter email to invite:");
    if (!email) return;
    const role = prompt("Role (admin or user):", "user") || "user";
    try {
      await base44.users.inviteUser(email, role);
      toast({ title: "Invite sent", description: `Invitation emailed to ${email}` });
      load();
    } catch (e) {
      toast({ title: "Invite failed", description: e.message, variant: "destructive" });
    }
  };

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (r) => <StatusBadge status={r.role} /> },
    { key: "created_date", label: "Joined", render: (r) => (r.created_date ? new Date(r.created_date).toLocaleDateString() : "—") },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage application users and access"
        actions={
          <Button onClick={invite}>
            <UserPlus className="h-4 w-4 mr-1" /> Invite User
          </Button>
        }
      />
      <DataTable columns={columns} data={users} loading={loading} />
    </div>
  );
}