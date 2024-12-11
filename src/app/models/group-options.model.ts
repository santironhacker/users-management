export interface GroupOption {
  key: string;
  value: string;
}

export const GROUP_OPTIONS: GroupOption[] = [
  { key: 'all', value: 'All Users' },
  { key: 'alphabetical', value: 'First Name' },
  { key: 'nationality', value: 'Nationality' },
];

export const DEFAULT_GROUP_OPTION_KEY = GROUP_OPTIONS[0].key;
export const DEFAULT_GROUP_OPTION_VALUE = GROUP_OPTIONS[0].value;
