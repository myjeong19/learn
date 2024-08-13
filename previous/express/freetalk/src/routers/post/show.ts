import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/post';

const router = Router();

router.post('/api/post/show/', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    const allPosts = await Post.find();
    return res.status(200).send(allPosts);
  }

  const post = await Post.findOne({ _id: id }).populate('comments');

  try {
    await Post.findOneAndDelete({ _id: id });
  } catch (err) {
    const error = new Error('post cannot be updated!') as CustomError;
    next(error);
  }

  res.status(200).send(post);
});

export { router as showPostRouter };
