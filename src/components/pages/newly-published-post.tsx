function NewlyPublished() {
  return (
    <div className="article">
      <div className="article_wrapper">
        <div className="article_content">
          <div className="article_content-wrapper">
            <div className="articles_item-content-header">
              <h2>ЗАГОЛОВОК</h2>
              <div className="articles_item-content-likes">12</div>
            </div>
            <div className="articles_item-content-tags">ТЕГИ</div>
          </div>
          <div className="articles_item-user user">
            <div>
              <div className="user_name">АВТОР</div>
              <div className="user_feedback-date">ДАТА</div>
            </div>
            <div className="user_photo">
              <img
                src="#"
                alt=""
                className="user_photo"
                style={{ border: "1px solid red", borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
        <div>ТЕКСТ СТАТЬИ</div>
      </div>
    </div>
  );
}

export default NewlyPublished;
