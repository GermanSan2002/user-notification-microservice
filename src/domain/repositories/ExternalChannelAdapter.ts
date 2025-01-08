export interface ExternalChannelAdapter {
    /**
     * Envía un mensaje al destinatario a través de un canal externo.
     * 
     * @param message El contenido del mensaje a enviar.
     * @param recipient El destinatario del mensaje.
     * @returns Una promesa que resuelve en `true` si el mensaje se envió correctamente,
     *          o en `false` si hubo un problema.
     */
    send(message: string, recipient: string): Promise<boolean>;
  }
  