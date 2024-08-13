import { Router, Request, Response, NextFunction } from 'express';
import User from '../../models/user';
import { authenticationsService } from '../../../common/src/services/authentications';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // 사용자가 존재 하지 않는 경우
  if (!user) {
    return next(new Error('wrong credentials'));
  }

  const isEqual = await authenticationsService.pwdCompare(user.password!, password);

  if (!isEqual) {
    return next(new Error('wrong credentials'));
  }

  const token = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY!, { expiresIn: '10h' });

  req.session = { jwt: token };

  res.status(200).send(user);
});

export { router as signinRouter };
