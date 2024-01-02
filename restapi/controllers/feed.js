exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }],
  });
  /**  1.res.json 응답을 보낼 때는 상태 코드를 명확하게 보내야한다.
   * 기본 값은 200이다.
   */
};

/** 2. 새로운 게시글 등록에 POST를 사용한 이유
 * PUT 역시, 생성하는데 사용할 수도 있지만
 * 일회성 데이터가 아닌, 게시물을 다룰 때 게시물은 여러 개일 수도 있으므로,
 * 추가, 첨부하는 것이 좋아 보이므로 PUT이 아닌, POST를 사용했다.
 */

// 7. 본문에 추출하기 위한 미들웨어
exports.postCreatePost = (req, res, next) => {
  const { title, content } = req.body;

  /** 3. status 201?
   *  200은 기본 값이므로 기본 성공을 나타냄
   *  허나, 리소스 생성 성공을 알려야 함으로, 201을 사용함.
   */

  res.status(201).json({
    message: 'Post created successfully !',
    post: {
      id: new Date().toISOString(),
      title,
      content,
    },
  });
};
