/** Put *stars* around words in a heading to show them in the accent colour, e.g. "Beautiful *results.*" */
export const accent = (text: string) =>
  text.replace(/\*(.+?)\*/g, '<span class="text-accent">$1</span>');
