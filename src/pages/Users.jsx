import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, ShieldCheck } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Users() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

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

  const changeRole = async (targetUser, newRole) => {
    if (newRole === targetUser.role) return;
    if (targetUser.id === currentUser?.id) {
      toast({
        title: "Can't change your own role",
        description: "Ask another admin to change your role to avoid locking yourself out.",
        variant: "destructive",
      });
      return;
    }
    setUpdatingId(targetUser.id);
    try {
      await base44.entities.User.update(targetUser.id, { role: newRole });
      setUsers((prev) => prev.map((u) => (u.id === targetUser.id ? { ...u, role: newRole } : u)));
      toast({ title: "Role updated", description: `${targetUser.email} is now ${newRole}` });
    } catch (e) {
      toast({ title: "Failed to update role", description: e.message, variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (r) =>
        isAdmin ? (
          <Select
            value={r.role || "user"}
            disabled={updatingId === r.id}
            onValueChange={(v) => changeRole(r, v)}
          >
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">user</SelectItem>
              <SelectItem value="admin">admin</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <StatusBadge status={r.role} />
        ),
    },
    { key: "created_date", label: "Joined", render: (r) => (r.created_date ? new Date(r.created_date).toLocaleDateString() : "—") },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        description={
          isAdmin
            ? "Manage application users, access and roles"
            : "Manage application users and access"
        }
        actions={
          <Button onClick={invite}>
            <UserPlus className="h-4 w-4 mr-1" /> Invite User
          </Button>
        }
      />
      {isAdmin && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <ShieldCheck className="h-3.5 w-3.5" /> As an admin, you can change any user's role directly from the table below.
        </p>
      )}
      <DataTable columns={columns} data={users} loading={loading} />
    </div>
  );
}
