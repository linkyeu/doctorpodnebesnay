import styles from './ToolBadge.module.css';

interface ToolBadgeProps {
  tool: string;
}

const TOOL_LOGOS: Record<string, string> = {
  'ChatGPT': '/images/toolkit/chatgpt.svg',
  'NotebookLM': '/images/toolkit/notebooklm.svg',
  'Perplexity': '/images/toolkit/perplexity.svg',
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
      {tools.map((t, i) => (
        <span key={t} className={styles.badge}>
          {TOOL_LOGOS[t] && (
            <img
              src={TOOL_LOGOS[t]}
              alt=""
              aria-hidden="true"
              className={styles.logo}
              width="20"
              height="20"
            />
          )}
          {t}
          {i < tools.length - 1 && <span className={styles.separator}>+</span>}
        </span>
      ))}
    </span>
  );
}
