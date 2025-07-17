const TYPE_LABEL_MAP: Record<string, string> = {
  festival: '축제',
  library: '도서관',
};

const CATEGORY_LABEL_MAP: Record<string, string> = {
  미용업: '미용',
  세탁업: '세탁',
  숙박업: '숙박',
};

export function getLabel(type: string, category: string | null | undefined) {
  if (type === 'store') {
    if (!category) return '착한가게';
    return CATEGORY_LABEL_MAP[category] ?? category;
  } else {
    return TYPE_LABEL_MAP[type];
  }
}
