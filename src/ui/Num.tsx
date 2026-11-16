// Antippbare Zahl: zeigt in einem Satz, woher sie kommt.
import type { ComponentChildren } from 'preact';
import { showExplain } from './store';

export function Num({ text, children, class: cls }: { text: string; children: ComponentChildren; class?: string }) {
  return (
    <span
      class={`num ${cls ?? ''}`}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        showExplain(text);
      }}
    >
      {children}
    </span>
  );
}
