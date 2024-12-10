export interface GroupOption {
  key: string;
  value: string;
}

export const GROUP_OPTIONS: GroupOption[] = [
  { key: 'all', value: 'All Users' },
  { key: 'alphabetical', value: 'First Name' },
  { key: 'nationality', value: 'Nationality' },
];
