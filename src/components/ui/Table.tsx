/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableAction<T = any> {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (record: T) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  show?: (record: T) => boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  loading?: boolean;
  pagination?: PaginationProps;
  emptyMessage?: string;
  className?: string;
  rowKey?: string | ((record: T) => string);
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  loading = false,
  pagination,
  emptyMessage = 'No hay datos disponibles',
  className = '',
  rowKey = 'id',
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index.toString();
  };

  const renderCell = (column: TableColumn<T>, record: T) => {
    const value = record[column.key];

    if (column.render) {
      return column.render(value, record);
    }

    if (value === null || value === undefined) {
      return '-';
    }

    return value.toString();
  };

  const renderActions = (record: T) => {
    if (!actions.length) return null;

    const visibleActions = actions.filter(action => (action.show ? action.show(record) : true));

    if (!visibleActions.length) return null;

    return (
      <div className="flex justify-center gap-2">
        {visibleActions.map(action => (
          <button
            key={action.key}
            onClick={() => action.onClick(record)}
            className={`p-2 rounded-lg transition-colors ${getActionStyles(action.variant)}`}
            title={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>
    );
  };

  const getActionStyles = (variant?: string) => {
    switch (variant) {
      case 'primary':
        return 'text-blue-600 hover:bg-blue-50';
      case 'danger':
        return 'text-red-600 hover:bg-red-50';
      case 'success':
        return 'text-green-600 hover:bg-green-50';
      default:
        return 'text-gray-600 hover:bg-gray-50';
    }
  };

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${getAlignmentClass(
                    column.align
                  )}`}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr key={getRowKey(record, index)} className="hover:bg-gray-50 transition-colors">
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${getAlignmentClass(
                        column.align
                      )}`}
                    >
                      {renderCell(column, record)}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderActions(record)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              Siguiente
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{' '}
                <span className="font-medium">
                  {(pagination.currentPage - 1) * (pagination.itemsPerPage || 10) + 1}
                </span>{' '}
                a{' '}
                <span className="font-medium">
                  {Math.min(
                    pagination.currentPage * (pagination.itemsPerPage || 10),
                    pagination.totalItems || 0
                  )}
                </span>{' '}
                de <span className="font-medium">{pagination.totalItems || 0}</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNumber;
                  if (pagination.totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (pagination.currentPage >= pagination.totalPages - 2) {
                    pageNumber = pagination.totalPages - 4 + i;
                  } else {
                    pageNumber = pagination.currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => pagination.onPageChange(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pageNumber === pagination.currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
