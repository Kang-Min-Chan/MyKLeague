const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

/* =========================
   게시글
========================= */

/**
 * 게시글 작성
 * POST /community/post
 */
router.post("/post", verifyToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "제목/내용 필수" });
  }

  await db.execute(
    "INSERT INTO community_post (user_id, title, content) VALUES (?, ?, ?)",
    [req.user.user_id, title, content]
  );

  res.json({ message: "게시글 작성 완료" });
});

/**
 * 게시글 목록
 * GET /community/post
 */
router.get("/post", async (req, res) => {
  const [posts] = await db.execute(
    `SELECT post_id, title, user_id, created_at
     FROM community_post
     ORDER BY post_id DESC`
  );

  res.json(posts);
});

/**
 * 게시글 상세
 * GET /community/post/:id
 */
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const [[post]] = await db.execute(
    "SELECT * FROM community_post WHERE post_id = ?",
    [id]
  );

  if (!post) {
    return res.status(404).json({ message: "게시글 없음" });
  }

  res.json(post);
});

/**
 * 게시글 삭제 (작성자만)
 * DELETE /community/post/:id
 */
router.delete("/post/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const [[post]] = await db.execute(
    "SELECT user_id FROM community_post WHERE post_id = ?",
    [id]
  );

  if (!post) {
    return res.status(404).json({ message: "게시글 없음" });
  }

  if (post.user_id !== req.user.user_id) {
    return res.status(403).json({ message: "삭제 권한 없음" });
  }

  await db.execute(
    "DELETE FROM community_post WHERE post_id = ?",
    [id]
  );

  res.json({ message: "게시글 삭제 완료" });
});

/* =========================
   댓글
========================= */

/**
 * 댓글 작성
 * POST /community/comment
 */
router.post("/comment", verifyToken, async (req, res) => {
  const { post_id, content } = req.body;

  if (!post_id || !content) {
    return res.status(400).json({ message: "post_id, content 필수" });
  }

  await db.execute(
    "INSERT INTO community_comment (post_id, user_id, content) VALUES (?, ?, ?)",
    [post_id, req.user.user_id, content]
  );

  res.json({ message: "댓글 작성 완료" });
});

/**
 * 댓글 목록
 * GET /community/comment/:postId
 */
router.get("/comment/:postId", async (req, res) => {
  const { postId } = req.params;

  const [comments] = await db.execute(
    `SELECT comment_id, user_id, content, created_at
     FROM community_comment
     WHERE post_id = ?
     ORDER BY comment_id ASC`,
    [postId]
  );

  res.json(comments);
});

module.exports = router;
