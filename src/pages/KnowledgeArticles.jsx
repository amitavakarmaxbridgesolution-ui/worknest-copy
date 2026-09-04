import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Article" },
  { key: "category_id", label: "Category", render: (r, lk) => lk.KnowledgeCategory?.[r.category_id] || "—" },
  { key: "author_email", label: "Author" },
  { key: "tags", label: "Tags" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "category_id", label: "Category", type: "select", optionsEntity: "KnowledgeCategory", optionsLabel: "name" },
  { name: "title", label: "Title", required: true },
  { name: "content", label: "Content", type: "textarea", required: true },
  { name: "tags", label: "Tags (comma separated)" },
  { name: "status", label: "Status", type: "select", options: [{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }] },
];

export default function KnowledgeArticles() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="KnowledgeArticle" title="Knowledge Article" description="Searchable knowledge base articles"
      columns={columns} formFields={formFields} searchKeys={["title", "tags"]}
      defaultValues={{ author_email: user?.email, status: "published" }}
    />
  );
}