
import React from 'react';
import Button from './Button';

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
}

const Table = <T extends { id: number | string }>(
  { columns, data, actions }: TableProps<T>
) => {
  return (
    <div className="bg-saric-medium rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-saric-light">
          <thead className="bg-saric-light">
            <tr>
              {columns.map((col) => (
                <th key={String(col.accessor)} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {actions && actions.length > 0 && <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody className="bg-saric-medium divide-y divide-saric-light">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-saric-light transition-colors duration-150">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item[col.accessor] as React.ReactNode}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                        {actions.map(action => (
                            <Button
                                key={action.label}
                                onClick={() => action.onClick(item)}
                                className={`text-xs py-1 px-3 ${action.className || ''}`}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
