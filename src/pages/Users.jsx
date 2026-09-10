import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, ShieldCheck, Ban, RotateCcw, Trash2 } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// The primary admin account is protected at the app layer: its role can
// never be changed, and it can never be deactivated or deleted — not even
// by another admin. This guards against accidental or malicious lockout
// of the last admin account.
const PROTECTED_EMAILS = ["amitava.kar@maxbridgesolution.com"];

export default function Users() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null); // user object awaiting delete confirmation

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

  const isProtected = (u) => PROTECTED_EMAILS.includes(u?.email?.toLowerCase());

  const changeRole = async (targetUser, newRole) => {
    if (newRole === targetUser.role) return;
    if (isProtected(targetUser)) {
      toast({
        title: "Protected account",
        description: "This account's role cannot be changed.",
        variant: "destructive",
      });
      return;
    }
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

  const toggleActive = async (targetUser) => {
    if (isProtected(targetUser)) {
      toast({
        title: "Protected account",
        description: "This account cannot be deactivated.",
        variant: "destructive",
      });
      return;
    }
    if (targetUser.id === currentUser?.id) {
      toast({
        title: "Can't deactivate your own account",
        description: "Ask another admin to do this to avoid locking yourself out.",
        variant: "destructive",
      });
      return;
    }
    const nextActive = targetUser.is_active === false; // currently inactive -> reactivate
    setUpdatingId(targetUser.id);
    try {
      await base44.entities.User.update(targetUser.id, { is_active: nextActive });
      setUsers((prev) => prev.map((u) => (u.id === targetUser.id ? { ...u, is_active: nextActive } : u)));
      toast({
        title: nextActive ? "User reactivated" : "User deactivated",
        description: `${targetUser.email} ${nextActive ? "can log in again" : "has been signed out and can no longer access the app"}`,
      });
    } catch (e) {
      toast({ title: "Failed to update user", description: e.message, variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const targetUser = pendingDelete;
    if (isProtected(targetUser)) {
      setPendingDelete(null);
      toast({
        title: "Protected account",
        description: "This account cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    setUpdatingId(targetUser.id);
    try {
      await base44.entities.User.delete(targetUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      toast({ title: "User deleted", description: `${targetUser.email} has been removed` });
    } catch (e) {
      toast({ title: "Failed to delete user", description: e.message, variant: "destructive" });
    } finally {
      setUpdatingId(null);
      setPendingDelete(null);
    }
  };

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (r) =>
        isAdmin && !isProtected(r) ? (
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
    {
      key: "is_active",
      label: "Status",
      render: (r) => <StatusBadge status={r.is_active === false ? "Terminated" : "Active"} />,
    },
    { key: "created_date", label: "Joined", render: (r) => (r.created_date ? new Date(r.created_date).toLocaleDateString() : "—") },
    ...(isAdmin
      ? [
          {
            key: "actions",
            label: "Actions",
            render: (r) => {
              const isSelf = r.id === currentUser?.id;
              const isInactive = r.is_active === false;
              if (isProtected(r)) {
                return (
                  <span className="text-xs text-muted-foreground flex items-center gap-1" title="Protected system account — cannot be modified">
                    <ShieldCheck className="h-3.5 w-3.5" /> Protected
                  </span>
                );
              }
              return (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    disabled={isSelf || updatingId === r.id}
                    title={isSelf ? "You can't deactivate your own account" : isInactive ? "Reactivate this user" : "Deactivate this user"}
                    onClick={() => toggleActive(r)}
                  >
                    {isInactive ? <RotateCcw className="h-3.5 w-3.5 mr-1" /> : <Ban className="h-3.5 w-3.5 mr-1" />}
                    {isInactive ? "Reactivate" : "Deactivate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    disabled={isSelf || updatingId === r.id}
                    title={isSelf ? "You can't delete your own account" : "Permanently delete this user"}
                    onClick={() => setPendingDelete(r)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                </div>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        description={
          isAdmin
            ? "Manage application users, access, roles and status"
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
          <ShieldCheck className="h-3.5 w-3.5" /> As an admin, you can change roles, deactivate, reactivate or permanently delete any other user from the table below.
        </p>
      )}
      <DataTable columns={columns} data={users} loading={loading} />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.email}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the user record and revokes their access to WorkNest. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-600"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
