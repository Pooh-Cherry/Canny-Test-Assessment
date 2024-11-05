export const ChangeSort = 'canny/posts/change_sort';
export function changeSort(sort) {
  return {
    sort,
    type: ChangeSort,
  };
}
