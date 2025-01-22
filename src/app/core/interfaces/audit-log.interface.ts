export interface AuditLog {
    _id: string;
    action: string;
    entity: string;
    entityId: string;
    userId?: string;
    details: Record<string, any>;
    timestamp: string;
  }
  