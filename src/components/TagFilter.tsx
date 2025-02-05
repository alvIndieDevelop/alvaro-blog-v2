interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export default function TagFilter({
  tags,
  selectedTags,
  onTagSelect,
}: TagFilterProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">
        Filter by Category
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
