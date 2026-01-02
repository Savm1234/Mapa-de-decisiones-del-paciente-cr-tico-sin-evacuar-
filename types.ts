
export type Severity = 'low' | 'medium' | 'high' | 'critical' | 'neutral';

export interface Reference {
  label: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  type: 'central' | 'main' | 'sub' | 'detail';
  severity: Severity;
  children?: MindMapNode[];
  description?: string;
  action?: string;
  references?: Reference[];
}
