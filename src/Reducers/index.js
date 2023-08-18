import { GETALLFILES } from "../Actions/addFileActions";
import {
  GETALLBOOKMARKS,
  GETALLBOOKMARKSNOPID,
  LOADING
} from "../Actions/bookmarkActions";
import {
  CURRENTPROJ,
  GETALLAPPS,
  GETALLCOMMANDS,
  GETALLPROJS,
  GETALLSNIPPETS,
  GETALLTODOS,
  GETINSTALLEDAPPS,
  RESOURCELINKEDPROJS,
  GETGITINFO
} from "../Actions/index.js";
import { CHOOSE_PROJECT_DIR } from "../Actions/projectActions";

const initialState = {
  success: true,
  loading: false,
  projects: [],
  bookmarks: [],
  bookmarksNoPid: [],
  commands: [],
  files: [],
  installedApps: [],
  snippets: [],
  todos: [],
  apps: [],
  currentProject: {},
  projDir: "",
  linkedProjects: [],
  gitInfo: {}
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case CURRENTPROJ: {
      return {
        ...state,
        currentProject: action.payload
      };
    }
    case GETALLPROJS: {
      return {
        ...state,
        projects: action.payload
      };
    }
    case GETALLBOOKMARKS: {
      console.log(action.payload);
      return {
        ...state,
        bookmarks: action.payload
      };
    }
    case GETALLBOOKMARKSNOPID: {
      return {
        ...state,
        bookmarksNoPid: action.payload
      };
    }
    case GETINSTALLEDAPPS: {
      const apps = action.payload;
      return {
        ...state,

        installedApps: apps
      };
    }
    case GETALLCOMMANDS: {
      return {
        ...state,
        commands: action.payload
      };
    }
    case GETALLSNIPPETS: {
      return {
        ...state,
        snippets: action.payload
      };
    }
    case GETALLTODOS: {
      return {
        ...state,
        todos: action.payload
      };
    }
    case GETALLAPPS: {
      console.log(action.paload);
      return {
        ...state,
        apps: action.payload
      };
    }
    case CHOOSE_PROJECT_DIR: {
      console.log(action.payload);
      return {
        ...state,
        projDir: action.payload
      };
    }
    case GETALLFILES: {
      console.log("all file reducer");
      return {
        ...state,
        files: action.payload
      };
    }
    case RESOURCELINKEDPROJS: {
      return {
        ...state,
        linkedProjects: action.payload
      };
    }
    case GETGITINFO: {
      return {
        ...state,
        gitInfo: action.payload
      };
    }
    default:
      return {
        state
      };
  }
}
