interface CategoriesTableProps {
  error?: string;
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}
