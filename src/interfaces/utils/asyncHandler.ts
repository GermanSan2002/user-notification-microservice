import { Request, Response, NextFunction } from "express";

/**
 * Wrapper para manejar errores en funciones asíncronas de Express.
 * 
 * @param fn Función asíncrona que necesita manejar errores.
 * @returns Una función que captura y pasa errores al middleware de manejo de errores.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
