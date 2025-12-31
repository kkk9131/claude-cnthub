export type WorkItemStatus =
  | "not_started"
  | "planning"
  | "in_progress"
  | "review"
  | "completed"
  | "blocked";

export interface WorkItem {
  workItemId: string;
  name: string;
  description?: string;
  status: WorkItemStatus;
  projectId?: string;
  tags: string[];
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkItemRequest {
  name: string;
  description?: string;
  projectId?: string;
  tags?: string[];
  priority?: number;
}

export interface UpdateWorkItemRequest {
  name?: string;
  description?: string;
  status?: WorkItemStatus;
  tags?: string[];
  priority?: number;
}

export interface WorkItemListResponse {
  workItems: WorkItem[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
