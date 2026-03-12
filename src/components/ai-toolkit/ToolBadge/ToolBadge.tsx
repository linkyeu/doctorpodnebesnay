import styles from './ToolBadge.module.css';

interface ToolBadgeProps {
  tool: string;
}

const TOOL_EMOJI: Record<string, string> = {
  ChatGPT: '\u{1F4AC}',
  Perplexity: '\u{1F50D}',
  NotebookLM: '\u{1F4D3}',
  'Glass Health': '\u{1F3E5}',
  DeepL: '\u{1F310}',
  'Gamma.app': '\u{1F4CA}',
  'tabletki.ua': '\u{1F48A}',
};

/**
 * Resolve emoji for a single tool name (case-insensitive substring match).
 */
function getEmoji(name: string): string {
  const trimmed = name.trim();
  for (const [key, emoji] of Object.entries(TOOL_EMOJI)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase())) {
      return emoji;
    }
  }
  return '\u{1F6E0}'; // wrench fallback
}

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
      {tools.map((t) => (
        <span key={t} className={styles.badge}>
          <span className={styles.emoji} aria-hidden="true">
            {getEmoji(t)}
          </span>
          {t}
        </span>
      ))}
    </span>
  );
}
