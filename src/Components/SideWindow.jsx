import React, { useEffect } from "react";

import { useArticle } from "../contexts/ArticleContext";
import { Smiley, Heart, Horse, X } from "@phosphor-icons/react";
export default function SideWindow({ setSidewin, sidewin }) {
  const state = useArticle();
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("Unmount");
    };
  });
  console.log(state);
  const { articles, status, id } = state.state;
  console.log(articles);
  console.log(status);
  console.log(id);

  const article = articles.find((el) => el.nodeid === id);

  console.log(article);

  return (
    <div className="sidebar">
      <div className="align-right">
        <button className={"btn-icon"} onClick={() => setSidewin(!sidewin)}>
          <ion-icon name="close"></ion-icon>
        </button>
      </div>
      <div className="sidebar-container">
        <h2 className="heading-2">{article?.heading}</h2>
        <p>{article?.description}</p>
        <h4>Error message</h4>
        <div className="code">
          <code>{article?.error}</code>
        </div>
        <h4>Documentation:</h4>
        <ul>
          {article?.urls?.length > 0
            ? article?.urls?.map((item, id) => (
                <button key={id} className="link-card">
                  <a href={item?.link} target="_blank">
                    {item?.label}
                  </a>
                </button>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
}
