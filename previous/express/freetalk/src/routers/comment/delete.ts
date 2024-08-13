import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/post';
import Comment from '../../models/comment';

const router = Router();

router.delete(
  '/api/comment/:commentId/delete/:postId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    if (!postId || !commentId) {
      const error = new Error('post id and comment id are required') as CustomError;
      error.status = 400;
      next(error);
    }

    try {
      await Comment.findOneAndDelete({ _id: commentId });
    } catch (err) {
      const error = new Error('comment cannot be updated!') as CustomError;
      next(error);
    }

    await Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } }, { new: true });

    res.status(200).json({ success: true });
  }
);

export { router as deleteCommentRouter };
