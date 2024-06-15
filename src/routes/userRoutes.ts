import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/usersController';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default';

// Middleware de JWT para ver si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  //   Extraemos el token del header ("bearer wjqiej21i4joqwjeoqwjeo")
  const token = authHeader && authHeader.split(' ')[1];

  //   Si no existe retornamos un 401
  if (!token) {
    return res.status(401).json({
      error: 'No autorizado',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    // Si existe pero retorna un error respondemos 403
    if (err) {
      console.error('Error en la autenticación: ', err);
      return res.status(403).json({ error: 'No tienes acceso a este recurso' });
    }

    // Todo OK!.
    next();
  });
};

router.post('/', authenticateToken, createUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
