import {
  GETALLPROJS,
  GETALLSNIPPETS,
  GETINSTALLEDAPPS,
  GETALLCOMMANDS,
  GETALLAPPS,
  GETALLTODOS,
  CURRENTPROJ,
  GETALLFILES
} from "../Actions/index.js";
import {
  GETALLBOOKMARKS,
  GETALLBOOKMARKSNOPID,
  LOADING
} from "../Actions/bookmarkActions";
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
  projDir: ""
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
    default:
      return {
        state
      };
  }
}
