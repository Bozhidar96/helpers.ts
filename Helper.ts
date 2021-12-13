const object = 'object';

export function findValueByKey(obj: any, key: string): any | undefined {
  if (typeof obj === object) {
    for (const prop in obj) {
      if (prop === key) {
        return obj;
      }

      if (typeof obj[prop] === object) {
        const inner = findValueByKey(obj[prop], key);
        if (inner) {
          return inner;
        }
      }
    }
  }
}

export function findValuesByKey(obj: any, key: string): Array<any> {
  const arr: any[] = [];
  if (typeof obj === 'object') {
    for (const prop in obj) {
      if (prop === key) {
        arr.push(obj[prop]);
      }

      if (typeof obj[prop] === 'object') {
        const inner = findValuesByKey(obj[prop], key);
        if (Array.isArray(inner)) {
          arr.push(...inner);
        }
      }
    }
  }
  return arr;
}

export function binarySearch(arr: Array<number>, key: number): number {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);

    if (arr[middle] === key) {
      return middle;
    } else if (arr[middle] < key) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}

interface Item<T = any> {
  [key: string]: T;
}
export function mapByKey<T extends Item>(array: T[], key: keyof T): Item<T> {
  return array.reduce((map, item) => ({ ...map, [item[key]]: item }), {});
}

interface ItemGroup<T> {
  [key: string]: T[];
}
export function groupByKey<T extends Item>(array: T[], key: keyof T): ItemGroup<T> {
  return array.reduce<ItemGroup<T>>((map, item) => {
    const itemKey = item[key];
    if (map[itemKey]) {
      map[itemKey].push(item);
    } else {
      map[itemKey] = [item];
    }

    return map;
  }, {});
}

type ValueGetter<T = any> = (item: T) => string | number;
type SortingOrder = 'ascending' | 'descending';
export function sortBy<T extends Item>(array: T[], key: ValueGetter<T>, order: SortingOrder = 'ascending') {
  if (order === 'ascending') {
    return [...array].sort((a, b) => (key(a) > key(b) ? 1 : -1));
  }
  return [...array].sort((a, b) => (key(a) > key(b) ? -1 : 1));
}

export function getBooleanValue(data: unknown): boolean {
  let isBool = false;
  if (typeof data === 'string') {
    isBool = data === 'true' ? true : false;
  } else if (typeof data === 'boolean') {
    isBool = data;
  }
  return isBool;
}

export function isNotNullOrEmpty(...values: any[]): boolean {
  let valid = false;
  for (const val of values) {
    valid = val != null && val !== '';
    if (!valid) {
      return valid;
    }
  }

  return valid;
}
