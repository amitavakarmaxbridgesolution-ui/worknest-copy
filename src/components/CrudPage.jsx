import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import CrudForm from "@/components/CrudForm";
import { useToast } from "@/components/ui/use-toast";

export default function CrudPage({
  entityName, title, description, columns, formFields, searchKeys,
  defaultValues, readOnly, statusActions, filters, customForm, formMaxWidth,
}) {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [lookups, setLookups] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities[entityName].list("-updated_date", 500);
      setItems(data);
      const lk = {};
      for (const f of formFields || []) {
        if (f.optionsEntity && !lk[f.optionsEntity]) {
          try {
            const rows = await base44.entities[f.optionsEntity].list("-updated_date", 500);
            lk[f.optionsEntity] = rows.reduce((m, r) => {
              m[r.id] = f.optionsLabelFn ? f.optionsLabelFn(r) : r[f.optionsLabel] || r.id;
              return m;
            }, {});
          } catch (e) { /* ignore */ }
        }
      }
      setLookups(lk);
    } catch (e) {
      toast({ title: "Failed to load", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let result = items;
    if (search) {
      const q = search.toLowerCase();
      const keys = searchKeys || columns.map((c) => c.key);
      result = result.filter((it) => keys.some((k) => String(it[k] ?? "").toLowerCase().includes(q)));
    }
    if (filters) {
      for (const f of filters) {
        const v = filterValues[f.key];
        if (v) result = result.filter((it) => String(it[f.key]) === String(v));
      }
    }
    return result;
  }, [items, search, filterValues, searchKeys, columns, filters]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      if (editing) {
        await base44.entities[entityName].update(editing.id, values);
        toast({ title: `${title} updated` });
      } else {
        await base44.entities[entityName].create({ ...defaultValues, ...values });
        toast({ title: `${title} created` });
      }
      setModalOpen(false); setEditing(null); load();
    } catch (e) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await base44.entities[entityName].delete(deleteTarget.id);
      toast({ title: `${title} deleted` });
      setDeleteTarget(null); load();
    } catch (e) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    }
  };

  const transition = async (row, action) => {
    try {
      await base44.entities[entityName].update(row.id, { status: action.to });
      toast({ title: `${title} ${action.label.toLowerCase()}` });
      load();
    } catch (e) {
      toast({ title: "Action failed", description: e.message, variant: "destructive" });
    }
  };

  const exportCsv = () => {
    const headers = columns.map((c) => c.label);
    const keys = columns.map((c) => c.key);
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      lines.push(keys.map((k) => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${title.replace(/\s+/g, "_")}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const rowActions = (row) => (
    <div className="flex justify-end items-center gap-1">
      {(statusActions || []).filter((a) => !a.match || a.match === row.status).map((a) => (
        <button
          key={a.to}
          onClick={() => transition(row, a)}
          className={`px-2 py-1 rounded text-xs font-medium border ${
            a.variant === "destructive"
              ? "border-rose-200 text-rose-600 hover:bg-rose-50"
              : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          {a.label}
        </button>
      ))}
      {!readOnly && (
        <>
          <button onClick={() => { setEditing(row); setModalOpen(true); }} className="p-1.5 rounded hover:bg-muted">
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </button>
          <button onClick={() => setDeleteTarget(row)} className="p-1.5 rounded hover:bg-muted">
            <Trash2 className="h-4 w-4 text-destructive" />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCsv}><Download className="h-4 w-4 mr-1" /> Export</Button>
            {!readOnly && (
              <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
                <Plus className="h-4 w-4 mr-1" /> Add {title}
              </Button>
            )}
          </div>
        }
      />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search..." className="pl-9" />
        </div>
        {filters && filters.map((f) => (
          <Select key={f.key} value={filterValues[f.key] || ""} onValueChange={(v) => setFilterValues((s) => ({ ...s, [f.key]: v }))}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder={f.label} /></SelectTrigger>
            <SelectContent>
              {(f.options || []).map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        ))}
      </div>
      <DataTable columns={columns} data={paged} loading={loading} lookups={lookups} rowActions={rowActions} />
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
      <Dialog open={modalOpen} onOpenChange={(o) => { setModalOpen(o); if (!o) setEditing(null); }}>
        <DialogContent className={`${formMaxWidth || "max-w-2xl"} max-h-[85vh] overflow-y-auto`}>
          <DialogHeader><DialogTitle>{editing ? `Edit ${title}` : `Add ${title}`}</DialogTitle></DialogHeader>
          {customForm ? (
            React.createElement(customForm, {
              initial: editing,
              onSubmit: handleSubmit,
              onCancel: () => { setModalOpen(false); setEditing(null); },
              saving,
              lookups,
            })
          ) : (
            <CrudForm fields={formFields} initial={editing} onSubmit={handleSubmit} onCancel={() => { setModalOpen(false); setEditing(null); }} saving={saving} />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {title}?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}