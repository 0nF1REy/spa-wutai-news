import axios from "axios";

const baseURL = "http://localhost:3000";

export function findAll() {
  const response = axios.get(`${baseURL}/news`);
  return response;
}

// router.post("/", authMiddleware, create);
// router.get("/", findAll);
// router.get("/top", topNews);
// router.get("/search", searchByTitle);
// router.get("/byUser", authMiddleware, byUser);
// router.get("/:id", authMiddleware, findById);
// router.patch("/:id", authMiddleware, update);
// router.delete("/:id", authMiddleware, erase);
// router.patch("/like/:id", authMiddleware, likeNews);
// router.patch("/comment/:id", authMiddleware, addComment);
// router.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment);