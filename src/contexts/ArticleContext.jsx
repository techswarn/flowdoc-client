import { createContext, useContext, useReducer, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
const ArticleContext = createContext(null);
const ArticleDispatchContext = createContext(null);

export function ArticleProvider({ children }) {
  const [state, dispatch] = useReducer(articleReducer, initialArticle);

  //   const { data, isLoading, error } = useFetch();

  useEffect(function () {
    fetch("http://127.0.0.1:3000/api/v1/article")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "datareceived", payload: data.Data, status: "ready" });
      })
      .catch((err) => console.log(err));
  }, []);

  const getArticles = async () => {
    fetch("http://127.0.0.1:3000/api/v1/article")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "datareceived",
          payload: data.Data,
          status: "ready",
        });
      })
      .catch((err) => console.log(err));
  };

  const getNodeID = (id) => {
    dispatch({ type: "getid", payload: id });
  };

  return (
    <ArticleContext.Provider value={{ state, getNodeID, getArticles }}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleContext.Provider>
  );
}

export function useArticle() {
  return useContext(ArticleContext);
}

export function useArticleDispatch() {
  return useContext(ArticleDispatchContext);
}

function articleReducer(state, action) {
  switch (action.type) {
    case "datareceived": {
      //  return [...action.payload];
      return { ...state, articles: action.payload, status: "ready" };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    case "getid": {
      return { ...state, id: action.payload };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const initialArticle = {
  articles: [],
  status: "loading",
  id: undefined,
};
