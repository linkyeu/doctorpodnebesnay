import styles from './ToolBadge.module.css';

interface ToolBadgeProps {
  tool: string;
}

const TOOL_COLORS: Record<string, { bg: string; text: string }> = {
  'ChatGPT': { bg: 'rgba(22,163,74, 0.1)', text: '#15803D' },
  'NotebookLM': { bg: 'rgba(37,99,235, 0.1)', text: '#1D4ED8' },
  'Perplexity': { bg: 'rgba(124,58,237, 0.1)', text: '#6D28D9' },
  'tabletki.ua': { bg: 'rgba(220,38,38, 0.1)', text: '#B91C1C' },
};

/**
 * Split compound tool strings like "ChatGPT або Glass Health" or "tabletki.ua + ChatGPT"
 * into individual tool names.
 */
function splitTools(tool: string): string[] {
  return tool.split(/\s+(?:або|або|or|\+)\s+|,\s*/i).map((t) => t.trim()).filter(Boolean);
}

export default function ToolBadge({ tool }: ToolBadgeProps) {
  const tools = splitTools(tool);

  return (
    <span className={styles.wrapper}>
      {tools.map((t) => {
        const colors = TOOL_COLORS[t];
        return (
          <span
            key={t}
            className={styles.badge}
            style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
          >
            {t}
          </span>
        );
      })}
    </span>
  );
}
