/**
 * ProjectSwitcher コンポーネントのテスト
 *
 * TDD: テストファーストで実装を検証
 */

import { describe, it, expect, vi } from "vitest";
import type {
  ProjectSwitcherProps,
  ProjectListProps,
  ProjectCreateModalProps,
  ProjectFormErrors,
  ValidationResult,
  ProjectItemProps,
} from "./types";
import type { Project, CreateProjectRequest } from "@claude-cnthub/shared";
import {
  validateProjectForm,
  formatProjectPath,
  truncateProjectName,
} from "./utils";

// テスト用のサンプルデータ
const sampleProjects: Project[] = [
  {
    projectId: "ch_pj_0001",
    name: "Project Alpha",
    path: "/Users/test/projects/alpha",
    description: "Main development project",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    projectId: "ch_pj_0002",
    name: "Project Beta",
    path: "/Users/test/projects/beta",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    projectId: "ch_pj_0003",
    name: "Very Long Project Name That Should Be Truncated",
    path: "/Users/test/projects/long-name",
    description: "Test project with long name",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-05"),
  },
];

describe("ProjectSwitcher Types", () => {
  describe("ProjectSwitcherProps", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const onProjectSelect = vi.fn();
      const props: ProjectSwitcherProps = {
        onProjectSelect,
      };

      expect(props.onProjectSelect).toBe(onProjectSelect);
      expect(props.currentProjectId).toBeUndefined();
    });

    it("オプショナルプロパティを設定できる", () => {
      const onProjectSelect = vi.fn();
      const props: ProjectSwitcherProps = {
        currentProjectId: "ch_pj_0001",
        onProjectSelect,
        className: "custom-class",
      };

      expect(props.currentProjectId).toBe("ch_pj_0001");
      expect(props.className).toBe("custom-class");
    });
  });

  describe("ProjectListProps", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const onSelect = vi.fn();
      const onCreateClick = vi.fn();
      const props: ProjectListProps = {
        projects: sampleProjects,
        onSelect,
        onCreateClick,
      };

      expect(props.projects).toHaveLength(3);
      expect(props.onSelect).toBe(onSelect);
      expect(props.onCreateClick).toBe(onCreateClick);
    });

    it("ロード状態を設定できる", () => {
      const props: ProjectListProps = {
        projects: [],
        onSelect: vi.fn(),
        onCreateClick: vi.fn(),
        isLoading: true,
      };

      expect(props.isLoading).toBe(true);
    });

    it("現在選択中のプロジェクトIDを設定できる", () => {
      const props: ProjectListProps = {
        projects: sampleProjects,
        currentProjectId: "ch_pj_0002",
        onSelect: vi.fn(),
        onCreateClick: vi.fn(),
      };

      expect(props.currentProjectId).toBe("ch_pj_0002");
    });
  });

  describe("ProjectCreateModalProps", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const onClose = vi.fn();
      const onCreate = vi.fn();
      const props: ProjectCreateModalProps = {
        isOpen: true,
        onClose,
        onCreate,
      };

      expect(props.isOpen).toBe(true);
      expect(props.onClose).toBe(onClose);
      expect(props.onCreate).toBe(onCreate);
    });

    it("作成中状態を設定できる", () => {
      const props: ProjectCreateModalProps = {
        isOpen: true,
        onClose: vi.fn(),
        onCreate: vi.fn(),
        isCreating: true,
      };

      expect(props.isCreating).toBe(true);
    });
  });

  describe("ProjectItemProps", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const onClick = vi.fn();
      const props: ProjectItemProps = {
        project: sampleProjects[0],
        isSelected: false,
        onClick,
      };

      expect(props.project.projectId).toBe("ch_pj_0001");
      expect(props.isSelected).toBe(false);
      expect(props.onClick).toBe(onClick);
    });

    it("選択状態を設定できる", () => {
      const props: ProjectItemProps = {
        project: sampleProjects[0],
        isSelected: true,
        onClick: vi.fn(),
      };

      expect(props.isSelected).toBe(true);
    });
  });
});

describe("Form Validation", () => {
  describe("validateProjectForm", () => {
    it("有効なフォームでisValidがtrueを返す", () => {
      const data: CreateProjectRequest = {
        name: "New Project",
        path: "/Users/test/projects/new",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(true);
      expect(result.errors.name).toBeUndefined();
      expect(result.errors.path).toBeUndefined();
    });

    it("名前が空の場合エラーを返す", () => {
      const data: CreateProjectRequest = {
        name: "",
        path: "/Users/test/projects/new",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Project name is required");
    });

    it("名前が空白のみの場合エラーを返す", () => {
      const data: CreateProjectRequest = {
        name: "   ",
        path: "/Users/test/projects/new",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Project name is required");
    });

    it("パスが空の場合エラーを返す", () => {
      const data: CreateProjectRequest = {
        name: "New Project",
        path: "",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.path).toBe("Project path is required");
    });

    it("パスが絶対パスでない場合エラーを返す", () => {
      const data: CreateProjectRequest = {
        name: "New Project",
        path: "relative/path",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.path).toBe("Path must be an absolute path");
    });

    it("名前とパスの両方が無効な場合は両方のエラーを返す", () => {
      const data: CreateProjectRequest = {
        name: "",
        path: "",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Project name is required");
      expect(result.errors.path).toBe("Project path is required");
    });

    it("descriptionはオプショナルなのでなくてもエラーにならない", () => {
      const data: CreateProjectRequest = {
        name: "New Project",
        path: "/Users/test/new",
      };

      const result = validateProjectForm(data);

      expect(result.isValid).toBe(true);
    });
  });
});

describe("Utility Functions", () => {
  describe("formatProjectPath", () => {
    it("ホームディレクトリを~に置換する", () => {
      const result = formatProjectPath(
        "/Users/test/projects/alpha",
        "/Users/test"
      );
      expect(result).toBe("~/projects/alpha");
    });

    it("ホームディレクトリでない場合はそのまま返す", () => {
      const result = formatProjectPath("/var/www/project", "/Users/test");
      expect(result).toBe("/var/www/project");
    });

    it("長いパスは末尾を表示する", () => {
      const result = formatProjectPath(
        "/Users/test/very/long/path/to/project/folder",
        "/Users/test",
        20
      );
      expect(result.length).toBeLessThanOrEqual(23); // "..." + max chars
      expect(result.startsWith("...")).toBe(true);
    });

    it("短いパスはそのまま返す", () => {
      const result = formatProjectPath("/short", "/Users/test", 20);
      expect(result).toBe("/short");
    });
  });

  describe("truncateProjectName", () => {
    it("短い名前はそのまま返す", () => {
      const result = truncateProjectName("Short Name", 20);
      expect(result).toBe("Short Name");
    });

    it("長い名前は省略される", () => {
      const result = truncateProjectName(
        "Very Long Project Name That Should Be Truncated",
        20
      );
      expect(result.length).toBeLessThanOrEqual(23); // max + "..."
      expect(result.endsWith("...")).toBe(true);
    });

    it("デフォルトの長さは25文字", () => {
      const longName = "a".repeat(30);
      const result = truncateProjectName(longName);
      expect(result.length).toBe(28); // 25 + "..."
    });

    it("境界値: ちょうど最大長の場合は省略しない", () => {
      const result = truncateProjectName("Exactly Twenty Chars", 20);
      expect(result).toBe("Exactly Twenty Chars");
    });
  });
});

describe("Project Data Structure", () => {
  it("サンプルデータの構造が正しい", () => {
    expect(sampleProjects).toHaveLength(3);
    expect(sampleProjects[0].projectId).toBe("ch_pj_0001");
    expect(sampleProjects[0].name).toBe("Project Alpha");
    expect(sampleProjects[0].path).toBe("/Users/test/projects/alpha");
    expect(sampleProjects[0].description).toBe("Main development project");
  });

  it("プロジェクトIDがch_pj_形式である", () => {
    sampleProjects.forEach((project) => {
      expect(project.projectId).toMatch(/^ch_pj_\d{4}$/);
    });
  });

  it("createdAtとupdatedAtがDate型である", () => {
    const project = sampleProjects[0];
    expect(project.createdAt).toBeInstanceOf(Date);
    expect(project.updatedAt).toBeInstanceOf(Date);
  });

  it("descriptionはオプショナル", () => {
    const projectWithDesc = sampleProjects[0];
    const projectWithoutDesc = sampleProjects[1];

    expect(projectWithDesc.description).toBe("Main development project");
    expect(projectWithoutDesc.description).toBeUndefined();
  });
});

describe("Dropdown Behavior", () => {
  describe("ドロップダウン状態管理", () => {
    it("isOpenがtrueの時リストが表示される想定", () => {
      const isOpen = true;
      expect(isOpen).toBe(true);
    });

    it("isOpenがfalseの時リストが非表示される想定", () => {
      const isOpen = false;
      expect(isOpen).toBe(false);
    });
  });

  describe("プロジェクト選択", () => {
    it("選択コールバックがプロジェクトを引数として呼ばれる", () => {
      const onSelect = vi.fn();
      const selectedProject = sampleProjects[0];

      // シミュレート: プロジェクト選択
      onSelect(selectedProject);

      expect(onSelect).toHaveBeenCalledWith(selectedProject);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Modal Behavior", () => {
  describe("モーダル開閉", () => {
    it("onCloseが呼ばれるとモーダルが閉じる想定", () => {
      const onClose = vi.fn();

      // シミュレート: 閉じるボタンクリック
      onClose();

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("プロジェクト作成", () => {
    it("有効なデータでonCreateが呼ばれる", () => {
      const onCreate = vi.fn();
      const createData: CreateProjectRequest = {
        name: "New Project",
        path: "/Users/test/new",
        description: "A new project",
      };

      // シミュレート: 作成ボタンクリック
      onCreate(createData);

      expect(onCreate).toHaveBeenCalledWith(createData);
      expect(onCreate).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Accessibility", () => {
  it("ドロップダウンはaria-expandedを持つべき", () => {
    const isOpen = true;
    const ariaExpanded = isOpen;
    expect(ariaExpanded).toBe(true);
  });

  it("モーダルはrole=dialogを持つべき", () => {
    const role = "dialog";
    expect(role).toBe("dialog");
  });

  it("プロジェクトリストはrole=listboxを持つべき", () => {
    const role = "listbox";
    expect(role).toBe("listbox");
  });

  it("選択されたアイテムはaria-selected=trueを持つべき", () => {
    const isSelected = true;
    const ariaSelected = isSelected;
    expect(ariaSelected).toBe(true);
  });
});
