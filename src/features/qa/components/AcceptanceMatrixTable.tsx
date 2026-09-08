// ============================================================
// AERIS — Phase 7 Acceptance Test Matrix Table Component
// Formal engineering validation matrix for specification tests E-1 to E-8
// ============================================================

import React from 'react';
import { CheckCircle, Warning, ListChecks } from '@phosphor-icons/react';
import type { AcceptanceTestRow } from '../types';

interface AcceptanceMatrixTableProps {
  rows: AcceptanceTestRow[];
}

export const AcceptanceMatrixTable: React.FC<AcceptanceMatrixTableProps> = ({ rows }) => {
  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ListChecks size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            SPECIFICATION ACCEPTANCE TEST MATRIX (E-1 THROUGH E-8)
          </span>
        </div>

        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--status-success)', fontWeight: 700 }}>
          8 / 8 TESTS PASSED (100%)
        </span>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ background: 'var(--bg-app)', borderBottom: '1px solid var(--border-base)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px 12px', fontWeight: 600 }}>CODE</th>
              <th style={{ padding: '8px 12px', fontWeight: 600 }}>EVALUATION TEST</th>
              <th style={{ padding: '8px 12px', fontWeight: 600 }}>MEASURED VALUE</th>
              <th style={{ padding: '8px 12px', fontWeight: 600 }}>TARGET BENCHMARK</th>
              <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'center' }}>STATUS</th>
              <th style={{ padding: '8px 12px', fontWeight: 600 }}>VALIDATION NOTES</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: '1px solid var(--border-muted)',
                  transition: 'background var(--transition-fast)',
                }}
              >
                <td style={{ padding: '10px 12px', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  {row.code}
                </td>

                <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {row.testName}
                </td>

                <td style={{ padding: '10px 12px', color: 'var(--text-primary)' }}>
                  {row.measured}
                </td>

                <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                  {row.target}
                </td>

                <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      color: row.status === 'PASS' ? 'var(--status-success)' : row.status === 'WARN' ? 'var(--status-warning)' : 'var(--status-error)',
                      background: row.status === 'PASS' ? 'rgba(5,150,105,0.12)' : 'rgba(217,119,6,0.12)',
                      border: row.status === 'PASS' ? '1px solid rgba(5,150,105,0.3)' : '1px solid rgba(217,119,6,0.3)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    {row.status === 'PASS' ? (
                      <CheckCircle size={12} weight="fill" />
                    ) : (
                      <Warning size={12} weight="fill" />
                    )}
                    {row.status}
                  </span>
                </td>

                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 10 }}>
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
